"use server";

import validator from "validator";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Input sanitization helper
function sanitizeInput(input) {
    if (typeof input !== "string") return "";
    return validator.escape(validator.trim(input));
}

// Sanitize but allow some formatting
function sanitizeContent(input) {
    if (typeof input !== "string") return "";
    // Remove potentially dangerous scripts but keep basic formatting
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .trim();
}

// Check for malicious patterns
function hasMaliciousPatterns(input) {
    if (!input) return false;
    const patterns = /(<script|javascript:|on\w+\s*=|union\s+select|drop\s+table)/i;
    return patterns.test(input);
}

export async function createPost(formData) {
    try {
        const rawTitle = formData.get("title");
        const rawContent = formData.get("content");
        const rawImage = formData.get("image");
        const rawCategory = formData.get("category");
        const rawLayoutType = formData.get("layoutType");
        const published = formData.get("published") === "true";
        const rawMetaDescription = formData.get("metaDescription");
        const rawTags = formData.get("tags");
        const rawScheduledAt = formData.get("scheduledAt");

        // Sanitize inputs
        const title = sanitizeInput(rawTitle);
        const content = sanitizeContent(rawContent);
        const image = sanitizeInput(rawImage);
        const category = sanitizeInput(rawCategory);
        const layoutType = sanitizeInput(rawLayoutType);
        const metaDescription = sanitizeInput(rawMetaDescription);
        const tags = sanitizeInput(rawTags);

        // Validate required fields
        if (!title || !content || !category) {
            return { error: "필수 항목을 모두 입력해주세요." };
        }

        // Check for malicious content
        if (hasMaliciousPatterns(rawTitle) || hasMaliciousPatterns(rawContent)) {
            return { error: "잘못된 입력이 감지되었습니다." };
        }

        // Create post (Prisma uses parameterized queries - SQL injection safe)
        const post = await prisma.post.create({
            data: {
                title,
                content,
                image: image || null,
                category,
                layoutType: layoutType || "GRID",
                published,
                metaDescription: metaDescription || null,
                tags: tags || null,
                scheduledAt: rawScheduledAt ? new Date(rawScheduledAt) : null
            }
        });

        revalidatePath("/admin");
        revalidatePath("/");

        return { success: true, postId: post.id };
    } catch (error) {
        console.error("Create post error:", error);
        return { error: "게시글 생성 중 오류가 발생했습니다." };
    }
}

export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function getPublishedPosts(category = null) {
    const where = { published: true };
    if (category) {
        // Sanitize category input
        where.category = sanitizeInput(category);
    }

    return await prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" }
    });
}

export async function deletePost(id) {
    try {
        // Validate ID format
        if (!id || typeof id !== "string" || id.length > 50) {
            return { error: "잘못된 요청입니다." };
        }

        await prisma.post.delete({
            where: { id }
        });

        revalidatePath("/admin");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Delete post error:", error);
        return { error: "삭제 중 오류가 발생했습니다." };
    }
}

export async function togglePublish(id, published) {
    try {
        // Validate inputs
        if (!id || typeof id !== "string") {
            return { error: "잘못된 요청입니다." };
        }

        await prisma.post.update({
            where: { id },
            data: { published: Boolean(published) }
        });

        revalidatePath("/admin");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Toggle publish error:", error);
        return { error: "상태 변경 중 오류가 발생했습니다." };
    }
}
