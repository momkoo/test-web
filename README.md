# BnM Style Web

매거진 스타일 웹사이트 (Next.js + Prisma + NextAuth)

## 📌 시스템 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

---

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (.env 파일 생성)
# → LOCAL_NOTES.md 참조

# 3. Prisma 클라이언트 생성
npx prisma generate

# 4. 개발 서버 실행
npm run dev
```

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── admin/       # 관리자 대시보드
│   ├── api/         # API 라우트
│   └── login/       # 로그인 페이지
├── actions/         # Server Actions
├── components/      # React 컴포넌트
└── lib/             # Prisma, Auth 설정
prisma/
├── schema.prisma    # 데이터베이스 스키마
└── seed.js          # 초기 데이터 생성
```

---

## 🔒 보안 기능

- **XSS 방지**: 입력값 살균 (validator)
- **SQL Injection 방지**: Prisma 파라미터화 쿼리
- **Rate Limiting**: 로그인 시도 제한
- **Password Hashing**: bcrypt
- **JWT 인증**: NextAuth.js

---

## 🚀 배포

### Netlify 배포

```bash
git push  # 자동 배포
```

### 환경변수 (Netlify에서 설정)
- `DATABASE_URL` - PostgreSQL 연결 문자열
- `AUTH_SECRET` - 인증 시크릿

---

## 📚 추가 문서

- **LOCAL_NOTES.md** - 개발 환경 설정, 계정 정보, OAuth 설정 (Git 제외)
- **BOILERPLATE.md** - 보일러플레이트 재사용 가이드

---

## 📞 지원

문의사항은 프로젝트 관리자에게 연락하세요.
