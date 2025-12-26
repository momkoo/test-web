# 로컬 개발 노트 (Git 제외)

⚠️ 이 파일은 .gitignore에 추가되어 Git에 커밋되지 않습니다.

---

## 🔐 관리자 계정

**새 관리자:**
- Email: `bnm.admin@example.com`
- Password: `bnmAdmin2024!`

**비밀번호 해시 (bcrypt):**
`$2a$12$...` (seed.js에서 생성)


---

## 🔑 환경변수 실제 값

**Supabase:**
```
DATABASE_URL=postgresql://postgres.ggrlatzxsqsqqunylxnb:rhfutks3301@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**NextAuth:**
```
AUTH_SECRET=bnm-secret-key-2024
```

**OAuth (설정 시):**
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
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

## 🧪 OAuth 테스트 가이드

### 테스트 전 준비사항
1. 개발 서버 실행: `npm run dev`
2. `.env` 파일에 OAuth 키 설정 완료

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

**DB 사용자 확인 방법**
```bash
npx prisma studio
```

---

## 📝 프로젝트 정보

- 개발 서버: http://localhost:3013
- Netlify URL: https://balanceroutin.netlify.app
- GitHub: https://github.com/momkoo/test-web
- Supabase 프로젝트 ID: ggrlatzxsqsqqunylxnb
