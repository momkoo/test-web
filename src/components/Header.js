import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import Container from "./ui/Container";

// SEO 카테고리 네비게이션
const CATEGORIES = [
    { href: "/category/fashion", label: "Fashion" },
    { href: "/category/musthave", label: "Must Have" },
    { href: "/category/pick", label: "Pick" },
    { href: "/category/news", label: "News" },
];

export default async function Header() {
    const session = await auth();
    const isLoggedIn = session?.user?.email ? true : false;

    return (
        <header style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#fff",
            borderBottom: "1px dashed #dcdcdc",
        }}>
            <Container>
                {/* 상단 바 */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "60px"
                }}>
                    {/* Logo */}
                    <Link href="/" style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        fontFamily: "var(--font-hand)",
                        textDecoration: "none",
                        color: "#000"
                    }}>
                        BnM
                    </Link>

                    {/* Right Navigation */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        {isLoggedIn ? (
                            <>
                                {session.user?.role === "ADMIN" && (
                                    <Link href="/admin" style={{

                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                        color: "#e00"
                                    }}>
                                        Admin
                                    </Link>
                                )}
                                <span style={{ fontSize: "0.75rem", color: "#888" }}>
                                    {session.user?.name || session.user?.email}
                                </span>
                                <form action={async () => {
                                    "use server";
                                    await signOut({ redirect: true, redirectTo: "/" });
                                }}>
                                    <button type="submit" style={{
                                        background: "none",
                                        border: "1px solid #ddd",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        fontSize: "0.75rem",
                                        cursor: "pointer",

                                        color: "#666"
                                    }}>
                                        로그아웃
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link href="/login" style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                textDecoration: "none",
                                color: "#000",
                                padding: "8px 16px",
                                border: "1px solid #000",
                                borderRadius: "4px"
                            }}>
                                로그인
                            </Link>
                        )}

                        <button style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "1px solid #000",
                            background: "transparent",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            EN
                        </button>
                    </nav>
                </div>

                {/* 카테고리 네비게이션 (SEO 최적화) - 모바일에서 가로 스크롤 */}
                <nav style={{
                    borderTop: "1px dashed #eee",
                    padding: "12px 0",
                    display: "flex",
                    gap: "24px",
                    justifyContent: "flex-start",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"
                }} className="no-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.href}
                            href={cat.href}
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                textDecoration: "none",
                                color: "#333",
                                whiteSpace: "nowrap",
                                flexShrink: 0
                            }}
                        >
                            {cat.label}
                        </Link>
                    ))}
                </nav>

            </Container>
        </header>
    );
}
