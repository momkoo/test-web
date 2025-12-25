const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    // Create Admin User
    const adminPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password: adminPassword,
            name: "Admin",
            role: "ADMIN"
        }
    });

    console.log("Admin user created:", admin.email);

    // Create Sample Posts
    const samplePosts = [
        {
            title: "연말 파티룩 올데프 애니 스타일",
            content: "2025년 연말 파티를 위한 최고의 스타일링 팁을 공개합니다.",
            image: "/images/post1.png",
            category: "FASHION",
            layoutType: "MAIN",
            published: true
        },
        {
            title: "겨울에 패딩 껴안고 사는 얼죽패 고수들",
            content: "패딩을 멋지게 입는 방법을 알려드립니다.",
            image: "/images/post2.png",
            category: "FASHION",
            layoutType: "SUB",
            published: true
        },
        {
            title: "올겨울 패피들은 이 신발을 신어요",
            content: "겨울철 신발 트렌드를 분석합니다.",
            image: "/images/post1.png",
            category: "MUSTHAVE",
            layoutType: "SCROLL",
            published: true
        },
        {
            title: "파리에서 발견한 향수의 끝판왕",
            content: "프랑스 향수 리뷰입니다.",
            image: "/images/post2.png",
            category: "PICK",
            layoutType: "GRID",
            published: true
        }
    ];

    for (const post of samplePosts) {
        await prisma.post.create({ data: post });
    }

    console.log("Sample posts created:", samplePosts.length);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
