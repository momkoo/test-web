# BnM Style Web

매거진 스타일 웹사이트 (Next.js + Prisma + NextAuth)

## 📌 시스템 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

---

## 🚀 설치 및 실행 매뉴얼

### 1. 프로젝트 설치

```bash
# 프로젝트 폴더로 이동
cd bnm-style-web

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성:

```env
# Database (SQLite - 로컬 파일)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth Secret (필수 - 아래 명령어로 생성)
# npx auth secret
AUTH_SECRET="your-generated-secret-here"

# =====================
# OAuth 설정 (선택사항)
# =====================

# Google OAuth
# 설정: https://console.developers.google.com/
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Naver OAuth  
# 설정: https://developers.naver.com/apps/
NAVER_CLIENT_ID=""
NAVER_CLIENT_SECRET=""

# Kakao OAuth
# 설정: https://developers.kakao.com/console/app
KAKAO_CLIENT_ID=""
KAKAO_CLIENT_SECRET=""
```

### 3. 데이터베이스 초기화

```bash
# Prisma Client 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate deploy

# (선택) 관리자 계정 생성
node prisma/seed.js
```

### 4. 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

---

## 🔐 OAuth 설정 가이드

### Google OAuth 설정

1. [Google Cloud Console](https://console.developers.google.com/) 접속
2. 프로젝트 생성 또는 선택
3. **APIs & Services** → **Credentials** → **OAuth 2.0 Client ID** 생성
4. **Authorized redirect URIs** 추가:
   - 개발: `http://localhost:3000/api/auth/callback/google`
   - 프로덕션: `https://yourdomain.com/api/auth/callback/google`
5. Client ID와 Client Secret을 `.env`에 입력

### Naver OAuth 설정

