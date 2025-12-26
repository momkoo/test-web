import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import { getPublishedPosts } from "@/actions/posts";

export default async function MagazineSection() {
    // Fetch posts from database
    const fashionPosts = await getPublishedPosts("FASHION");
    const musthavePosts = await getPublishedPosts("MUSTHAVE");
    const pickPosts = await getPublishedPosts("PICK");

    // Fallback data if no posts
    const defaultImage = "/images/post1.png";

    return (
        <section style={{ backgroundColor: "#fff", paddingBottom: "40px" }}>
            {/* FASHION SECTION */}
            <Container style={{ paddingTop: "40px" }}>
                <SectionHeader title="FASHION" />
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                    marginBottom: "40px"
                }}>
                    {/* Main Left */}
                    {fashionPosts.length > 0 ? (
                        <>
                            <div style={{ cursor: "pointer" }}>
                                <div style={{ overflow: "hidden", marginBottom: "12px", borderRadius: "8px" }}>
                                    <img
                                        src={fashionPosts[0]?.image || defaultImage}
                                        alt={fashionPosts[0]?.title}
                                        style={{ width: "100%", height: "auto", transition: "transform 0.5s" }}
                                    />
                                </div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: "700", lineHeight: 1.3 }}>
                                    {fashionPosts[0]?.title}
                                </h3>
                            </div>
                            {/* Sub Right */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                {fashionPosts.slice(1, 5).map(post => (
                                    <div key={post.id} style={{ cursor: "pointer" }}>
                                        <div style={{ overflow: "hidden", marginBottom: "8px", borderRadius: "8px" }}>
                                            <img
                                                src={post.image || defaultImage}
                                                alt={post.title}
                                                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }}
                                            />
                                        </div>
                                        <h3 style={{ fontSize: "0.875rem", fontWeight: "700", lineHeight: 1.3 }}>
                                            {post.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", padding: "40px" }}>
                            패션 카테고리 게시글이 없습니다.
                        </p>
                    )}
                </div>
            </Container>


            {/* MUST HAVE SECTION (Horizontal Scroll) */}
            <div style={{ marginBottom: "80px", padding: "48px 0", background: "#f5f5f5" }}>
                <Container>
                    <div style={{ marginBottom: "32px" }}>
                        <h2 style={{ fontSize: "1.875rem", fontWeight: "700", marginBottom: "8px" }}>2025 겨울 필수템은 이겁니다</h2>
                        <p style={{ color: "#888", fontSize: "0.875rem" }}>작년보다 춥다는 올겨울, 패션 뷰티 힌트는 엘르에서.</p>
                    </div>
                    <div className="no-scrollbar" style={{ display: "flex", overflowX: "auto", gap: "16px", paddingBottom: "16px" }}>
                        {musthavePosts.length > 0 ? musthavePosts.map(post => (
                            <div key={post.id} style={{ minWidth: "280px", flexShrink: 0, cursor: "pointer" }}>
                                <div style={{ overflow: "hidden", marginBottom: "16px", borderRadius: "8px" }}>
                                    <img
                                        src={post.image || defaultImage}
                                        alt={post.title}
                                        style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
                                    />
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "700", lineHeight: 1.3 }}>
                                    {post.title}
                                </h3>
                            </div>
                        )) : (
                            <p style={{ color: "#888", padding: "40px" }}>머스트해브 카테고리 게시글이 없습니다.</p>
                        )}
                    </div>
                </Container>
            </div>

            {/* TODAY'S PICK SECTION */}
            <Container>
                <SectionHeader title="TODAY'S PICK" />
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "16px"
                }}>
                    {pickPosts.length > 0 ? pickPosts.slice(0, 4).map(post => (
                        <div key={post.id} style={{ cursor: "pointer" }}>
                            <div style={{ overflow: "hidden", marginBottom: "8px", borderRadius: "8px" }}>
                                <img
                                    src={post.image || defaultImage}
                                    alt={post.title}
                                    style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
                                />
                            </div>
                            <div style={{ fontSize: "0.625rem", fontWeight: "700", color: "#e00", textTransform: "uppercase", marginBottom: "4px" }}>
                                {post.category}
                            </div>
                            <h3 style={{ fontSize: "0.875rem", fontWeight: "700", lineHeight: 1.3 }}>
                                {post.title}
                            </h3>
                        </div>
                    )) : (
                        <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", padding: "40px" }}>
                            투데이픽 카테고리 게시글이 없습니다.
                        </p>
                    )}
                </div>

            </Container>
        </section>
    );
}
