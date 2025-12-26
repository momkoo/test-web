# BnM Style 보일러플레이트

Next.js + Prisma + NextAuth 풀스택 템플릿

## 🎯 포함된 기능

- ✅ **인증 시스템**: 이메일/비밀번호 + Google/Naver/Kakao OAuth
- ✅ **관리자 대시보드**: 역할 기반 접근 제어 (ADMIN/USER)
- ✅ **게시글 CRUD**: 작성, 수정, 삭제, 발행 상태 관리
- ✅ **SEO 필드**: 메타 디스크립션, 태그, 예약 발행
- ✅ **보안**: XSS 방지, Rate Limiting, 비밀번호 해싱
- ✅ **배포 설정**: Netlify + Supabase PostgreSQL

## 📁 복사할 핵심 파일

```
src/
├── lib/
│   ├── auth.js         # NextAuth 설정 (OAuth 포함)
│   └── prisma.js       # Prisma 싱글톤
├── actions/
│   ├── auth.js         # 로그인/회원가입 + 보안
│   └── posts.js        # 게시글 CRUD
├── app/
│   ├── login/page.js   # 소셜 로그인 페이지
│   ├── admin/
│   │   ├── layout.js   # 관리자 레이아웃 (권한 체크)
│   │   ├── page.js     # 대시보드
│   │   ├── posts/page.js
│   │   └── write/page.js
│   └── api/
│       ├── auth/[...nextauth]/route.js
│       └── posts/[id]/route.js
prisma/
├── schema.prisma       # User, Post 모델
└── seed.js             # 초기 관리자 생성
netlify.toml            # 배포 설정
```

## 🚀 새 프로젝트에서 사용하기

```powershell
# 1. 새 Next.js 프로젝트 생성
npx create-next-app@latest my-new-project
cd my-new-project

# 2. 보일러플레이트 복사
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\lib" ".\src\lib"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\actions" ".\src\actions"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\app\login" ".\src\app\login"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\app\admin" ".\src\app\admin"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\app\api" ".\src\app\api"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\prisma" ".\prisma"
copy "d:\ClientWork_Practice\bnm-style-web\netlify.toml" "."

# 3. 의존성 설치
npm install prisma @prisma/client next-auth@beta bcryptjs validator gsap

# 4. 환경변수 설정
echo DATABASE_URL="your-supabase-url" > .env
echo AUTH_SECRET="your-secret" >> .env

# 5. Prisma 초기화
npx prisma generate
```

## 📋 개발 워크플로우

```
/fullstack-project 워크플로우를 사용하면
전체 개발 순서를 볼 수 있습니다.
```

## 🔐 기본 관리자 계정

seed.js 실행 후:
- Email: `admin@example.com`
- Password: `admin123`

---

자세한 설정은 README.md 참조
