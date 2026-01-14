# 봄날 (BomNal) - 시니어 라이프스타일 샵 프로젝트 계획안

본 문서는 **BomNal** 프로젝트를 위한 Design-First 접근 방식의 계획서입니다.  
**Agents Team 1, 2, 3**의 분석 결과를 종합하여 수립되었습니다.

## 🖼️ 시각적 디자인 컨셉 (Visual Direction) - Team 2

*사용자가 요청한 "디자인 먼저" 원칙에 따라 시각적 정체성을 최우선으로 정의합니다.*

### 1. 디자인 키워드

- **따뜻함 (Warmth)**: 차가운 디지털 공간이 아닌, 안방처럼 편안한 느낌의 우드(Wood) & 크림(Cream) 톤.
- **품격 (Dignity)**: 단순한 '노인용품점'이 아닌, 멋진 시니어 라이프를 위한 '부티크'.
- **명확함 (Clarity)**: 침침한 눈에도 또렷하게 보이는 큰 글자와 확실한 대비.

### 2. 컬러 팔레트 (Color Palette)

| 색상명 | Hex Code | 용도 | 느낌 |
|:---:|:---:|:---|:---|
| **Warm Wood** | `#6c4f37` | 메인 강조색, 버튼, 테두리 | 견고함, 신뢰, 고급스러움 |
| **Soft Cream** | `#fdf8f3` | 전체 배경 | 눈이 편안함, 깨끗함 |
| **Sage Green** | `#6f8b70` | 포인트, 긍정적 메시지(무료배송 등) | 자연, 치유, 안정 |
| **Oak Border** | `#e3e0de` | 영역 구분선 | 부드러운 경계 |

### 3. 타이포그래피 (Typography)

- **메인 폰트**: `Noto Sans KR` (한글 가독성 최적화).
- **포인트 폰트**: `Plus Jakarta Sans` (세련된 영문 포인트).
- **크기 원칙**:
  - 기본 본문: `1.125rem` (18px) 이상.
  - 제목: `1.5rem` (24px) ~ `2.25rem` (36px).
  - 버튼 텍스트: 두껍고 크게 (`font-bold`).

---

## 📋 전략 및 기획 (Business Strategy) - Team 1

*상품 배치와 결제/물류 구조에 대한 전략입니다.*

### 1. "Pride First" 카테고리 배치 전략

*부끄러운 물건은 뒤로, 자랑하고 싶은 물건은 앞으로.*

- **Front (메인/상단)**:
  - **패션/잡화**: 멋진 스카프, 가벼운 외출복, 고급 지팡이, 선글라스.
  - **계절 선물**: 명절 선물 세트, 건강식품.
- **Back (서브/하단/검색)**:
  - **케어 용품**: 성인용 기저귀, 요실금 패드, 욕창 방지 매트.
  - *접근법*: '시크릿 케어' 또는 '생활 필수품'이라는 은유적 카테고리 명칭 사용.

### 2. 비즈니스 모델 연결

- **로그인**: 카카오/네이버 소셜 로그인 (어르신들에게 가장 친숙함).
- **결제 (Smart Shopping)**:
  - 자체 결제 모듈 대신 **네이버 스마트스토어/N-Pay** 연동 지향.
  - 이유: 신뢰도 확보 및 간편한 결제 경험 제공.
- **물류 (Drop Ship)**:
  - 재고 부담 없는 위탁 판매 방식.
  - 주문 접수 시 공급사로 자동 발주 시스템 구축 필요.

---

## 🛠️ 기술 아키텍처 (Technical Specs) - Team 3

*Firebase 기반의 Serverless 아키텍처를 제안합니다.*

### 1. Tech Stack

- **Frontend**: `Next.js 16 (App Router)` + `Tailwind CSS`.
- **Database**: `Firebase Firestore` (NoSQL).
- **Authentication**: `Firebase Auth` (Social Login 구현).
- **Hosting**: `Firebase Hosting` (빠르고 안정적인 배포).

### 2. 데이터 구조 (Schema Draft)

```typescript
interface Product {
  id: string;
  name: string;
  category: 'FASHION' | 'HEALTH' | 'CARE' | 'GIFT';
  displayPriority: number; // 높을수록 앞에 배치 (Fashion > Care)
  price: number;
  imageUrl: string;
  dropshipVendorId: string; // 공급사 정보
  naverStoreUrl: string; // 구매 클릭 시 이동할 스마트스토어 주소 (옵션)
}
```

## 📅 진행 로드맵 (Roadmap)

1. **Phase 1: 디자인 프로토타이핑 (현재 단계)**
    - 메인 페이지 디자인 확정 및 Mockup 시연.
2. **Phase 2: Firebase 환경 설정**
    - Auth, Firestore, Hosting 초기화.
3. **Phase 3: 프론트엔드 개발**
    - 컴포넌트 개발 (헤더, 상품 카드, 푸터).
    - 반응형 레이아웃 구현.
4. **Phase 4: 기능 연동 및 배포**
    - 소셜 로그인 연동.
    - Firebase 배포.

---
**결론**: 위 계획에 따라 디자인을 우선적으로 보여드리고, 승인 시 코딩(Phase 2)으로 넘어갑니다.
