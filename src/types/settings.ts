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
    };
    features: {
        enableNaverLogin: boolean;
        enableKakaoLogin: boolean;
        enableGoogleLogin: boolean;
        maintenanceMode: boolean;
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
    },
    features: {
        enableNaverLogin: true,
        enableKakaoLogin: true,
        enableGoogleLogin: false,
        maintenanceMode: false,
    },
};
