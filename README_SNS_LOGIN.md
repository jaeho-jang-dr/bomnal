# 봄날 (Bomnal) 프로젝트

## 📱 SNS 로그인 기능

봄날 프로젝트는 Firebase Authentication을 사용하여 다음 SNS 로그인을 지원합니다:

- ✅ **Google 로그인**
- ✅ **Naver 로그인** (OIDC)
- ✅ **Kakao 로그인** (OIDC)
- ✅ **이메일/비밀번호 로그인**

### 🚀 빠른 시작

#### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Firebase 설정을 추가하세요:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=bomnal-a023a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bomnal-a023a
VITE_FIREBASE_STORAGE_BUCKET=bomnal-a023a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1002923521242
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

#### 2. 의존성 설치

```bash
npm install
```

#### 3. 개발 서버 실행

```bash
npm run dev
```

#### 4. SNS 로그인 사용

```typescript
import authService from './lib/auth-service';

// Google 로그인
await authService.signInWithGoogle();

// Naver 로그인
await authService.signInWithNaver();

// Kakao 로그인
await authService.signInWithKakao();

// 로그아웃
await authService.signOut();
```

### 📚 상세 문서

- **[SNS 로그인 설정 가이드](./docs/SNS_LOGIN_SETUP_GUIDE.md)** - 전체 설정 방법 및 문제 해결
- **[SNS 로그인 설정 요약](./docs/SNS_LOGIN_SUMMARY.md)** - 빠른 참조용 설정 정보

### 🔧 주요 파일

```
bomnal/
├── src/
│   ├── lib/
│   │   └── auth-service.ts          # SNS 로그인 유틸리티 함수
│   └── components/
│       ├── SnsLogin.tsx              # SNS 로그인 React 컴포넌트
│       └── SnsLogin.css              # SNS 로그인 스타일
├── docs/
│   ├── SNS_LOGIN_SETUP_GUIDE.md     # 상세 설정 가이드
│   └── SNS_LOGIN_SUMMARY.md         # 설정 요약
└── .env                              # 환경 변수 (gitignore에 추가됨)
```

### 🔐 보안 고려사항

- ⚠️ **절대 Client Secret을 클라이언트 코드에 하드코딩하지 마세요**
- ✅ `.env` 파일을 `.gitignore`에 추가하세요
- ✅ Firebase OIDC를 사용하면 Client Secret이 서버 측에서 안전하게 관리됩니다
- ✅ 프로덕션 환경에서는 반드시 HTTPS를 사용하세요

### 🧪 테스트

각 SNS 로그인 기능을 테스트하려면:

1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:3001` 접속
3. 각 SNS 로그인 버튼 클릭하여 테스트
4. Firebase Console > Authentication > Users에서 로그인 사용자 확인

### 🔗 관련 링크

- [Firebase Console - bomnal-a023a](https://console.firebase.google.com/project/bomnal-a023a)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Naver Developers](https://developers.naver.com/apps/#/list)
- [Kakao Developers](https://developers.kakao.com/console/app)

### 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

**최종 업데이트**: 2024-01-21  
**버전**: 1.0.0
