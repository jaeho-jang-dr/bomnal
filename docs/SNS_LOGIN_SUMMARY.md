# 봄날 SNS 로그인 설정 요약

## ✅ 설정 완료 현황

### Firebase Authentication

- **프로젝트**: bomnal-a023a
- **공통 Redirect URI**: `https://bomnal-a023a.firebaseapp.com/__/auth/handler`

| SNS | 상태 | Provider ID | Client ID | Issuer |
|-----|------|-------------|-----------|---------|
| **Google** | ✅ 완료 | `google.com` | `1002923521242-5nvqp8fv...` | - |
| **Naver** | ✅ 완료 | `oidc.oidc.naver` | `gYF4YEC_WRYJzMONyrbu` | `https://nid.naver.com` |
| **Kakao** | ✅ 완료 | `oidc.oidc.kakao` | `3b33b6a9cff448450f2cd350158d2b24` | `https://kauth.kakao.com` |

---

## 🔑 주요 설정 정보

### Google (google.com)

```
웹 클라이언트 ID: 1002923521242-5nvqp8fv... (Firebase Console에서 확인)
웹 클라이언트 보안 비밀번호: 설정됨
Redirect URI: Firebase SDK 자동 관리
```

**Google Cloud Console 설정**:

- ✅ OAuth 2.0 클라이언트 ID 생성 완료
- ✅ 승인된 리디렉션 URI 등록 완료
  - `https://bomnal-a023a.firebaseapp.com/__/auth/handler`
  - `http://localhost:3001`

---

### Naver (oidc.oidc.naver)

```
Client ID: gYF4YEC_WRYJzMONyrbu
Client Secret: 설정됨
Issuer: https://nid.naver.com
Callback URL: https://bomnal-a023a.firebaseapp.com/__/auth/handler
```

**Naver Developers 설정**:

- ✅ 애플리케이션 등록: bomnal
- ✅ 네아로 (네이버 아이디로 로그인) API 사용 설정
- ✅ PC 웹 환경 등록
  - 서비스 URL: `http://localhost:3001`
  - Callback URL: `https://bomnal-a023a.firebaseapp.com/__/auth/handler`, `http://localhost:3001`
- ✅ 제공 정보 설정
  - 회원이름 (필수)
  - 이메일 주소 (필수)
  - 프로필 사진 (필수)

**Firebase OIDC 설정**:

- ✅ 코드 흐름 사용
- ✅ 사용자 인증 정보를 본문으로 전송

---

### Kakao (oidc.oidc.kakao)

```
REST API 키 (Client ID): 3b33b6a9cff448450f2cd350158d2b24
Client Secret: f3OuXRnYS... (Kakao Developers에서 확인)
Issuer: https://kauth.kakao.com
Callback URL: https://bomnal-a023a.firebaseapp.com/__/auth/handler
앱 ID: 1372864
```

**Kakao Developers 설정**:

- ✅ 애플리케이션 등록: bomnal (앱 ID: 1372864)
- ✅ 플랫폼 등록
  - Web 플랫폼
  - 사이트 도메인: `http://localhost:3001`, `https://bomnal-a023a.firebaseapp.com`
- ✅ 카카오 로그인 활성화 (ON)
- ✅ Redirect URI 등록
  - `https://bomnal-a023a.firebaseapp.com/__/auth/handler`
  - `http://localhost:3001`
- ✅ 동의 항목 설정 (필수 동의)
  - 닉네임 (profile_nickname)
  - 프로필 사진 (profile_image)
  - 카카오계정(이메일) (account_email)
- ✅ 로그아웃 Redirect URI 등록
  - `http://localhost:3001`
  - `https://bomnal-a023a.firebaseapp.com/__/auth/handler`
- ✅ OpenID Connect 활성화 (사용)

**Firebase OIDC 설정**:

- ✅ 코드 흐름 사용
- ✅ 사용자 인증 정보를 본문으로 전송

---

## 📝 환경 변수 (.env)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=bomnal-a023a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bomnal-a023a
VITE_FIREBASE_STORAGE_BUCKET=bomnal-a023a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1002923521242
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google OAuth (선택사항)
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Naver OAuth (선택사항)
VITE_NAVER_CLIENT_ID=gYF4YEC_WRYJzMONyrbu
VITE_NAVER_CLIENT_SECRET=your_naver_client_secret

# Kakao OAuth (선택사항)
VITE_KAKAO_REST_API_KEY=3b33b6a9cff448450f2cd350158d2b24
VITE_KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

---

## 🧪 테스트 체크리스트

### 로컬 개발 환경 (localhost:3001)

- [ ] Google 로그인 테스트
- [ ] Naver 로그인 테스트
- [ ] Kakao 로그인 테스트
- [ ] 로그아웃 테스트
- [ ] 사용자 정보 표시 확인

### Firebase Console 확인

- [ ] Authentication > Users에서 로그인 사용자 확인
- [ ] 각 사용자의 제공업체 확인 (google.com, oidc.oidc.naver, oidc.oidc.kakao)

### 프로덕션 배포 전 확인

- [ ] 프로덕션 도메인을 각 플랫폼에 등록
- [ ] HTTPS 설정 확인
- [ ] 환경 변수 프로덕션 값으로 업데이트
- [ ] Client Secret 보안 확인

---

## 🔗 빠른 링크

### Firebase

- [Firebase Console - bomnal-a023a](https://console.firebase.google.com/project/bomnal-a023a)
- [Authentication 설정](https://console.firebase.google.com/project/bomnal-a023a/authentication/providers)

### Google

- [Google Cloud Console](https://console.cloud.google.com/)
- [API 및 서비스 - 사용자 인증 정보](https://console.cloud.google.com/apis/credentials)

### Naver

- [Naver Developers Console](https://developers.naver.com/apps/#/list)
- [내 애플리케이션 - bomnal](https://developers.naver.com/apps/#/myapps)

### Kakao

- [Kakao Developers Console](https://developers.kakao.com/console/app)
- [내 애플리케이션 - bomnal (1372864)](https://developers.kakao.com/console/app/1372864)

---

## 📚 상세 문서

전체 설정 가이드는 [`SNS_LOGIN_SETUP_GUIDE.md`](./SNS_LOGIN_SETUP_GUIDE.md)를 참조하세요.

---

**최종 업데이트**: 2024-01-21  
**상태**: ✅ 모든 SNS 로그인 설정 완료
