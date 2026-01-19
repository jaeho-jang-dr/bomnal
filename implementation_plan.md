# Bomnal Project Implementation Plan

## 1. Core Technology Setup
*   **Backend**: Use Firebase for Authentication, Firestore (database), and Storage.
*   **State Management**: Use `zustand` for global client-side state (user session, shopping cart).
*   **Configuration**:
    *   Initialize Firebase in `src/lib/firebase/config.ts`.
    *   Store sensitive keys in `.env.local`.

## 2. Modular Authentication
*   **Logic**: Create reusable Firebase auth functions in `src/lib/firebase/auth.ts`.
*   **State**: Manage user session with a `useAuth` custom hook (`src/hooks/useAuth.ts`).
*   **UI**: Build a single, reusable `AuthModal.tsx` in `src/components/auth/` for all login methods (Email, Google, etc.).
*   **Integration**: Update navigation to show the auth modal or a user profile link.

## 3. Shopping Cart
*   **Backend**: Persist user carts in a `carts` collection in Firestore. Use local storage for guest carts.
*   **State**: Manage cart items and totals with a `zustand` store (`src/store/cartStore.ts`).
*   **UI**:
    *   `CartIcon.tsx`: Display item count in the header.
    *   `CartView.tsx`: A sidebar/modal showing cart details.
    *   `src/app/checkout/page.tsx`: The main checkout page.
*   **Integration**: Connect "Add to Cart" buttons and sync guest cart to Firestore upon login.

## 4. Admin Dashboard
*   **Routing**: Create a protected admin section at `src/app/(admin)/admin/...`.
*   **Backend (Firestore Collections)**:
    *   `users`: To store user roles (e.g., `role: 'admin'`).
    *   `products`: For all product information (CRUD).
    *   `orders`: For all order information.
*   **Features**:
    *   **/admin/users**: Manage user roles.
    *   **/admin/products**: Full CRUD for products.
    *   **/admin/orders**: View and manage customer orders.
    *   **/admin/settings**: Manage general site content.

## 5. Dual Payment System
*   **Checkout Page**: `src/app/checkout/page.tsx` will offer two payment choices.
*   **Option 1: Naver Smart Store**
    *   A simple "Pay with Naver" button that redirects the user to the appropriate Naver Smart Store URL.
*   **Option 2: Direct Payment (PortOne)**
    *   **Why PortOne?**: A payment aggregator that simplifies adding various Korean payment methods.
    *   **Backend API Routes**:
        *   `/api/payments/prepare`: To validate the cart and get a transaction ID from PortOne.
        *   `/api/payments/webhook`: A secure endpoint for PortOne to call to confirm payment. This will trigger order creation in Firestore.
    *   **UI**: A `DirectPayment.tsx` component to handle the PortOne SDK flow on the client-side.