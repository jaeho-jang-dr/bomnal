# Bomnal Project Implementation Plan

## 1. Core Technology Setup (✅ Completed)

* **Backend**: Firebase (Auth, Firestore, Storage).
* **State**: Zustand (`authStore`, `cartStore`).
* **Config**: `src/lib/firebase/config.ts`.

## 2. Modular Authentication (✅ Completed)

* **Logic**: `src/lib/firebase/auth.ts`.
* **UI**: `src/app/login/page.tsx`.

## 3. Shopping Cart (✅ Completed)

* **Logic**: `src/store/cartStore.ts`.
* **UI**: `CartView.tsx`, `CartItem.tsx`.

## 4. Admin Dashboard (✅ Completed)

* **Access Control**: Implemented via `useAuth` and Firestore logic.
* **Product Management**: `AdminProductsPage` with CRUD.

## 5. Final Feature Completion (🚧 Current Focus)

### 5.1 Extended Authentication (Login Page) (✅ Completed)

* **Goal**: Add Naver & Kakao Login support.
* **File**: `src/app/login/page.tsx`, `src/lib/firebase/auth.ts`
* **Tasks**:
  * ✅ Add "Naver Login" and "Kakao Login" buttons.
  * ✅ Implement Firebase OIDC logic (`oidc.naver`, `oidc.kakao`).
  * ✅ User configured Firebase Console & Developer Portals.

### 5.2 Admin Product "Smart Input" Optimization (✅ Completed)

* **Goal**: Ensure "Input by URL" and "Smart Analysis" work perfectly.
* **File**: `src/app/api/admin/analyze-product/route.ts`
* **Tasks**:
  * ✅ **URL Fetching**: Implemented server-side fetch with `cheerio` & `iconv-lite`.
  * ✅ **Image Analysis**: Verified via existing logic.

### 5.3 Checkout & Payment Features (✅ Completed)

* **Goal**: Enable "Naver Smart Store" redirection and "Direct Purchase".
* **File**: `src/app/checkout/page.tsx`, `src/lib/firebase/firestore.ts`
* **Tasks**:
  * ✅ **Naver Smart Store**: Redirection implemented.
  * ✅ **Direct Purchase**: Implemented `createOrder`, shipping form, and cart clearing.
  * ✅ **Order History**: Implemented `getOrders`.

### 5.4 Deployment

* **Goal**: Deploy to production.
* **Tasks**:
  * Run `npm run build`.
  * Deploy to Firebase Hosting (`firebase deploy`).

## 6. Future

* Advanced Payment Gateway (PortOne).
* Review Reviews system.
