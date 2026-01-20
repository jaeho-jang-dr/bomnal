
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { firestore } from "./config";

const products = [
    // 1. Mobility & Safety (이동/안전)
    {
        name: "초경량 카본 지팡이",
        price: 45000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Walking+Cane", // FIXED
        description: "가볍고 튼튼한 카본 소재로 제작된 프리미엄 지팡이입니다. 높이 조절이 가능합니다.",
        tag: "mobility",
    },
    {
        name: "접이식 실버카 (보행보조기)",
        price: 189000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Silver+Walker", // FIXED
        description: "넉넉한 수납공간과 편안한 의자가 포함된 접이식 보행 보조기입니다.",
        tag: "mobility",
    },
    {
        name: "욕실 안전 손잡이 (흡착식)",
        price: 24000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Safety+Handle", // FIXED
        description: "타공 없이 간편하게 설치하는 강력 흡착식 안전 손잡이입니다.",
        tag: "mobility",
    },
    {
        name: "미끄럼 방지 매트 (욕실용)",
        price: 12000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Non-slip+Mat", // FIXED
        description: "물기 있는 욕실에서도 안전하게 사용할 수 있는 미끄럼 방지 매트입니다.",
        tag: "mobility",
    },
    {
        name: "기상 보조 손잡이",
        price: 58000,
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=60", // PASS
        description: "침대에서 일어나실 때 힘을 덜어주는 기상 보조 지지대입니다.",
        tag: "mobility",
    },

    // 2. Daily Living (생활/돌봄)
    {
        name: "성인용 기저귀 (팬티형)",
        price: 32000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Adult+Diapers", // FIXED
        description: "활동이 편안한 팬티형 디자인에 강력한 흡수력을 더했습니다.",
        tag: "daily",
    },
    {
        name: "스마트 알약 보관함",
        price: 15000,
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=60", // PASS
        description: "아침, 점심, 저녁 요일별로 약을 분리하여 잊지 않고 복용할 수 있습니다.",
        tag: "daily",
    },
    {
        name: "LED 확대경",
        price: 28000,
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500&auto=format&fit=crop&q=60", // PASS
        description: "어두운 곳에서도 작은 글씨를 선명하게 볼 수 있는 LED 조명 확대경입니다.",
        tag: "daily",
    },
    {
        name: "만능 오프너",
        price: 9900,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60", // PASS
        description: "손목 힘이 약해도 잼 병이나 음료수 뚜껑을 쉽게 열 수 있습니다.",
        tag: "daily",
    },
    {
        name: "안전 목욕 의자",
        price: 45000,
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&auto=format&fit=crop&q=60", // PASS (Fixed previously)
        description: "미끄럼 방지 다리가 부착되어 욕실에서 안전하게 앉아서 씻으실 수 있습니다.",
        tag: "daily",
    },

    // 3. Fashion & Comfort (패션/편의)
    {
        name: "발볼 넓은 효도화",
        price: 69000,
        image: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60", // PASS
        description: "발볼이 넓고 쿠션감이 좋아 오래 걸어도 편안한 신발입니다.",
        tag: "fashion",
    },
    {
        name: "미끄럼 방지 양말 (3켤레)",
        price: 12000,
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500&auto=format&fit=crop&q=60", // PASS
        description: "바닥에 실리콘 처리가 되어 있어 실내 낙상 사고를 예방합니다.",
        tag: "fashion",
    },
    {
        name: "기모 발열 조끼",
        price: 35000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Thermal+Vest", // FIXED
        description: "체온을 따뜻하게 유지해주는 부드러운 기모 안감의 조끼입니다.",
        tag: "fashion",
    },
    {
        name: "편안한 찍찍이 상하의",
        price: 59000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Comfy+Wear", // FIXED
        description: "단추 대신 벨크로(찍찍이)를 사용하여 입고 벗기가 매우 편리합니다.",
        tag: "fashion",
    },
    {
        name: "의료용 압박 스타킹",
        price: 22000,
        image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=500&auto=format&fit=crop&q=60", // PASS
        description: "다리의 혈액 순환을 돕고 붓기를 완화해주는 의료용 스타킹입니다.",
        tag: "fashion",
    },

    // 4. Health & Wellness (건강/힐링)
    {
        name: "목/어깨 온열 마사지기",
        price: 49000,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60", // PASS
        description: "하루의 피로를 풀어주는 온열 기능이 포함된 무선 마사지기입니다.",
        tag: "health",
    },
    {
        name: "고단백 영양음료 (24팩)",
        price: 38000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Protein+Drink", // FIXED
        description: "식사가 부담스러우실 때 간편하게 챙기는 균형 잡힌 영양식입니다.",
        tag: "health",
    },
    {
        name: "황토 온열 찜질팩",
        price: 25000,
        image: "https://placehold.co/500x500/e2e8f0/64748b?text=Heat+Pack", // FIXED
        description: "전자레인지에 데워 사용하는 천연 황토 성분의 찜질팩입니다.",
        tag: "health",
    },
    {
        name: "가정용 혈압계 (음성안내)",
        price: 85000,
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format&fit=crop&q=60", // PASS
        description: "큰 화면과 음성 안내 기능으로 어르신들도 쉽게 측정할 수 있습니다.",
        tag: "health",
    },
    {
        name: "지압 마사지 볼 세트",
        price: 9900,
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&auto=format&fit=crop&q=60", // PASS
        description: "손, 발, 어깨 등 뭉친 근육을 시원하게 풀어주는 지압 볼입니다.",
        tag: "health",
    },
];

export const seedProducts = async () => {
    try {
        const productsRef = collection(firestore, "products");
        const snapshot = await getDocs(productsRef);

        // Always clear existing products to ensure clean slate for new categories
        if (!snapshot.empty) {
            console.log("Clearing existing products...");
            const deleteBatch = writeBatch(firestore);
            snapshot.docs.forEach((doc) => {
                deleteBatch.delete(doc.ref);
            });
            await deleteBatch.commit();
            console.log("Existing products cleared.");
        }

        const batch = writeBatch(firestore);
        for (const product of products) {
            const docRef = doc(productsRef);
            batch.set(docRef, product);
        }

        await batch.commit();
        console.log("New products seeded successfully");
        return "Season 2 Update Complete: 20 New Items Added";
    } catch (error) {
        console.error("Error seeding products:", error);
        return "Error";
    }
};
