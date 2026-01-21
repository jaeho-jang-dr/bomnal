
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { firestore } from "./config";

const products = [
    // --- 1. Mobility & Safety (이동/안전) ---
    {
        name: "초경량 카본 지팡이",
        price: 45000,
        image: "https://images.unsplash.com/photo-1533618696229-450418388143?w=500&auto=format&fit=crop&q=60",
        description: "가볍고 튼튼한 카본 소재로 제작된 프리미엄 지팡이입니다. 높이 조절이 가능합니다.",
        tag: "mobility",
        options: ["블랙", "브라운", "와인"]
    },
    {
        name: "접이식 실버카 (보행보조기)",
        price: 189000,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60",
        description: "넉넉한 수납공간과 편안한 의자가 포함된 접이식 보행 보조기입니다.",
        tag: "mobility",
        options: ["일반형", "고급형 (+20,000원)"]
    },
    {
        name: "욕실 안전 손잡이 (흡착식)",
        price: 24000,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60",
        description: "타공 없이 간편하게 설치하는 강력 흡착식 안전 손잡이입니다.",
        tag: "mobility",
        options: ["30cm", "50cm (+5,000원)"]
    },
    {
        name: "미끄럼 방지 매트 (욕실용)",
        price: 12000,
        image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&auto=format&fit=crop&q=60",
        description: "물기 있는 욕실에서도 안전하게 사용할 수 있는 미끄럼 방지 매트입니다.",
        tag: "mobility",
        options: ["소형 (40x60)", "대형 (60x90 +8,000원)"]
    },
    {
        name: "기상 보조 손잡이",
        price: 58000,
        image: "https://images.unsplash.com/photo-1628144211603-c3c25b30368b?w=500&auto=format&fit=crop&q=60",
        description: "침대에서 일어나실 때 힘을 덜어주는 기상 보조 지지대입니다.",
        tag: "mobility",
        options: ["기본형", "높이조절형 (+10,000원)"]
    },
    {
        name: "프리미엄 알루미늄 휠체어",
        price: 280000,
        image: "https://images.unsplash.com/photo-1574672621481-e0de1b32f94d?w=500&auto=format&fit=crop&q=60",
        description: "가벼운 알루미늄 프레임과 통기성 시트를 적용한 고급 휠체어입니다.",
        tag: "mobility",
        options: ["기본형", "보호자용 브레이크형 (+30,000원)"]
    },
    {
        name: "전동 침대용 등받이",
        price: 150000,
        image: "https://images.unsplash.com/photo-1505693416388-b0346809d0bf?w=500&auto=format&fit=crop&q=60",
        description: "침대 위에서 편안하게 상체를 세울 수 있는 리모컨 작동 등받이입니다.",
        tag: "mobility",
        options: ["싱글", "더블 (+50,000원)"]
    },
    {
        name: "차량 승하차 손잡이",
        price: 15000,
        image: "https://plus.unsplash.com/premium_photo-1663045241851-9964552467b7?w=500&auto=format&fit=crop&q=60",
        description: "차량 도어 래치에 걸어 사용하는 휴대용 승하차 보조 손잡이입니다.",
        tag: "mobility",
        options: ["블랙", "레드"]
    },
    {
        name: "4발 지팡이 (자립형)",
        price: 32000,
        image: "https://images.unsplash.com/photo-1626079973874-5eb9c025805e?w=500&auto=format&fit=crop&q=60",
        description: "안정적인 4발 받침으로 혼자 서 있을 수 있는 편리한 지팡이입니다.",
        tag: "mobility",
        options: ["오른손잡이용", "왼손잡이용"]
    },

    // --- 2. Daily Living (생활/돌봄) ---
    {
        name: "성인용 기저귀 (팬티형)",
        price: 32000,
        image: "https://images.unsplash.com/photo-1549488497-4d92fa6144e5?w=500&auto=format&fit=crop&q=60",
        description: "활동이 편안한 팬티형 디자인에 강력한 흡수력을 더했습니다.",
        tag: "daily",
        options: ["M (18매)", "L (16매)", "XL (14매)"]
    },
    {
        name: "스마트 알약 보관함",
        price: 15000,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
        description: "아침, 점심, 저녁 요일별로 약을 분리하여 잊지 않고 복용할 수 있습니다.",
        tag: "daily",
        options: ["7일용", "30일용 (+5,000원)"]
    },
    {
        name: "LED 확대경",
        price: 28000,
        image: "https://images.unsplash.com/photo-1633533452148-af7af28a6493?w=500&auto=format&fit=crop&q=60",
        description: "어두운 곳에서도 작은 글씨를 선명하게 볼 수 있는 LED 조명 확대경입니다.",
        tag: "daily",
        options: ["3배율", "5배율 (+3,000원)"]
    },
    {
        name: "만능 오프너",
        price: 9900,
        image: "https://images.unsplash.com/photo-1582294435868-b3d5b74c5d5d?w=500&auto=format&fit=crop&q=60",
        description: "손목 힘이 약해도 잼 병이나 음료수 뚜껑을 쉽게 열 수 있습니다.",
        tag: "daily",
        options: ["레드", "그린", "블루"]
    },
    {
        name: "안전 목욕 의자",
        price: 45000,
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&auto=format&fit=crop&q=60",
        description: "미끄럼 방지 다리가 부착되어 욕실에서 안전하게 앉아서 씻으실 수 있습니다.",
        tag: "daily",
        options: ["일반형", "등받이형 (+15,000원)"]
    },
    {
        name: "틀니 세척기 (초음파)",
        price: 39000,
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&auto=format&fit=crop&q=60",
        description: "초음파 진동으로 틀니의 미세한 틈새까지 깨끗하게 세척합니다.",
        tag: "daily",
        options: ["화이트", "핑크"]
    },
    {
        name: "장거리 리모콘 (큰 버튼)",
        price: 18000,
        image: "https://images.unsplash.com/photo-1557864147-32059341aa57?w=500&auto=format&fit=crop&q=60",
        description: "큰 숫자와 버튼으로 누구나 쉽게 사용할 수 있는 TV/에어컨 통합 리모콘입니다.",
        tag: "daily",
        options: ["공용"]
    },
    {
        name: "자동 손세정제 디스펜서",
        price: 22000,
        image: "https://images.unsplash.com/photo-1620392357731-0737f0775d7e?w=500&auto=format&fit=crop&q=60",
        description: "손을 대면 자동으로 거품이 나와 위생적인 손 씻기를 도와줍니다.",
        tag: "daily",
        options: ["건전지식", "충전식 (+5,000원)"]
    },
    {
        name: "다용도 집게 (리처)",
        price: 8900,
        image: "https://images.unsplash.com/photo-1544654030-22c6085a698a?w=500&auto=format&fit=crop&q=60",
        description: "허리를 굽히지 않고도 바닥의 물건을 쉽게 집을 수 있는 만능 집게입니다.",
        tag: "daily",
        options: ["45cm", "70cm (+2,000원)"]
    },
    {
        name: "요실금 팬티 (여성용)",
        price: 25000,
        image: "https://images.unsplash.com/photo-1621685844445-6679582236dc?w=500&auto=format&fit=crop&q=60",
        description: "세탁하여 재사용이 가능한 친환경 면 소재의 요실금 팬티입니다.",
        tag: "daily",
        options: ["90", "95", "100", "105"]
    },

    // --- 3. Fashion & Comfort (패션/편의) ---
    {
        name: "발볼 넓은 효도화",
        price: 69000,
        image: "https://images.unsplash.com/photo-1512990414788-d97cb4a25db3?w=500&auto=format&fit=crop&q=60",
        description: "발볼이 넓고 쿠션감이 좋아 오래 걸어도 편안한 신발입니다.",
        tag: "fashion",
        options: ["230", "235", "240", "245", "250", "255", "260"]
    },
    {
        name: "미끄럼 방지 양말 (3켤레)",
        price: 12000,
        image: "https://images.unsplash.com/photo-1582966772652-13a88636ba79?w=500&auto=format&fit=crop&q=60",
        description: "바닥에 실리콘 처리가 되어 있어 실내 낙상 사고를 예방합니다.",
        tag: "fashion",
        options: ["남성용", "여성용"]
    },
    {
        name: "기모 발열 조끼",
        price: 35000,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60",
        description: "체온을 따뜻하게 유지해주는 부드러운 기모 안감의 조끼입니다.",
        tag: "fashion",
        options: ["95", "100", "105", "110"]
    },
    {
        name: "편안한 찍찍이 상하의",
        price: 59000,
        image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=500&auto=format&fit=crop&q=60",
        description: "단추 대신 벨크로(찍찍이)를 사용하여 입고 벗기가 매우 편리합니다.",
        tag: "fashion",
        options: ["M", "L", "XL"]
    },
    {
        name: "의료용 압박 스타킹",
        price: 22000,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60",
        description: "다리의 혈액 순환을 돕고 붓기를 완화해주는 의료용 스타킹입니다.",
        tag: "fashion",
        options: ["종아리형", "허벅지형", "팬티형 (+5,000원)"]
    },
    {
        name: "초경량 패딩 부츠",
        price: 45000,
        image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=500&auto=format&fit=crop&q=60",
        description: "겨울철 빙판길에서도 안전한 미끄럼 방지창이 적용된 방한 부츠입니다.",
        tag: "fashion",
        options: ["230", "240", "250", "260", "270"]
    },
    {
        name: "스카프형 턱받이",
        price: 15000,
        image: "https://images.unsplash.com/photo-1584061528657-3f820c43914a?w=500&auto=format&fit=crop&q=60",
        description: "식사나 외출 시 멋스럽게 착용하면서 의류 오염을 방지하는 스카프입니다.",
        tag: "fashion",
        options: ["플라워 패턴", "체크 패턴", "솔리드"]
    },
    {
        name: "무압박 돌돌이 양말",
        price: 8000,
        image: "https://images.unsplash.com/photo-1582966772652-13a88636ba79?w=500&auto=format&fit=crop&q=60",
        description: "발목 조임이 없어 혈액순환에 좋은 넉넉한 핏의 무압박 양말입니다.",
        tag: "fashion",
        options: ["그레이", "베이지", "차콜"]
    },
    {
        name: "앞치마형 식사 보조복",
        price: 18000,
        image: "https://images.unsplash.com/photo-1583947215259-38e312f3d285?w=500&auto=format&fit=crop&q=60",
        description: "방수 소재로 제작되어 음식물이 흘러도 옷이 젖지 않는 식사 보조 앞치마입니다.",
        tag: "fashion",
        options: ["블루", "핑크"]
    },

    // --- 4. Health & Wellness (건강/힐링) ---
    {
        name: "목/어깨 온열 마사지기",
        price: 49000,
        image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=500&auto=format&fit=crop&q=60",
        description: "하루의 피로를 풀어주는 온열 기능이 포함된 무선 마사지기입니다.",
        tag: "health",
        options: ["기본형", "프리미엄 (+10,000원)"]
    },
    {
        name: "고단백 영양음료 (24팩)",
        price: 38000,
        image: "https://images.unsplash.com/photo-1563583272905-24b5df5b5971?w=500&auto=format&fit=crop&q=60",
        description: "식사가 부담스러우실 때 간편하게 챙기는 균형 잡힌 영양식입니다.",
        tag: "health",
        options: ["곡물맛", "바나나맛", "커피맛"]
    },
    {
        name: "황토 온열 찜질팩",
        price: 25000,
        image: "https://images.unsplash.com/photo-1618923058988-8b9a7b9354f7?w=500&auto=format&fit=crop&q=60",
        description: "전자레인지에 데워 사용하는 천연 황토 성분의 찜질팩입니다.",
        tag: "health",
        options: ["어깨용", "허리용", "복부용"]
    },
    {
        name: "가정용 혈압계 (음성안내)",
        price: 85000,
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format&fit=crop&q=60",
        description: "큰 화면과 음성 안내 기능으로 어르신들도 쉽게 측정할 수 있습니다.",
        tag: "health",
        options: ["기본형", "블루투스 연동형 (+15,000원)"]
    },
    {
        name: "지압 마사지 볼 세트",
        price: 9900,
        image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&auto=format&fit=crop&q=60",
        description: "손, 발, 어깨 등 뭉친 근육을 시원하게 풀어주는 지압 볼입니다.",
        tag: "health",
        options: ["소프트", "하드"]
    },
    {
        name: "적외선 조사기",
        price: 65000,
        image: "https://images.unsplash.com/photo-1583345479237-7f999903b22e?w=500&auto=format&fit=crop&q=60",
        description: "근육통 완화와 혈액 순환에 도움을 주는 가정용 적외선 찜질기입니다.",
        tag: "health",
        options: ["탁상형", "스탠드형 (+20,000원)"]
    },
    {
        name: "손가락 악력기 (재활용)",
        price: 7500,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format&fit=crop&q=60",
        description: "손 악력 강화와 재활 운동을 위한 단계별 실리콘 악력기입니다.",
        tag: "health",
        options: ["약 (Yellow)", "중 (Green)", "강 (Blue)"]
    },
    {
        name: "간편 혈당 측정기 세트",
        price: 42000,
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
        description: "소량의 혈액으로 빠르고 정확하게 혈당을 관리할 수 있는 측정기입니다.",
        tag: "health",
        options: ["시험지 50매", "시험지 100매 (+15,000원)"]
    },
    {
        name: "발 마사지기 (온열)",
        price: 129000,
        image: "https://images.unsplash.com/photo-1593309605342-9076fc759607?w=500&auto=format&fit=crop&q=60",
        description: "하루 종일 지친 발의 피로를 풀어주는 프리미엄 온열 발 마사지기입니다.",
        tag: "health",
        options: ["골드", "실버"]
    },
    {
        name: "관절 영양제 (MSM)",
        price: 55000,
        image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=500&auto=format&fit=crop&q=60",
        description: "관절과 연골 건강에 도움을 줄 수 있는 MSM 100% 영양제입니다.",
        tag: "health",
        options: ["1개월분", "3개월분 (+100,000원)"]
    }
];

