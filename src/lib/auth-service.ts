// Firebase SNS 로그인 유틸리티
import {
    signInWithPopup,
    GoogleAuthProvider,
    OAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { auth } from './firebase-config';

// Provider 인스턴스 생성
const googleProvider = new GoogleAuthProvider();
const naverProvider = new OAuthProvider('oidc.oidc.naver');
const kakaoProvider = new OAuthProvider('oidc.oidc.kakao');

// Google 로그인 설정
googleProvider.setCustomParameters({
    prompt: 'select_account', // 항상 계정 선택 화면 표시
});

// Naver 로그인 설정
naverProvider.setCustomParameters({
    prompt: 'select_account',
});

// Kakao 로그인 설정
kakaoProvider.setCustomParameters({
    prompt: 'select_account',
});

/**
 * Google 로그인
 */
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        console.log('Google 로그인 성공:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });

        return user;
    } catch (error: any) {
        console.error('Google 로그인 실패:', error);

        // 에러 처리
        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('로그인 창이 닫혔습니다.');
        } else if (error.code === 'auth/cancelled-popup-request') {
            throw new Error('로그인이 취소되었습니다.');
        } else if (error.code === 'auth/popup-blocked') {
            throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
        }

        throw new Error('Google 로그인에 실패했습니다.');
    }
};

/**
 * Naver 로그인
 */
export const signInWithNaver = async () => {
    try {
        const result = await signInWithPopup(auth, naverProvider);
        const user = result.user;

        // OIDC 추가 정보 가져오기
        const credential = OAuthProvider.credentialFromResult(result);
        const idToken = credential?.idToken;

        console.log('Naver 로그인 성공:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: 'oidc.oidc.naver',
        });

        return user;
    } catch (error: any) {
        console.error('Naver 로그인 실패:', error);

        // 에러 처리
        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('로그인 창이 닫혔습니다.');
        } else if (error.code === 'auth/cancelled-popup-request') {
            throw new Error('로그인이 취소되었습니다.');
        } else if (error.code === 'auth/popup-blocked') {
            throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
        }

        throw new Error('Naver 로그인에 실패했습니다.');
    }
};

/**
 * Kakao 로그인
 */
export const signInWithKakao = async () => {
    try {
        const result = await signInWithPopup(auth, kakaoProvider);
        const user = result.user;

        // OIDC 추가 정보 가져오기
        const credential = OAuthProvider.credentialFromResult(result);
        const idToken = credential?.idToken;

        console.log('Kakao 로그인 성공:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: 'oidc.oidc.kakao',
        });

        return user;
    } catch (error: any) {
        console.error('Kakao 로그인 실패:', error);

        // 에러 처리
        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('로그인 창이 닫혔습니다.');
        } else if (error.code === 'auth/cancelled-popup-request') {
            throw new Error('로그인이 취소되었습니다.');
        } else if (error.code === 'auth/popup-blocked') {
            throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
        }

        throw new Error('Kakao 로그인에 실패했습니다.');
    }
};

/**
 * 로그아웃
 */
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        console.log('로그아웃 성공');
    } catch (error) {
        console.error('로그아웃 실패:', error);
        throw new Error('로그아웃에 실패했습니다.');
    }
};

/**
 * 현재 로그인 사용자 가져오기
 */
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

/**
 * 인증 상태 변경 리스너
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * 사용자 프로필 정보 가져오기
 */
export const getUserProfile = (user: User) => {
    if (!user) return null;

    // 제공업체 확인
    const providerId = user.providerData[0]?.providerId || 'unknown';

    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        providerId: providerId,
        providerName: getProviderName(providerId),
        metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
        },
    };
};

/**
 * Provider ID를 사람이 읽을 수 있는 이름으로 변환
 */
const getProviderName = (providerId: string): string => {
    const providerMap: Record<string, string> = {
        'google.com': 'Google',
        'oidc.oidc.naver': 'Naver',
        'oidc.oidc.kakao': 'Kakao',
        'password': 'Email',
    };

    return providerMap[providerId] || providerId;
};

/**
 * 사용자가 특정 제공업체로 로그인했는지 확인
 */
export const isSignedInWith = (user: User | null, providerId: string): boolean => {
    if (!user) return false;
    return user.providerData.some(provider => provider.providerId === providerId);
};

/**
 * 모든 SNS 로그인 함수를 객체로 내보내기
 */
export const authService = {
    signInWithGoogle,
    signInWithNaver,
    signInWithKakao,
    signOut,
    getCurrentUser,
    onAuthStateChange,
    getUserProfile,
    isSignedInWith,
};

export default authService;
