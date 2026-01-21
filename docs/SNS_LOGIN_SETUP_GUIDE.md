# 봄날 SNS 로그인 설정 가이드

## 📋 목차

1. [개요](#개요)
2. [Firebase 설정](#firebase-설정)
3. [Google 로그인 설정](#google-로그인-설정)
4. [Naver 로그인 설정](#naver-로그인-설정)
5. [Kakao 로그인 설정](#kakao-로그인-설정)
6. [환경 변수 설정](#환경-변수-설정)
7. [테스트 방법](#테스트-방법)

---

## 개요

이 문서는 봄날 프로젝트의 SNS 로그인 기능 설정 방법을 안내합니다.

### 지원하는 로그인 방식

- ✅ Google 로그인
- ✅ Naver 로그인 (OIDC)
- ✅ Kakao 로그인 (OIDC)
- ✅ 이메일/비밀번호 로그인

### Firebase 프로젝트 정보

- **프로젝트 ID**: `bomnal-a023a`
- **프로젝트 번호**: `1002923521242`
- **인증 도메인**: `bomnal-a023a.firebaseapp.com`
- **공통 Redirect URI**: `https://bomnal-a023a.firebaseapp.com/__/auth/handler`

---

## Firebase 설정

### 1. Firebase Console 접속

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. `bomnal-a023a` 프로젝트 선택
3. 좌측 메뉴에서 **Authentication** 선택
4. **Sign-in method** 탭 선택

### 2. 현재 활성화된 제공업체

| 제공업체 | 상태 | Provider ID |
|---------|------|-------------|
| Google | ✅ 사용 설정됨 | google.com |
| Naver (OIDC) | ✅ 사용 설정됨 | oidc.oidc.naver |
| Kakao (OIDC) | ✅ 사용 설정됨 | oidc.oidc.kakao |
| 이메일/비밀번호 | ✅ 사용 설정됨 | password |

---

## Google 로그인 설정

### 1. Google Cloud Console 설정

#### OAuth 2.0 클라이언트 ID 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. `bomnal-a023a` 프로젝트 선택
3. **API 및 서비스** > **사용자 인증 정보** 이동
4. **+ 사용자 인증 정보 만들기** > **OAuth 2.0 클라이언트 ID** 선택
5. 애플리케이션 유형: **웹 애플리케이션** 선택

#### 승인된 리디렉션 URI 설정

다음 URI들을 추가:

```
https://bomnal-a023a.firebaseapp.com/__/auth/handler
http://localhost:3001
```

### 2. Firebase Console 설정

#### Google 제공업체 구성

1. Firebase Console > Authentication > Sign-in method
2. **Google** 제공업체 클릭
3. **사용 설정** 토글 활성화
4. **웹 SDK 구성** 섹션 확장
5. 다음 정보 입력:
   - **웹 클라이언트 ID**: Google Cloud Console에서 생성한 클라이언트 ID
   - **웹 클라이언트 보안 비밀번호**: Google Cloud Console에서 생성한 클라이언트 보안 비밀
6. **저장** 클릭

### 3. 현재 설정 정보

- **웹 클라이언트 ID**: `1002923521242-5nvqp8fv...` (전체 ID는 Firebase Console에서 확인)
- **웹 클라이언트 보안 비밀번호**: 설정됨 (마스킹됨)
- **Redirect URI**: Firebase SDK에서 자동 관리

---

## Naver 로그인 설정

### 1. Naver Developers 설정

#### 애플리케이션 등록

1. [Naver Developers](https://developers.naver.com/apps/#/register) 접속
2. **애플리케이션 등록** 클릭
3. 애플리케이션 정보 입력:
   - **애플리케이션 이름**: bomnal
   - **사용 API**: 네아로 (네이버 아이디로 로그인)

#### 서비스 환경 설정

**PC 웹** 환경 추가:

- **서비스 URL**: `http://localhost:3001`
- **Callback URL**:

  ```
  https://bomnal-a023a.firebaseapp.com/__/auth/handler
  http://localhost:3001
  ```

#### 제공 정보 선택

다음 정보를 필수로 선택:

- ✅ 회원이름
- ✅ 이메일 주소
- ✅ 프로필 사진

### 2. Firebase Console 설정

#### OIDC 제공업체 추가

1. Firebase Console > Authentication > Sign-in method
2. **새 제공업체 추가** 클릭
3. **OpenID Connect** 선택
4. 다음 정보 입력:

**기본 정보**:

- **이름**: `oidc.naver`
- **클라이언트 ID**: Naver Developers에서 발급받은 Client ID
- **발급기관(Issuer)**: `https://nid.naver.com`
- **클라이언트 보안 비밀번호**: Naver Developers에서 발급받은 Client Secret

**OIDC 흐름 구성**:

- ✅ **코드 흐름 사용** 체크

**사용자 인증 정보를 보내는 방법 선택**:

- ✅ **본문** 선택

1. **저장** 클릭

### 3. 현재 설정 정보

- **Client ID**: `gYF4YEC_WRYJzMONyrbu`
- **Client Secret**: 설정됨 (마스킹됨)
- **Issuer**: `https://nid.naver.com`
- **Callback URL**: `https://bomnal-a023a.firebaseapp.com/__/auth/handler`
- **Provider ID**: `oidc.oidc.naver`

---

## Kakao 로그인 설정

### 1. Kakao Developers 설정

#### 애플리케이션 생성

1. [Kakao Developers](https://developers.kakao.com/console/app) 접속
2. **애플리케이션 추가하기** 클릭
3. 앱 정보 입력:
   - **앱 이름**: bomnal
   - **사업자명**: 개인 또는 회사명

#### 플랫폼 설정

1. **앱 설정** > **플랫폼** 메뉴
2. **Web 플랫폼 등록** 클릭
3. **사이트 도메인** 입력:

   ```
   http://localhost:3001
   https://bomnal-a023a.firebaseapp.com
   ```

#### Kakao 로그인 활성화

1. **제품 설정** > **카카오 로그인** 메뉴
2. **활성화 설정** 상태를 **ON**으로 변경
3. **Redirect URI** 등록:

   ```
   https://bomnal-a023a.firebaseapp.com/__/auth/handler
   http://localhost:3001
   ```

#### 동의 항목 설정

1. **제품 설정** > **카카오 로그인** > **동의 항목** 메뉴
2. 다음 항목을 **필수 동의**로 설정:
   - ✅ **닉네임** (profile_nickname)
   - ✅ **프로필 사진** (profile_image)
   - ✅ **카카오계정(이메일)** (account_email)

#### 고급 설정

1. **제품 설정** > **카카오 로그인** > **고급** 메뉴
2. **로그아웃 Redirect URI** 등록:

   ```
   http://localhost:3001
   https://bomnal-a023a.firebaseapp.com/__/auth/handler
   ```

#### OpenID Connect 활성화

1. **제품 설정** > **카카오 로그인** > **일반** 메뉴
2. **사용자 설정** 섹션에서:
   - ✅ **사용** 토글 활성화
3. **OpenID Connect** 섹션에서:
   - ✅ **사용** 토글 활성화

### 2. Firebase Console 설정

#### OIDC 제공업체 추가

1. Firebase Console > Authentication > Sign-in method
2. **새 제공업체 추가** 클릭
3. **OpenID Connect** 선택
4. 다음 정보 입력:

**기본 정보**:

- **이름**: `oidc.kakao`
- **클라이언트 ID**: Kakao Developers의 **REST API 키**
- **발급기관(Issuer)**: `https://kauth.kakao.com`
- **클라이언트 보안 비밀번호**: Kakao Developers의 **Client Secret**

**OIDC 흐름 구성**:

- ✅ **코드 흐름 사용** 체크

**사용자 인증 정보를 보내는 방법 선택**:

- ✅ **본문** 선택

1. **저장** 클릭

### 3. 현재 설정 정보

- **REST API 키 (Client ID)**: `3b33b6a9cff448450f2cd350158d2b24`
- **Client Secret**: `f3OuXRnYS...` (전체 키는 Kakao Developers에서 확인)
- **Issuer**: `https://kauth.kakao.com`
- **Callback URL**: `https://bomnal-a023a.firebaseapp.com/__/auth/handler`
- **Provider ID**: `oidc.oidc.kakao`
- **앱 ID**: `1372864`

---

## 환경 변수 설정

### `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=bomnal-a023a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bomnal-a023a
VITE_FIREBASE_STORAGE_BUCKET=bomnal-a023a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1002923521242
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google OAuth (선택사항 - Firebase SDK가 자동 처리)
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Naver OAuth (선택사항 - Firebase OIDC가 처리)
VITE_NAVER_CLIENT_ID=gYF4YEC_WRYJzMONyrbu
VITE_NAVER_CLIENT_SECRET=your_naver_client_secret

# Kakao OAuth (선택사항 - Firebase OIDC가 처리)
VITE_KAKAO_REST_API_KEY=3b33b6a9cff448450f2cd350158d2b24
VITE_KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

### 환경 변수 확인 방법

Firebase 설정 정보는 Firebase Console에서 확인:

1. Firebase Console > 프로젝트 설정 (⚙️ 아이콘)
2. **일반** 탭 > **내 앱** 섹션
3. 웹 앱 선택 > **SDK 설정 및 구성** 확인

---

## 테스트 방법

### 1. 로컬 개발 환경 테스트

#### 개발 서버 실행

```bash
npm run dev
```

#### 각 SNS 로그인 테스트

1. **Google 로그인**:
   - Google 로그인 버튼 클릭
   - Google 계정 선택
   - 권한 동의
   - 로그인 성공 확인

2. **Naver 로그인**:
   - Naver 로그인 버튼 클릭
   - Naver 계정으로 로그인
   - 정보 제공 동의
   - 로그인 성공 확인

3. **Kakao 로그인**:
   - Kakao 로그인 버튼 클릭
   - Kakao 계정으로 로그인
   - 정보 제공 동의
   - 로그인 성공 확인

### 2. Firebase Console에서 사용자 확인

1. Firebase Console > Authentication > Users
2. 로그인한 사용자 목록 확인
3. 각 사용자의 제공업체 확인 (google.com, oidc.oidc.naver, oidc.oidc.kakao)

### 3. 브라우저 개발자 도구 확인

```javascript
// 콘솔에서 현재 로그인 사용자 확인
firebase.auth().currentUser
```

---

## 문제 해결

### Google 로그인 오류

#### "redirect_uri_mismatch" 오류

**원인**: Redirect URI가 Google Cloud Console에 등록되지 않음

**해결 방법**:

1. Google Cloud Console > API 및 서비스 > 사용자 인증 정보
2. OAuth 2.0 클라이언트 ID 선택
3. 승인된 리디렉션 URI에 다음 추가:

   ```
   https://bomnal-a023a.firebaseapp.com/__/auth/handler
   ```

#### "invalid_client" 오류

**원인**: 클라이언트 ID 또는 보안 비밀번호가 잘못됨

**해결 방법**:

1. Firebase Console에서 Google 제공업체 설정 확인
2. 웹 클라이언트 ID와 보안 비밀번호 재확인
3. Google Cloud Console에서 정확한 값 복사하여 재입력

### Naver 로그인 오류

#### "callback url mismatch" 오류

**원인**: Callback URL이 Naver Developers에 등록되지 않음

**해결 방법**:

1. Naver Developers Console > 내 애플리케이션 > bomnal
2. API 설정 > 네아로 (네이버 아이디로 로그인)
3. PC 웹 > Callback URL에 다음 추가:

   ```
   https://bomnal-a023a.firebaseapp.com/__/auth/handler
   ```

#### "invalid_request" 오류

**원인**: OIDC 설정이 잘못됨

**해결 방법**:

1. Firebase Console에서 Naver OIDC 설정 확인
2. Issuer가 `https://nid.naver.com`인지 확인
3. 코드 흐름 사용이 체크되어 있는지 확인
4. 사용자 인증 정보를 "본문"으로 보내는지 확인

### Kakao 로그인 오류

#### "KOE006" 오류 (redirect_uri mismatch)

**원인**: Redirect URI가 Kakao Developers에 등록되지 않음

**해결 방법**:

1. Kakao Developers Console > 내 애플리케이션 > bomnal
2. 제품 설정 > 카카오 로그인 > 일반
3. Redirect URI에 다음 추가:

   ```
   https://bomnal-a023a.firebaseapp.com/__/auth/handler
   ```

#### "KOE101" 오류 (카카오 로그인 비활성화)

**원인**: 카카오 로그인이 활성화되지 않음

**해결 방법**:

1. Kakao Developers Console > 제품 설정 > 카카오 로그인
2. 활성화 설정 상태를 **ON**으로 변경

#### "KOE201" 오류 (동의 항목 미설정)

**원인**: 필수 동의 항목이 설정되지 않음

**해결 방법**:

1. Kakao Developers Console > 제품 설정 > 카카오 로그인 > 동의 항목
2. 닉네임, 프로필 사진, 이메일을 필수 동의로 설정

#### "invalid_client" 오류

**원인**: REST API 키 또는 Client Secret이 잘못됨

**해결 방법**:

1. Kakao Developers Console > 앱 설정 > 앱 키
2. REST API 키 확인 및 복사
3. 제품 설정 > 카카오 로그인 > 보안
4. Client Secret 코드 확인 및 복사
5. Firebase Console에서 정확한 값으로 재입력

#### "OpenID Connect 비활성화" 오류

**원인**: OpenID Connect가 활성화되지 않음

**해결 방법**:

1. Kakao Developers Console > 제품 설정 > 카카오 로그인 > 일반
2. OpenID Connect 섹션에서 **사용** 토글 활성화

---

## 보안 고려사항

### 1. Client Secret 관리

- ⚠️ **절대 클라이언트 코드에 하드코딩하지 마세요**
- ✅ 환경 변수 (`.env`) 사용
- ✅ `.env` 파일을 `.gitignore`에 추가
- ✅ Firebase OIDC를 사용하면 Client Secret이 서버 측에서 관리됨

### 2. Redirect URI 검증

- ✅ 프로덕션 도메인만 등록
- ✅ 로컬 개발용 URI는 개발 환경에서만 사용
- ⚠️ 와일드카드 URI 사용 금지

### 3. 사용자 정보 보호

- ✅ 필요한 최소한의 정보만 요청
- ✅ 사용자 동의 항목 명확히 표시
- ✅ 개인정보 처리방침 준수

### 4. HTTPS 사용

- ✅ 프로덕션 환경에서는 반드시 HTTPS 사용
- ✅ Firebase Hosting은 자동으로 HTTPS 제공

---

## 참고 자료

### Firebase

- [Firebase Authentication 문서](https://firebase.google.com/docs/auth)
- [Firebase OIDC 제공업체](https://firebase.google.com/docs/auth/web/openid-connect)

### Google

- [Google Identity Platform](https://developers.google.com/identity)
- [OAuth 2.0 설정](https://developers.google.com/identity/protocols/oauth2)

### Naver

- [네이버 로그인 API](https://developers.naver.com/docs/login/overview/)
- [네이버 로그인 개발가이드](https://developers.naver.com/docs/login/devguide/)

### Kakao

- [카카오 로그인 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
- [카카오 OpenID Connect](https://developers.kakao.com/docs/latest/ko/kakaologin/common#oidc)

---

## 업데이트 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2024-01-21 | 1.0.0 | 초기 문서 작성 - Google, Naver, Kakao 로그인 설정 완료 |

---

## 문의

설정 과정에서 문제가 발생하면 다음을 확인하세요:

1. 이 문서의 [문제 해결](#문제-해결) 섹션
2. Firebase Console의 오류 로그
3. 브라우저 개발자 도구의 콘솔 로그
4. 각 플랫폼의 공식 문서

---

**작성일**: 2024-01-21  
**작성자**: Bomnal Development Team  
**버전**: 1.0.0
