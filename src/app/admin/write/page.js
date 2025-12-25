"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/actions/posts";

const CATEGORIES = [
    { value: "FASHION", label: "패션" },
    { value: "MUSTHAVE", label: "머스트해브" },
    { value: "PICK", label: "투데이픽" },
    { value: "NEWS", label: "뉴스" }
];

const LAYOUT_TYPES = [
    { value: "MAIN", label: "메인 (대형)" },
    { value: "SUB", label: "서브 (소형)" },
    { value: "SCROLL", label: "스크롤" },
    { value: "GRID", label: "그리드" }
];

export default function WritePage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.target);

        try {
            const result = await createPost(formData);
            if (result.error) {
                setError(result.error);
            } else {
                router.push("/admin");
            }
        } catch (err) {
            setError("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "32px" }}>새 글 작성</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
                <div style={{ background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

                    {/* Title */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>제목 *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}
                            placeholder="게시글 제목을 입력하세요"
                        />
                    </div>

                    {/* Category & Layout */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>카테고리 *</label>
                            <select
                                name="category"
                                required
                                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>레이아웃 타입</label>
                            <select
                                name="layoutType"
                                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}
                            >
                                {LAYOUT_TYPES.map(lt => (
                                    <option key={lt.value} value={lt.value}>{lt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>이미지 URL</label>
                        <input
                            type="text"
                            name="image"
                            style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}
                            placeholder="/images/post1.png"
                        />
                    </div>

                    {/* Content */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>내용 *</label>
                        <textarea
                            name="content"
                            required
                            rows={10}
                            style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px", resize: "vertical" }}
                            placeholder="게시글 내용을 입력하세요..."
                        />
                    </div>

                    {/* Published */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                            <input type="checkbox" name="published" value="true" style={{ width: "20px", height: "20px" }} />
                            <span style={{ fontWeight: "600" }}>바로 공개</span>
                        </label>
                    </div>

                    {error && (
                        <div style={{ padding: "12px", background: "#fee", color: "#c00", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: "14px 32px",
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
                            {loading ? "저장중..." : "저장하기"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            style={{
                                padding: "14px 32px",
                                background: "#f0f0f0",
                                color: "#333",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
