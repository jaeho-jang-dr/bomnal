# Product: BomNal (On-gi Sang-jeom / 봄날 온기상점)

## 1. Vision (비전)

**BomNal(봄날)**은 따뜻한 "우드 톤" 미학을 기반으로 설계된 시니어 친화적인 온라인 패션 & 라이프스타일 쇼핑몰입니다. 주 목표는 실버 세대에게 접근성 높고 가독성이 뛰어난 쇼핑 경험을 제공하는 것이며, 편안한 패션과 위탁 판매(Dropshipping) 제품에 주력합니다.

## 2. Technical Stack (기술 스택)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (설정 파일: `tailwind.config.ts`, `globals.css`)
- **State Management**: Zustand (`src/store/`)
- **Database & Auth**: Firebase (Firestore, Authentication, Storage)
- **Deployment**: Firebase Hosting / Vercel (보류됨)
- **Package Manager**: npm

## 3. Design System (디자인 시스템)

- **Theme**: "Warm Wood" (베이지, 브라운, 부드러운 화이트).
- **Typography**: 가독성을 위한 고대비 큰 텍스트 (`text-lg` 기본).
- **Layout**: 큰 터치 영역, 단순화된 내비게이션, 복잡함 최소화.
- **Assets**: `local_picture/` 폴더에 플레이스홀더 또는 로컬 에셋 저장.

## 4. Architecture & Key Features (아키텍처 및 주요 기능)

- **Authentication (인증)** (✅ 완료):
  - `src/lib/firebase/auth.ts`에 모듈화된 인증 로직.
  - 전역 인증 상태 훅: `useAuth`.
  - 로그인/회원가입을 위한 통합 `AuthModal`.
- **Shopping Cart (장바구니)** (✅ 완료):
  - 로그인 유저: Firestore 기반 영구 저장.
  - 게스트: LocalStorage 사용.
  - `src/store/cartStore.ts`로 관리.
- **Payment System (결제 시스템)** (⏸️ 보류됨 - Feature Delayed):
  - 앱 완성도 향상 후 구현 예정.
  - [Plan] 네이버 스마트 스토어 & 포트원 통합.
- **Admin Dashboard (관리자 대시보드)** (`/admin`) (🚧 진행 중):
  - 역할 기반 접근 제어 (Firestore `users` 컬렉션, `role: 'admin'`) - 가드(Guard) 구현됨.
  - 상품 관리 (CRUD) - `products` 컬렉션.
  - 주문 관리 - `orders` 컬렉션.
  - 사이트 설정 - `settings`.

## 5. Current Milestone (현재 마일스톤)

**Phase 4: 기능 고도화 및 UI 폴리싱 (배포 잠정 중단)**

- [x] 기본 Next.js 설정
- [x] Tailwind CSS 구성
- [x] Firebase 초기화 및 인증 설정
- [x] 사용자 인증 (로그인/회원가입)
- [x] 장바구니 로직 (Zustand + Firestore)
- [x] 관리자 페이지 접근 제어 (Admin Guard)
- [x] 상품 데이터 시딩(Seeding) 완료
- [ ] UI/UX 디테일 완성 (앱 완성도 집중)
