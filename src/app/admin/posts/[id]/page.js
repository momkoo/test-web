"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function PostEditPage({ params }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${params.id}`);
                if (res.ok) {
                    setPost(await res.json());
                } else {
                    setError("게시글을 찾을 수 없습니다.");
                }
            } catch (err) {
                setError("오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [params.id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");

        const formData = new FormData(e.target);
        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
            image: formData.get("image"),
            category: formData.get("category"),
            layoutType: formData.get("layoutType"),
            published: formData.get("published") === "on",
            metaDescription: formData.get("metaDescription"),
            tags: formData.get("tags"),
            scheduledAt: formData.get("scheduledAt") || null
        };

        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                router.push("/admin/posts");
            } else {
                setError("저장 중 오류가 발생했습니다.");
            }
        } catch (err) {
            setError("저장 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
            const res = await fetch(`/api/posts/${params.id}`, { method: "DELETE" });
            if (res.ok) {
                router.push("/admin/posts");
            }
        } catch (err) {
            setError("삭제 중 오류가 발생했습니다.");
        }
    }

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>로딩중...</div>;
    if (error && !post) return <div style={{ padding: "40px", textAlign: "center", color: "#c00" }}>{error}</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>게시글 수정</h1>
                <button onClick={handleDelete} style={{ background: "#c00", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                    삭제
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
                <div style={{ background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

                    {/* Title */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>제목 *</label>
                        <input type="text" name="title" required defaultValue={post?.title} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }} />
                    </div>

                    {/* Category & Layout */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>카테고리 *</label>
                            <select name="category" defaultValue={post?.category} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}>
                                {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>레이아웃 타입</label>
                            <select name="layoutType" defaultValue={post?.layoutType} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }}>
                                {LAYOUT_TYPES.map(lt => <option key={lt.value} value={lt.value}>{lt.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>이미지 URL</label>
                        <input type="text" name="image" defaultValue={post?.image} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }} placeholder="/images/post1.png" />
                    </div>

                    {/* Content */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>내용 *</label>
                        <textarea name="content" required rows={10} defaultValue={post?.content} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px", resize: "vertical" }} />
                    </div>

                    {/* SEO Section */}
                    <div style={{ borderTop: "1px solid #eee", paddingTop: "24px", marginBottom: "24px" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "16px", color: "#666" }}>🔍 SEO 설정</h3>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>메타 디스크립션</label>
                            <textarea name="metaDescription" rows={3} defaultValue={post?.metaDescription} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} placeholder="검색 결과에 표시될 설명 (160자 이내 권장)" />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>태그</label>
                            <input type="text" name="tags" defaultValue={post?.tags} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} placeholder="쉼표로 구분 (예: 패션, 겨울, 트렌드)" />
                        </div>
                    </div>

                    {/* Publishing Section */}
                    <div style={{ borderTop: "1px solid #eee", paddingTop: "24px", marginBottom: "24px" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "16px", color: "#666" }}>📅 발행 설정</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                            <div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                    <input type="checkbox" name="published" defaultChecked={post?.published} style={{ width: "20px", height: "20px" }} />
                                    <span style={{ fontWeight: "600" }}>공개</span>
                                </label>
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>예약 발행</label>
                                <input type="datetime-local" name="scheduledAt" defaultValue={post?.scheduledAt ? new Date(post.scheduledAt).toISOString().slice(0, 16) : ""} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }} />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: "12px", background: "#fee", color: "#c00", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" }}>
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button type="submit" disabled={saving} style={{ padding: "14px 32px", background: "#000", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                            {saving ? "저장중..." : "저장하기"}
                        </button>
                        <button type="button" onClick={() => router.back()} style={{ padding: "14px 32px", background: "#f0f0f0", color: "#333", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
                            취소
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