const categories = [
    {
        id: "mobility",
        name: "이동/안전",
        description: "편안한 이동과 안전을 위한 프리미엄 솔루션",
        icon: "accessible_forward",
        colorFrom: "#3b82f6",
        colorTo: "#2563eb"
    },
    {
        id: "daily",
        name: "생활/돌봄",
        description: "품격 있는 일상을 위한 세심한 배려",
        icon: "self_care",
        colorFrom: "#10b981",
        colorTo: "#059669"
    },
    {
        id: "fashion",
        name: "패션/편의",
        description: "스타일과 편리함을 동시에 갖춘 시니어 패션",
        icon: "styler",
        colorFrom: "#f59e0b",
        colorTo: "#d97706"
    },
    {
        id: "health",
        name: "건강/힐링",
        description: "활력 넘치는 건강한 삶을 위한 힐링 케어",
        icon: "spa",
        colorFrom: "#8b5cf6",
        colorTo: "#7c3aed"
    }
];

export const seedProducts = async () => {
    try {
        console.log("Starting seed process...");

        // 1. Seed Categories
        const categoriesRef = collection(firestore, "categories");
        const categorySnapshot = await getDocs(categoriesRef);

        if (!categorySnapshot.empty) {
            console.log(`Clearing ${categorySnapshot.size} existing categories...`);
            const deleteCategoryBatch = writeBatch(firestore);
            categorySnapshot.docs.forEach((doc) => {
                deleteCategoryBatch.delete(doc.ref);
            });
            await deleteCategoryBatch.commit();
        }

        console.log(`Seeding ${categories.length} new categories...`);
        const categoryBatch = writeBatch(firestore);
        for (const category of categories) {
            const docRef = doc(categoriesRef, category.id); // Use ID as doc ID
            categoryBatch.set(docRef, category);
        }
        await categoryBatch.commit();
        console.log("Categories seeded successfully");


        // 2. Seed Products
        const productsRef = collection(firestore, "products");
        const snapshot = await getDocs(productsRef);

        if (!snapshot.empty) {
            console.log(`Clearing ${snapshot.size} existing products...`);
            const deleteBatch = writeBatch(firestore);
            snapshot.docs.forEach((doc) => {
                deleteBatch.delete(doc.ref);
            });
            await deleteBatch.commit();
            console.log("Existing products cleared.");
        }

        console.log(`Seeding ${products.length} new products...`);
        const batch = writeBatch(firestore);
        for (const product of products) {
            const docRef = doc(productsRef);
            batch.set(docRef, product);
        }

        await batch.commit();
        console.log("New products seeded successfully");
        return `성공! 카테고리 ${categories.length}개와 상품 ${products.length}개가 추가되었습니다.`;
    } catch (error: unknown) {
        console.error("Error seeding products:", error);
        return `에러 발생: ${error instanceof Error ? error.message : String(error)}`;
    }
};
