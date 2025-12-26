const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    // 기존 데이터 삭제
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log("기존 데이터 삭제 완료");

    // 새 관리자 생성 (새 비밀번호)
    const hashedPassword = await bcrypt.hash("bnmAdmin2024!", 12);
    const admin = await prisma.user.create({
        data: {
            email: "bnm.admin@example.com",
            password: hashedPassword,
            name: "BnM Admin",
            role: "ADMIN"
        }
    });
    console.log("Admin 생성:", admin.email);

    // 카테고리별 게시글 생성
    const posts = [
        // FASHION 카테고리
        { title: "2025 봄 패션 트렌드 완벽 가이드", content: "올해 봄 시즌을 강타할 패션 트렌드를 소개합니다.", image: "/images/post1.png", category: "FASHION", layoutType: "MAIN", published: true },
        { title: "연말 파티룩 스타일링 마스터하기", content: "화려한 연말 파티를 위한 완벽한 스타일링 팁", image: "/images/post2.png", category: "FASHION", layoutType: "SUB", published: true },
        { title: "겨울에 꼭 갖춰야 할 아우터 5가지", content: "올겨울 필수 아우터 컬렉션을 공개합니다.", image: "/images/post1.png", category: "FASHION", layoutType: "GRID", published: true },
        { title: "스트리트 패션의 새로운 물결", content: "도심 속 스트리트 패션 트렌드 분석", image: "/images/post2.png", category: "FASHION", layoutType: "SUB", published: true },

        // MUSTHAVE 카테고리
        { title: "올겨울 페퍼들은 이 신발을 신어요", content: "트렌디한 겨울 신발 컬렉션", image: "/images/post1.png", category: "MUSTHAVE", layoutType: "MAIN", published: true },
        { title: "2025 머스트해브 액세서리 TOP 10", content: "올해 꼭 가져야 할 액세서리 아이템", image: "/images/post2.png", category: "MUSTHAVE", layoutType: "SUB", published: true },
        { title: "디자이너 백 vs 빈티지 백", content: "가성비와 스타일을 모두 잡는 가방 선택법", image: "/images/post1.png", category: "MUSTHAVE", layoutType: "GRID", published: true },

        // PICK 카테고리
        { title: "파리에서 발견한 향수의 끝판왕", content: "프랑스 니치 향수 브랜드 탐방기", image: "/images/post2.png", category: "PICK", layoutType: "MAIN", published: true },
        { title: "에디터가 선택한 이달의 뷰티템", content: "12월 에디터 픽 뷰티 아이템", image: "/images/post1.png", category: "PICK", layoutType: "SUB", published: true },
        { title: "홈 인테리어 필수 아이템", content: "집을 갤러리로 만드는 소품들", image: "/images/post2.png", category: "PICK", layoutType: "GRID", published: true },

        // NEWS 카테고리
        { title: "Room With A View au Taipei", content: "타이페이 공연예술센터 특별 전시", image: "/images/post1.png", category: "NEWS", layoutType: "MAIN", published: true },
        { title: "L'ÉTUDE au BNM avec l'ENSA-M", content: "BNM 워크샵 리뷰", image: "/images/post2.png", category: "NEWS", layoutType: "SUB", published: true },
        { title: "새로운 시즌 2025/2026 오프닝", content: "새 시즌 티켓 오픈 안내", image: "/images/post1.png", category: "NEWS", layoutType: "GRID", published: true },
    ];

    for (const post of posts) {
        await prisma.post.create({ data: post });
    }
    console.log(`게시글 ${posts.length}개 생성 완료`);

    // 캘린더 이벤트 데이터 (Post로 EVENT 카테고리 추가)
    const events = [
        { title: "Semaine de la mode de Paris", content: "파리 패션위크 2025", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.01.20 - 2025.01.28" },
        { title: "Milano Fashion Week", content: "밀라노 패션위크", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.02.18 - 2025.02.24" },
        { title: "New York Fashion Week", content: "뉴욕 패션위크", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.02.07 - 2025.02.15" },
        { title: "London Fashion Week", content: "런던 패션위크", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.02.14 - 2025.02.18" },
        { title: "Seoul Fashion Week", content: "서울 패션위크", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.03.17 - 2025.03.22" },
        { title: "Tokyo Fashion Week", content: "도쿄 패션위크", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.03.10 - 2025.03.15" },
        { title: "Couture Fashion Week Paris", content: "파리 오트쿠튀르", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.01.27 - 2025.01.30" },
        { title: "Berlin Fashion Week", content: "베를린 패션위크", image: null, category: "EVENT", layoutType: "CALENDAR", published: true, metaDescription: "2025.02.03 - 2025.02.06" },
    ];

    for (const event of events) {
        await prisma.post.create({ data: event });
    }
    console.log(`이벤트 ${events.length}개 생성 완료`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
