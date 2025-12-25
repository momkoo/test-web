import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }) {
    const session = await auth();

    // Protect admin routes
    if (!session || session.user?.role !== "ADMIN") {
        redirect("/login");
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <aside style={{
                width: "240px",
                background: "#1a1a1a",
                color: "#fff",
                padding: "24px"
            }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "32px" }}>
                    Admin
                </h2>
                <nav>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "12px" }}>
                            <Link href="/admin" style={{ color: "#fff", textDecoration: "none", display: "block", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)" }}>
                                📊 대시보드
                            </Link>
                        </li>
                        <li style={{ marginBottom: "12px" }}>
                            <Link href="/admin/posts" style={{ color: "#ccc", textDecoration: "none", display: "block", padding: "12px", borderRadius: "8px" }}>
                                📝 게시글 관리
                            </Link>
                        </li>
                        <li style={{ marginBottom: "12px" }}>
                            <Link href="/admin/write" style={{ color: "#ccc", textDecoration: "none", display: "block", padding: "12px", borderRadius: "8px" }}>
                                ✏️ 새 글 작성
                            </Link>
                        </li>
                        <li style={{ marginBottom: "12px" }}>
                            <Link href="/" style={{ color: "#888", textDecoration: "none", display: "block", padding: "12px", borderRadius: "8px" }}>
                                ← 홈으로
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, background: "#f5f5f5", padding: "32px" }}>
                {children}
            </main>
        </div>
    );
}
