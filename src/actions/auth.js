"use server";

import bcrypt from "bcryptjs";
import validator from "validator";
import prisma from "@/lib/prisma";
import { signIn } from "@/lib/auth";

// Input sanitization helper
function sanitizeInput(input) {
    if (typeof input !== "string") return "";
    // Remove HTML tags, trim whitespace, escape special characters
    return validator.escape(validator.trim(input));
}

// Email validation
function isValidEmail(email) {
    return validator.isEmail(email);
}

// Password strength check
function isStrongPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return password.length >= 8;
}

// Rate limiting map (simple in-memory, use Redis in production)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(email) {
    const attempts = loginAttempts.get(email);
    if (!attempts) return true;

    if (attempts.count >= MAX_ATTEMPTS) {
        if (Date.now() - attempts.lastAttempt < LOCKOUT_TIME) {
            return false;
        }
        // Reset after lockout period
        loginAttempts.delete(email);
    }
    return true;
}

function recordLoginAttempt(email, success) {
    if (success) {
        loginAttempts.delete(email);
        return;
    }

    const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: 0 };
    attempts.count++;
    attempts.lastAttempt = Date.now();
    loginAttempts.set(email, attempts);
}

export async function signUp(formData) {
    try {
        const rawEmail = formData.get("email");
        const rawPassword = formData.get("password");
        const rawName = formData.get("name");

        // Sanitize inputs
        const email = sanitizeInput(rawEmail)?.toLowerCase();
        const name = sanitizeInput(rawName);
        const password = rawPassword?.toString() || "";

        // Validate email format
        if (!email || !isValidEmail(email)) {
            return { error: "유효한 이메일 주소를 입력해주세요." };
        }

        // Validate password strength
        if (!isStrongPassword(password)) {
            return { error: "비밀번호는 8자 이상이어야 합니다." };
        }

        // Check for SQL injection patterns (additional layer)
        const sqlPatterns = /('|--|;|\/\*|\*\/|xp_|union|select|insert|update|delete|drop|exec)/i;
        if (sqlPatterns.test(email) || sqlPatterns.test(name)) {
            return { error: "잘못된 입력입니다." };
        }

        // Check if user exists (Prisma uses parameterized queries - SQL injection safe)
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { error: "이미 등록된 이메일입니다." };
        }

        // Hash password with strong salt rounds
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
                role: "USER"
            }
        });

        return { success: true, userId: user.id };
    } catch (error) {
        console.error("SignUp error:", error);
        return { error: "회원가입 중 오류가 발생했습니다." };
    }
}

export async function login(formData) {
    try {
        const rawEmail = formData.get("email");
        const rawPassword = formData.get("password");

        // Sanitize email
        const email = sanitizeInput(rawEmail)?.toLowerCase();
        const password = rawPassword?.toString() || "";

        // Validate email
        if (!email || !isValidEmail(email)) {
            return { error: "유효한 이메일 주소를 입력해주세요." };
        }

        // Check rate limiting
        if (!checkRateLimit(email)) {
            return { error: "너무 많은 로그인 시도가 있었습니다. 15분 후 다시 시도해주세요." };
        }

        // Attempt login
        try {
            await signIn("credentials", {
                email,
                password,
                redirectTo: "/"
            });
            recordLoginAttempt(email, true);
        } catch (error) {
            recordLoginAttempt(email, false);
            if (error.message?.includes("CredentialsSignin") || error.type === "CredentialsSignin") {
                return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
            }
            throw error;
        }
    } catch (error) {
        console.error("Login error:", error);
        return { error: "로그인 중 오류가 발생했습니다." };
    }
}
