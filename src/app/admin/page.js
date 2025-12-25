import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
    const postCount = await prisma.post.count();
    const userCount = await prisma.user.count();
    const recentPosts = await prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" }
    });

    return (
        <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "32px" }}>대시보드</h1>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "40px" }}>
                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#000" }}>{postCount}</div>
                    <div style={{ color: "#666" }}>총 게시글</div>
                </div>
                <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#000" }}>{userCount}</div>
                    <div style={{ color: "#666" }}>총 사용자</div>
                </div>
            </div>

            {/* Recent Posts */}
            <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>최근 게시글</h2>
                    <Link href="/admin/write" style={{ background: "#000", color: "#fff", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                        + 새 글 작성
                    </Link>
                </div>

                {recentPosts.length === 0 ? (
                    <p style={{ color: "#888", textAlign: "center", padding: "40px" }}>
                        아직 게시글이 없습니다.
                    </p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #eee" }}>
                                <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: "600" }}>제목</th>
                                <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: "600" }}>카테고리</th>
                                <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: "600" }}>상태</th>
                                <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: "600" }}>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPosts.map(post => (
                                <tr key={post.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "12px 8px" }}>{post.title}</td>
                                    <td style={{ padding: "12px 8px" }}>
                                        <span style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                                            {post.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px 8px" }}>
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
                                    <td style={{ padding: "12px 8px", color: "#888", fontSize: "14px" }}>
                                        {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
