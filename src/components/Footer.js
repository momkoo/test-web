import Link from "next/link";
import Container from "./ui/Container";

const FOOTER_LINKS = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
];

const SOCIAL_LINKS = [
    { href: "https://instagram.com", label: "Instagram" },
    { href: "https://facebook.com", label: "Facebook" },
    { href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
    return (
        <footer style={{
            borderTop: "1px dashed #dcdcdc",
            paddingTop: "48px",
            paddingBottom: "48px",
            marginTop: "80px",
            backgroundColor: "#fafafa"
        }}>
            <Container>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "24px"
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

                    {/* Navigation Links */}
                    <nav style={{
                        display: "flex",
                        gap: "24px",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {FOOTER_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: "0.875rem",
                                    color: "#666",
                                    textDecoration: "none"
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <nav style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: "0.75rem",
                                    color: "#999",
                                    textDecoration: "none",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p style={{
                        fontSize: "0.75rem",
                        color: "#999",
                        marginTop: "16px"
                    }}>
                        © {new Date().getFullYear()} BnM Style. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
