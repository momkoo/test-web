import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>게시글 관리</h1>
                <Link href="/admin/write" style={{ background: "#000", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
                    + 새 글 작성
                </Link>
            </div>

            <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #eee", background: "#fafafa" }}>
                            <th style={{ textAlign: "left", padding: "16px", fontWeight: "600" }}>제목</th>
                            <th style={{ textAlign: "left", padding: "16px", fontWeight: "600", width: "120px" }}>카테고리</th>
                            <th style={{ textAlign: "left", padding: "16px", fontWeight: "600", width: "80px" }}>상태</th>
                            <th style={{ textAlign: "left", padding: "16px", fontWeight: "600", width: "120px" }}>날짜</th>
                            <th style={{ textAlign: "center", padding: "16px", fontWeight: "600", width: "120px" }}>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "16px" }}>
                                    <Link href={`/admin/posts/${post.id}`} style={{ color: "#000", textDecoration: "none", fontWeight: "500" }}>
                                        {post.title}
                                    </Link>
                                </td>
                                <td style={{ padding: "16px" }}>
                                    <span style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                                        {post.category}
                                    </span>
                                </td>
                                <td style={{ padding: "16px" }}>
                                    <span style={{
                                        background: post.published ? "#d4edda" : "#fff3cd",
                                        color: post.published ? "#155724" : "#856404",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        fontSize: "12px"
                                    }}>
                                        {post.published ? "공개" : "비공개"}
                                    </span>
                                </td>
                                <td style={{ padding: "16px", color: "#888", fontSize: "14px" }}>
                                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                                </td>
                                <td style={{ padding: "16px", textAlign: "center" }}>
                                    <Link href={`/admin/posts/${post.id}`} style={{ color: "#0066cc", textDecoration: "none", fontSize: "14px", marginRight: "12px" }}>
                                        수정
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {posts.length === 0 && (
                    <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                        게시글이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}
