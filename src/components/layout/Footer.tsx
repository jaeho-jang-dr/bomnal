'use client';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/config';
import { SiteSettings, DEFAULT_SETTINGS } from '@/types/settings';
import Link from 'next/link';

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(firestore, 'settings', 'global');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSettings(docSnap.data() as SiteSettings);
                } else {
                    setSettings(DEFAULT_SETTINGS);
                }
            } catch (error) {
                console.error('Failed to load footer settings:', error);
                setSettings(DEFAULT_SETTINGS);
            }
        };

        fetchSettings();
    }, []);

    const business = settings?.business || DEFAULT_SETTINGS.business;

    return (
        <footer className="bg-gray-100 text-gray-600 border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Links */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">{settings?.general?.siteName || '봄날'}</h2>
                        <div className="flex flex-col space-y-2 text-sm">
                            <Link href="/about" className="hover:text-gray-900">회사소개</Link>
                            <Link href="/terms" className="hover:text-gray-900">이용약관</Link>
                            <Link href="/privacy" className="font-bold hover:text-gray-900">개인정보처리방침</Link>
                            <Link href="/admin/settings" className="text-gray-400 hover:text-gray-600 text-xs mt-2">관리자 설정</Link>
                        </div>
                    </div>

                    {/* Business Info (Legally Required in KR) */}
                    <div className="col-span-1 md:col-span-2 text-sm leading-relaxed">
                        <h3 className="font-bold text-gray-800 mb-3">사업자 정보</h3>
                        <p>상호명: {business.companyName || '정보 없음'}</p>
                        <p>대표자: {business.representativeName || '정보 없음'}</p>
                        <p>사업자등록번호: {business.businessRegistrationNumber || '정보 없음'} {business.businessRegistrationNumber && <a href="#" className="underline text-xs ml-2">[사업자정보확인]</a>}</p>
                        <p>통신판매업신고: {business.mailOrderSalesRegistrationNumber || '정보 없음'}</p>
                        <p>주소: {business.address || '정보 없음'}</p>
                    </div>

                    {/* CS Center */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-bold text-gray-800 mb-3">고객센터</h3>
                        <p className="text-2xl font-bold text-blue-600 mb-1">{business.csPhoneNumber || '00-000-0000'}</p>
                        <p className="text-sm mb-2">이메일: {business.csEmail || 'cs@example.com'}</p>
                        <p className="text-xs text-gray-500">
                            평일 09:00 ~ 18:00<br />
                            점심시간 12:00 ~ 13:00<br />
                            주말/공휴일 휴무
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-500">
                    Copyright © {new Date().getFullYear()} {business.companyName || 'Company'}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
