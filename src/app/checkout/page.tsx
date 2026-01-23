'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/store/cartStore';
import { createOrder } from '@/lib/firebase/firestore';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/config';
import { DEFAULT_SETTINGS, SiteSettings } from '@/types/settings';
import Image from 'next/image';

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [naverStoreUrl, setNaverStoreUrl] = useState(DEFAULT_SETTINGS.shop.naverStoreUrl);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(firestore, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as SiteSettings;
          if (data.shop?.naverStoreUrl) {
            setNaverStoreUrl(data.shop.naverStoreUrl);
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Shipping Form State
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
    detailAddress: '',
    memo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // 1. Naver Smart Store Redirection
  const handleNaverPay = () => {
    if (naverStoreUrl) {
      window.open(naverStoreUrl, '_blank');
    } else {
      alert('네이버 스토어 주소가 설정되지 않았습니다.');
    }
  };

  // 2. Direct Order Creation
  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("배송지 정보를 모두 입력해주세요.");
      return;
    }

    if (!confirm("주문을 진행하시겠습니까?")) return;

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedOption: item.selectedOption || null,
          image: item.image
        })),
        totalAmount: totalPrice(),
        status: 'pending', // pending, paid, shipped, delivered, cancelled
        shippingInfo: shippingInfo,
        createdAt: serverTimestamp(),
        paymentMethod: 'direct_bank_transfer'
      };

      await createOrder(orderData);

      // Success
      clearCart();
      alert("주문이 정상적으로 접수되었습니다.");
      router.replace('/orders'); // Go to order history

    } catch (error) {
      console.error("Order failed", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">주문/결제</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Order Items & Shipping Form */}
        <div className="space-y-6">
          {/* 1. Order Summary */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              주문 상품 ({items.length})
            </h2>
            <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {items.map(item => (
                <li key={item.id + item.selectedOption} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.selectedOption && <span className="mr-2">[{item.selectedOption}]</span>}
                      {item.quantity}개
                    </p>
                  </div>
                  <div className="text-right font-bold text-sm">
                    ₩{(item.price * item.quantity).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <span className="font-bold text-gray-600 dark:text-gray-300">총 결제 금액</span>
              <span className="text-2xl font-black text-primary">₩{totalPrice().toLocaleString()}</span>
            </div>
          </section>

          {/* 2. Shipping Info Form */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              배송지 정보
            </h2>
            <form id="order-form" onSubmit={handleDirectOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">받는 분</label>
                  <input
                    type="text" name="name" required
                    value={shippingInfo.name} onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel" name="phone" required placeholder="010-0000-0000"
                    value={shippingInfo.phone} onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input
                  type="text" name="address" required
                  value={shippingInfo.address} onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="기본 주소"
                />
                <input
                  type="text" name="detailAddress" required
                  value={shippingInfo.detailAddress} onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="상세 주소 (동, 호수 등)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">배송 메모</label>
                <input
                  type="text" name="memo"
                  value={shippingInfo.memo} onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="예: 문 앞에 놓아주세요."
                />
              </div>
            </form>
          </section>
        </div>

        {/* Right Column: Payment Methods */}
        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">payments</span>
              결제 방법 선택
            </h2>

            <div className="space-y-4">
              {/* Option 1: Naver Pay */}
              <button
                onClick={handleNaverPay}
                className="w-full group relative overflow-hidden bg-[#03C75A] hover:bg-[#02b351] text-white p-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3 z-10">
                  <span className="font-extrabold text-2xl">N</span>
                  <div className="text-left">
                    <div className="font-bold text-lg">네이버 페이로 구매</div>
                    <div className="text-xs opacity-90">네이버 포인트 적립 가능</div>
                  </div>
                </div>
                <span className="material-symbols-outlined z-10">arrow_forward_ios</span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-800 px-2 text-gray-500">OR</span></div>
              </div>

              {/* Option 2: Direct Order (Bank Transfer) */}
              <div className="border-2 border-primary/20 bg-primary/5 rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">account_balance</span>
                  무통장 입금 / 간편 주문
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  쇼핑몰에서 직접 주문서를 작성하고,<br />
                  지정된 계좌로 입금하여 구매합니다.
                </p>
                <button
                  type="submit"
                  form="order-form"
                  disabled={loading}
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '주문 처리 중...' : '주문하기'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
