export interface SiteSettings {
    general: {
        siteName: string;
        description: string;
        keywords: string;
        logoUrl?: string;
    };
    business: {
        companyName: string;
        representativeName: string;
        businessRegistrationNumber: string;
        mailOrderSalesRegistrationNumber: string;
        address: string;
        csPhoneNumber: string;
        csEmail: string;
    };
    shop: {
        shippingFee: number;
        freeShippingThreshold: number;
        enablePointSystem: boolean;
        pointAccumulationRate: number;
        naverStoreUrl?: string;
    };
    features: {
        enableNaverLogin: boolean;
        enableKakaoLogin: boolean;
        enableGoogleLogin: boolean;
        maintenanceMode: boolean;
    };
    banner?: {
        title: string;
        message: string;
        imageUrl?: string;
    };
}

export const DEFAULT_SETTINGS: SiteSettings = {
    general: {
        siteName: '봄날 (Bomnal)',
        description: '시니어를 위한 따뜻한 온라인 쇼핑몰',
        keywords: '시니어, 쇼핑몰, 지팡이, 건강식품, 봄날',
    },
    business: {
        companyName: '',
        representativeName: '',
        businessRegistrationNumber: '',
        mailOrderSalesRegistrationNumber: '',
        address: '',
        csPhoneNumber: '',
        csEmail: '',
    },
    shop: {
        shippingFee: 3000,
        freeShippingThreshold: 50000,
        enablePointSystem: true,
        pointAccumulationRate: 1,
        naverStoreUrl: 'https://smartstore.naver.com/bomnal_demo',
    },
    features: {
        enableNaverLogin: true,
        enableKakaoLogin: true,
        enableGoogleLogin: false,
        maintenanceMode: false,
    },
    banner: {
        title: '오늘도 봄날입니다',
        message: '나이가 드는 것은 낡아가는 것이 아니라 익어가는 것입니다. 오늘 하루도 가장 젊고 아름다운 날 되세요.',
        imageUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=2670&auto=format&fit=crop', // Uplifting flower/sunshine image
    },
};
