-- 기존 데이터 삭제
DELETE FROM "Post";
DELETE FROM "User";

-- 새 관리자 생성 (비밀번호: bnmAdmin2024!)
-- bcrypt 해시: $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.SQ4kxXQPMJPYHi
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::TEXT,
    'bnm.admin@example.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.SQ4kxXQPMJPYHi',
    'BnM Admin',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- FASHION 카테고리
INSERT INTO "Post" (id, title, content, image, category, "layoutType", published, "createdAt", "updatedAt")
VALUES 
(gen_random_uuid()::TEXT, '2025 봄 패션 트렌드 완벽 가이드', '올해 봄 시즌을 강타할 패션 트렌드를 소개합니다.', '/images/post1.png', 'FASHION', 'MAIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '연말 파티룩 스타일링 마스터하기', '화려한 연말 파티를 위한 완벽한 스타일링 팁', '/images/post2.png', 'FASHION', 'SUB', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '겨울에 꼭 갖춰야 할 아우터 5가지', '올겨울 필수 아우터 컬렉션을 공개합니다.', '/images/post1.png', 'FASHION', 'GRID', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '스트리트 패션의 새로운 물결', '도심 속 스트리트 패션 트렌드 분석', '/images/post2.png', 'FASHION', 'SUB', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- MUSTHAVE 카테고리
INSERT INTO "Post" (id, title, content, image, category, "layoutType", published, "createdAt", "updatedAt")
VALUES 
(gen_random_uuid()::TEXT, '올겨울 페퍼들은 이 신발을 신어요', '트렌디한 겨울 신발 컬렉션', '/images/post1.png', 'MUSTHAVE', 'MAIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '2025 머스트해브 액세서리 TOP 10', '올해 꼭 가져야 할 액세서리 아이템', '/images/post2.png', 'MUSTHAVE', 'SUB', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '디자이너 백 vs 빈티지 백', '가성비와 스타일을 모두 잡는 가방 선택법', '/images/post1.png', 'MUSTHAVE', 'GRID', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- PICK 카테고리
INSERT INTO "Post" (id, title, content, image, category, "layoutType", published, "createdAt", "updatedAt")
VALUES 
(gen_random_uuid()::TEXT, '파리에서 발견한 향수의 끝판왕', '프랑스 니치 향수 브랜드 탐방기', '/images/post2.png', 'PICK', 'MAIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '에디터가 선택한 이달의 뷰티템', '12월 에디터 픽 뷰티 아이템', '/images/post1.png', 'PICK', 'SUB', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '홈 인테리어 필수 아이템', '집을 갤러리로 만드는 소품들', '/images/post2.png', 'PICK', 'GRID', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- NEWS 카테고리
INSERT INTO "Post" (id, title, content, image, category, "layoutType", published, "createdAt", "updatedAt")
VALUES 
(gen_random_uuid()::TEXT, 'Room With A View au Taipei', '타이페이 공연예술센터 특별 전시', '/images/post1.png', 'NEWS', 'MAIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'L ETUDE au BNM avec l ENSA-M', 'BNM 워크샵 리뷰', '/images/post2.png', 'NEWS', 'SUB', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, '새로운 시즌 2025/2026 오프닝', '새 시즌 티켓 오픈 안내', '/images/post1.png', 'NEWS', 'GRID', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- EVENT 카테고리 (캘린더용)
INSERT INTO "Post" (id, title, content, image, category, "layoutType", published, "metaDescription", "createdAt", "updatedAt")
VALUES 
(gen_random_uuid()::TEXT, 'Semaine de la mode de Paris', '파리 패션위크 2025', NULL, 'EVENT', 'CALENDAR', true, '2025.01.20 - 2025.01.28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'Milano Fashion Week', '밀라노 패션위크', NULL, 'EVENT', 'CALENDAR', true, '2025.02.18 - 2025.02.24', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'New York Fashion Week', '뉴욕 패션위크', NULL, 'EVENT', 'CALENDAR', true, '2025.02.07 - 2025.02.15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'London Fashion Week', '런던 패션위크', NULL, 'EVENT', 'CALENDAR', true, '2025.02.14 - 2025.02.18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'Seoul Fashion Week', '서울 패션위크', NULL, 'EVENT', 'CALENDAR', true, '2025.03.17 - 2025.03.22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'Tokyo Fashion Week', '도쿄 패션위크', NULL, 'EVENT', 'CALENDAR', true, '2025.03.10 - 2025.03.15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'Couture Fashion Week Paris', '파리 오트쿠튀르', NULL, 'EVENT', 'CALENDAR', true, '2025.01.27 - 2025.01.30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(gen_random_uuid()::TEXT, 'Berlin Fashion Week', '베를린 패션위크', NULL, 'EVENT', 'CALENDAR', true, '2025.02.03 - 2025.02.06', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
