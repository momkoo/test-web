"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Container from "@/components/ui/Container";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCredentialsSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.target);

        try {
            const result = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false
            });

            if (result?.error) {
                setError("이메일 또는 비밀번호가 올바르지 않습니다.");
            } else {
                window.location.href = "/";
            }
        } catch (err) {
            setError("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSocialLogin(provider) {
        await signIn(provider, { callbackUrl: "/" });
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
            <Container>
                <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "32px", textAlign: "center" }}>
                        로그인
                    </h1>

                    {/* Social Login Buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                        <button
                            onClick={() => handleSocialLogin("google")}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#fff",
                                color: "#333",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "500",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px"
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google로 계속하기
                        </button>

                        <button
                            onClick={() => handleSocialLogin("naver")}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#03C75A",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px"
                            }}
                        >
                            <span style={{ fontWeight: "700", fontSize: "18px" }}>N</span>
                            네이버로 계속하기
                        </button>

                        <button
                            onClick={() => handleSocialLogin("kakao")}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#FEE500",
                                color: "#000",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px"
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#000" d="M12 3C6.48 3 2 6.48 2 10.5c0 2.55 1.68 4.78 4.2 6.1l-.85 3.15c-.05.18.04.37.2.46.08.05.17.07.26.07.1 0 .2-.03.29-.1l3.7-2.5c.79.1 1.59.17 2.4.17 5.52 0 10-3.48 10-7.75S17.52 3 12 3z" />
                            </svg>
                            카카오로 계속하기
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
                        <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                        <span style={{ padding: "0 16px", color: "#888", fontSize: "14px" }}>또는</span>
                        <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleCredentialsSubmit}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>이메일</label>
                            <input
                                type="email"
                                name="email"
                                required
                                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}
                                placeholder="email@example.com"
                            />
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                required
                                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div style={{ padding: "12px", background: "#fee", color: "#c00", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#000",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? "로그인 중..." : "이메일로 로그인"}
                        </button>
                    </form>

                    <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "#888" }}>
                        소셜 로그인 시 자동으로 계정이 생성됩니다.
                    </p>
                </div>
            </Container>
        </div>
    );
}
