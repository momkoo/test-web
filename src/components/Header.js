import Link from "next/link";
import Container from "./ui/Container";
import { auth } from "@/lib/auth";

export default async function Header() {
    const session = await auth();

    return (
        <header style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#fff",
            borderBottom: "1px dashed #dcdcdc",
            height: "60px",
            display: "flex",
            alignItems: "center"
        }}>
            <Container>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    {/* Logo */}
                    <Link href="/" style={{ fontSize: "2rem", fontWeight: "700", fontFamily: "var(--font-hand)", textDecoration: "none", color: "#000" }}>
                        BnM
                    </Link>

                    {/* Navigation */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <Link href="/infos" style={{ fontSize: "0.875rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", color: "#000" }}>
                            Infos
                        </Link>

                        {session ? (
                            <>
                                {session.user?.role === "ADMIN" && (
                                    <Link href="/admin" style={{ fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", color: "#e00" }}>
                                        Admin
                                    </Link>
                                )}
                                <span style={{ fontSize: "0.75rem", color: "#888" }}>
                                    {session.user?.name || session.user?.email}
                                </span>
                            </>
                        ) : (
                            <Link href="/login" style={{ fontSize: "0.875rem", fontWeight: "500", textDecoration: "none", color: "#000" }}>
                                Login
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
            </Container>
        </header>
    );
}
