import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import authService from '../lib/auth-service';

/**
 * SNS 로그인 컴포넌트
 * Google, Naver, Kakao 로그인 버튼을 제공합니다.
 */
const SnsLogin: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // 인증 상태 변경 감지
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChange((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // 컴포넌트 언마운트 시 리스너 해제
        return () => unsubscribe();
    }, []);

    // Google 로그인 핸들러
    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await authService.signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Google 로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // Naver 로그인 핸들러
    const handleNaverLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await authService.signInWithNaver();
        } catch (err: any) {
            setError(err.message || 'Naver 로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // Kakao 로그인 핸들러
    const handleKakaoLogin = async () => {
        setError('');
        setLoading(true);

        try {
            await authService.signInWithKakao();
        } catch (err: any) {
            setError(err.message || 'Kakao 로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 로그아웃 핸들러
    const handleLogout = async () => {
        setError('');
        setLoading(true);

        try {
            await authService.signOut();
        } catch (err: any) {
            setError(err.message || '로그아웃에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 로딩 중
    if (loading && !user) {
        return (
            <div className="sns-login-container">
                <div className="loading">로딩 중...</div>
            </div>
        );
    }

    // 로그인 상태
    if (user) {
        const profile = authService.getUserProfile(user);

        return (
            <div className="sns-login-container">
                <div className="user-profile">
                    <div className="profile-header">
                        {profile?.photoURL && (
                            <img
                                src={profile.photoURL}
                                alt={profile.displayName || '프로필'}
                                className="profile-image"
                            />
                        )}
                        <div className="profile-info">
                            <h3>{profile?.displayName || '사용자'}</h3>
                            <p>{profile?.email}</p>
                            <span className="provider-badge">{profile?.providerName}</span>
                        </div>
                    </div>

                    <div className="profile-details">
                        <p><strong>UID:</strong> {profile?.uid}</p>
                        <p><strong>이메일 인증:</strong> {profile?.emailVerified ? '✅ 완료' : '❌ 미완료'}</p>
                        <p><strong>가입일:</strong> {profile?.metadata.creationTime}</p>
                        <p><strong>마지막 로그인:</strong> {profile?.metadata.lastSignInTime}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn btn-logout"
                        disabled={loading}
                    >
                        {loading ? '로그아웃 중...' : '로그아웃'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
            </div>
        );
    }

    // 로그인 전 상태
    return (
        <div className="sns-login-container">
            <div className="login-box">
                <h2>로그인</h2>
                <p className="login-description">SNS 계정으로 간편하게 로그인하세요</p>

                <div className="login-buttons">
                    {/* Google 로그인 버튼 */}
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-google"
                        disabled={loading}
                    >
                        <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {loading ? '로그인 중...' : 'Google로 계속하기'}
                    </button>

                    {/* Naver 로그인 버튼 */}
                    <button
                        onClick={handleNaverLogin}
                        className="btn btn-naver"
                        disabled={loading}
                    >
                        <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#FFFFFF" d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
                        </svg>
                        {loading ? '로그인 중...' : 'Naver로 계속하기'}
                    </button>

                    {/* Kakao 로그인 버튼 */}
                    <button
                        onClick={handleKakaoLogin}
                        className="btn btn-kakao"
                        disabled={loading}
                    >
                        <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#000000" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
                        </svg>
                        {loading ? '로그인 중...' : 'Kakao로 계속하기'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="login-footer">
                    <p>로그인하면 <a href="/terms">이용약관</a> 및 <a href="/privacy">개인정보처리방침</a>에 동의하게 됩니다.</p>
                </div>
            </div>
        </div>
    );
};

export default SnsLogin;
