---
description: Next.js 풀스택 프로젝트 개발 워크플로우 (인증, 대시보드, 배포 포함)
---

# Next.js 풀스택 프로젝트 워크플로우

## 📋 프로젝트 규모 선택

### 1단계: 정적 페이지 사이트 (회원 기능 없음)
- 랜딩 페이지, 포트폴리오
- 데이터베이스 불필요

### 2단계: 인증 포함 사이트
- 로그인/회원가입
- 관리자 대시보드
- 데이터베이스 필수

### 3단계: 대규모 프로젝트
- 다중 사용자 역할
- 결제, API 연동
- 고급 기능

---

## 🚀 개발 순서

### Step 1: PRD.md 작성
```
1. 클라이언트 요구사항 정리
2. PRD.md 파일 생성
3. 주요 기능 목록 작성
```

### Step 2: 프로젝트 초기화
```powershell
npx create-next-app@latest ./
npm install
```

### Step 3: 인증 필요 시 (2단계 이상)
```powershell
# Prisma + 인증 설치
npm install prisma @prisma/client --save-dev
npm install next-auth@beta bcryptjs validator
npx prisma init
```

### Step 4: 보일러플레이트 복사
`d:/ClientWork_Practice/bnm-style-web`에서 복사:
- `src/lib/auth.js` - NextAuth 설정
- `src/lib/prisma.js` - Prisma 클라이언트
- `src/actions/auth.js` - 인증 Server Actions
- `src/actions/posts.js` - CRUD Server Actions
- `src/app/login/page.js` - 로그인 페이지
- `src/app/admin/` - 관리자 대시보드
- `src/app/api/auth/[...nextauth]/route.js` - API 라우트
- `prisma/schema.prisma` - DB 스키마 템플릿

### Step 5: 환경변수 설정
`.env` 파일:
```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="랜덤문자열"
```

### Step 6: 데이터베이스 설정
```powershell
npx prisma generate
npx prisma db push
```

### Step 7: Supabase (클라우드 DB) 설정
1. https://supabase.com 프로젝트 생성
2. Connection string 복사 (Pooler URL)
3. SQL Editor에서 테이블 생성

### Step 8: 배포 (Netlify)
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin [GitHub URL]
git push -u origin master

netlify login
netlify link
netlify env:set DATABASE_URL "[연결문자열]"
netlify env:set AUTH_SECRET "[시크릿]"
```

---

## 📁 복사할 파일 목록

| 파일 | 용도 |
|------|------|
| `src/lib/auth.js` | NextAuth + OAuth 설정 |
| `src/lib/prisma.js` | Prisma 싱글톤 |
| `src/actions/auth.js` | 로그인/회원가입 + 보안 |
| `src/actions/posts.js` | 게시글 CRUD |
| `src/app/login/page.js` | 소셜 로그인 UI |
| `src/app/admin/layout.js` | 관리자 레이아웃 (권한 체크) |
| `src/app/admin/page.js` | 대시보드 |
| `src/app/admin/posts/page.js` | 게시글 관리 |
| `src/app/admin/write/page.js` | 글 작성 |
| `prisma/schema.prisma` | User, Post 모델 |
| `netlify.toml` | 배포 설정 |

---

## 🔐 보안 기능 포함

- XSS 방지 (validator)
- SQL Injection 방지 (Prisma 파라미터화)
- Rate Limiting (로그인 시도 제한)
- 비밀번호 해싱 (bcrypt)
- JWT 인증

---

## ⚡ 빠른 시작 명령어

// turbo-all
```powershell
# 새 프로젝트에서 보일러플레이트 복사
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\lib" ".\src\lib"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\actions" ".\src\actions"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\app\login" ".\src\app\login"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\app\admin" ".\src\app\admin"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\src\app\api" ".\src\app\api"
xcopy /E /I "d:\ClientWork_Practice\bnm-style-web\prisma" ".\prisma"
copy "d:\ClientWork_Practice\bnm-style-web\netlify.toml" ".\netlify.toml"

# 의존성 설치
npm install prisma @prisma/client next-auth@beta bcryptjs validator
```