1. [Naver Developers](https://developers.naver.com/apps/) 접속
2. 애플리케이션 등록
3. **API 권한** → 회원이름, 이메일 선택
4. **Callback URL** 추가:
   - 개발: `http://localhost:3000/api/auth/callback/naver`
   - 프로덕션: `https://yourdomain.com/api/auth/callback/naver`
5. Client ID와 Client Secret을 `.env`에 입력

### Kakao OAuth 설정

1. [Kakao Developers](https://developers.kakao.com/console/app) 접속
2. 애플리케이션 추가
3. **카카오 로그인** 활성화
4. **Redirect URI** 추가:
   - 개발: `http://localhost:3000/api/auth/callback/kakao`
   - 프로덕션: `https://yourdomain.com/api/auth/callback/kakao`
5. **보안** → Client Secret 생성
6. REST API 키와 Client Secret을 `.env`에 입력

---

## 👤 관리자 계정 설정

### 방법 1: seed.js 사용

```bash
node prisma/seed.js
```

> ⚠️ 기본 계정 정보는 `LOCAL_NOTES.md` 참조 (Git에서 제외됨)

### 방법 2: 직접 생성

```bash
npx prisma studio
```

Prisma Studio에서 User 테이블에 직접 추가:
- role: "ADMIN" 으로 설정

---

## 📁 프로젝트 구조

```
bnm-style-web/
├── prisma/
│   ├── schema.prisma    # 데이터베이스 스키마
│   ├── seed.js          # 초기 데이터 생성
│   └── dev.db           # SQLite 데이터베이스 파일
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── admin/       # 관리자 페이지
│   │   ├── api/         # API 라우트
│   │   └── login/       # 로그인 페이지
│   ├── actions/         # Server Actions
│   ├── components/      # React 컴포넌트
│   └── lib/             # 유틸리티 (auth, prisma)
├── public/              # 정적 파일
└── .env                 # 환경 변수 (직접 생성)
```

---

## 🔒 보안 기능

- **XSS 방지**: 입력값 살균 (validator 라이브러리)
- **SQL Injection 방지**: Prisma 파라미터화 쿼리
- **Rate Limiting**: 로그인 5회 실패 시 15분 잠금
- **Password Hashing**: bcrypt (salt rounds: 12)
- **JWT 인증**: NextAuth.js 내장

---

## 🧪 OAuth 테스트 가이드

### 테스트 전 준비사항

1. 개발 서버 실행: `npm run dev -- -p 3000`
2. `.env` 파일에 OAuth 키 설정 완료

### Google OAuth 테스트

**1단계: Google Cloud Console 설정**
```
1. https://console.developers.google.com/ 접속
2. 새 프로젝트 생성: "BnM-Test"
3. OAuth 동의 화면 설정:
   - User Type: 외부
   - 앱 이름: BnM Style
   - 테스트 사용자 추가 (본인 Gmail)
4. 사용자 인증 정보 → OAuth 2.0 클라이언트 ID 만들기:
   - 유형: 웹 애플리케이션
   - 승인된 리디렉션 URI: http://localhost:3000/api/auth/callback/google
5. Client ID, Client Secret 복사
```

**2단계: .env 설정**
```env
GOOGLE_CLIENT_ID="123456789-xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxx"
```

**3단계: 테스트**
```
1. http://localhost:3000/login 접속
2. "Google로 계속하기" 클릭
3. Google 로그인 진행
4. 리디렉션 후 로그인 상태 확인
```

### Naver OAuth 테스트

**1단계: Naver Developers 설정**
```
1. https://developers.naver.com/apps/ 접속 (네이버 로그인 필요)
2. Application 등록:
   - 애플리케이션 이름: BnM Style
   - 사용 API: 네이버 로그인 (회원이름, 이메일)
   - 환경: PC웹
   - 서비스 URL: http://localhost:3000
   - Callback URL: http://localhost:3000/api/auth/callback/naver
3. Client ID, Client Secret 복사
```

**2단계: .env 설정**
```env
NAVER_CLIENT_ID="xxxxxxxxxx"
NAVER_CLIENT_SECRET="xxxxxxxxxx"
```

**3단계: 테스트**
```
1. http://localhost:3000/login 접속
2. "네이버로 계속하기" 클릭
3. 네이버 로그인 진행
4. 정보 제공 동의 후 리디렉션
5. 로그인 상태 확인
```

### Kakao OAuth 테스트

**1단계: Kakao Developers 설정**
```
1. https://developers.kakao.com/console/app 접속
2. 애플리케이션 추가:
   - 앱 이름: BnM Style
3. 앱 설정 → 플랫폼 → Web 플랫폼 등록:
   - 사이트 도메인: http://localhost:3000
4. 카카오 로그인 활성화:
   - 활성화 설정: ON
   - Redirect URI: http://localhost:3000/api/auth/callback/kakao
5. 동의 항목: 닉네임, 이메일 필수 동의로 설정
6. 보안 → Client Secret 생성 및 활성화
7. 앱 키 → REST API 키 복사
```

**2단계: .env 설정**
```env
KAKAO_CLIENT_ID="REST_API_키"
KAKAO_CLIENT_SECRET="Client_Secret"
```

**3단계: 테스트**
```
1. http://localhost:3000/login 접속
2. "카카오로 계속하기" 클릭
3. 카카오 로그인 진행
4. 정보 제공 동의 후 리디렉션
5. 로그인 상태 확인
```

### 테스트 체크리스트

| 항목 | Google | Naver | Kakao |
|------|--------|-------|-------|
| 로그인 버튼 클릭 | ☐ | ☐ | ☐ |
| OAuth 화면 노출 | ☐ | ☐ | ☐ |
| 로그인 완료 | ☐ | ☐ | ☐ |
| 메인 페이지 리디렉션 | ☐ | ☐ | ☐ |
| 헤더에 사용자명 표시 | ☐ | ☐ | ☐ |
| DB에 사용자 생성 확인 | ☐ | ☐ | ☐ |

### 문제 해결

**"redirect_uri_mismatch" 에러**
- OAuth 설정의 Redirect URI가 정확히 일치하는지 확인
- 포트 번호 확인 (3000 vs 3013 등)

**"access_denied" 에러**  
- Google: 테스트 사용자 목록에 본인 추가 확인
- Naver/Kakao: 애플리케이션 상태가 "개발중"인지 확인

**로그인 후 사용자 정보 안보임**
- `npm run dev` 재시작
- 브라우저 캐시/쿠키 삭제

**DB 사용자 확인 방법**
```bash
npx prisma studio
# 브라우저에서 User 테이블 확인
```

---

## 🚀 배포

### Vercel 배포

```bash
npm i -g vercel
vercel
```

### Docker 배포 (선택)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 프로덕션 환경 변수

프로덕션 배포 시 반드시 설정:
- `AUTH_SECRET`: 강력한 무작위 문자열
- `DATABASE_URL`: 프로덕션 DB 연결 문자열
- OAuth Client ID/Secret: 각 서비스에서 발급

---

## 📞 지원

문의사항은 프로젝트 관리자에게 연락하세요.
