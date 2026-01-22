'use client';

import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/config';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, Building2, Globe, ShoppingBag, Fingerprint, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

// --- Types ---
import { SiteSettings, DEFAULT_SETTINGS } from '@/types/settings';

// --- Components ---

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'business' | 'shop' | 'features'>('general');
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(firestore, 'settings', 'global');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as SiteSettings;
        // Merge with defaults to ensure all fields exist even if DB is partial
        setSettings({
          general: { ...DEFAULT_SETTINGS.general, ...data.general },
          business: { ...DEFAULT_SETTINGS.business, ...data.business },
          shop: { ...DEFAULT_SETTINGS.shop, ...data.shop },
          features: { ...DEFAULT_SETTINGS.features, ...data.features },
        });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      setMessage({ type: 'error', text: '설정을 불러오는데 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      await setDoc(doc(firestore, 'settings', 'global'), settings);
      setMessage({ type: 'success', text: '설정이 성공적으로 저장되었습니다.' });

      // Auto-hide message
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage({ type: 'error', text: '설정 저장 중 오류가 발생했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (section: keyof SiteSettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const tabs = [
    { id: 'general', label: '기본 설정', icon: Globe },
    { id: 'business', label: '사업자 정보', icon: Building2 },
    { id: 'shop', label: '쇼핑/운영', icon: ShoppingBag },
    { id: 'features', label: '기능/연동', icon: Fingerprint },
  ];

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">설정을 불러오는 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">사이트 관리</h1>
          <p className="text-gray-500 mt-1">쇼핑몰의 주요 기능과 정보를 관리합니다.</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? '저장 중...' : (
            <>
              <Save size={18} />
              변경사항 저장
            </>
          )}
        </Button>
      </div>

      {/* Message Toast (Inline for now) */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Form Area */}
        <main className="flex-1 bg-white rounded-xl border p-6 shadow-sm min-h-[500px]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">기본 정보 설정</h2>
              <div className="space-y-4">
                <FormGroup label="쇼핑몰 이름">
                  <Input
                    value={settings.general.siteName}
                    onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="사이트 설명 (SEO)">
                  <Input
                    value={settings.general.description}
                    onChange={(e) => handleChange('general', 'description', e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="키워드 (쉼표로 구분)">
                  <Input
                    value={settings.general.keywords}
                    onChange={(e) => handleChange('general', 'keywords', e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
          )}

          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">사업자 정보</h2>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded mb-4">
                * 전자상거래법에 따라 쇼핑몰 하단(Footer)에 노출되는 필수 정보입니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="상호명 (법인명)">
                  <Input
                    value={settings.business.companyName}
                    onChange={(e) => handleChange('business', 'companyName', e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="대표자 성명">
                  <Input
                    value={settings.business.representativeName}
                    onChange={(e) => handleChange('business', 'representativeName', e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="사업자등록번호">
                  <Input
                    value={settings.business.businessRegistrationNumber}
                    onChange={(e) => handleChange('business', 'businessRegistrationNumber', e.target.value)}
                    placeholder="000-00-00000"
                  />
                </FormGroup>
                <FormGroup label="통신판매업신고번호">
                  <Input
                    value={settings.business.mailOrderSalesRegistrationNumber}
                    onChange={(e) => handleChange('business', 'mailOrderSalesRegistrationNumber', e.target.value)}
                    placeholder="제 202X-서울강남-0000호"
                  />
                </FormGroup>
              </div>
              <FormGroup label="사업장 주소">
                <Input
                  value={settings.business.address}
                  onChange={(e) => handleChange('business', 'address', e.target.value)}
                />
              </FormGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="고객센터 전화번호">
                  <Input
                    value={settings.business.csPhoneNumber}
                    onChange={(e) => handleChange('business', 'csPhoneNumber', e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="고객센터 이메일">
                  <Input
                    value={settings.business.csEmail}
                    onChange={(e) => handleChange('business', 'csEmail', e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">쇼핑 및 배송 설정</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup label="기본 배송비 (원)">
                  <Input
                    type="number"
                    value={settings.shop.shippingFee}
                    onChange={(e) => handleChange('shop', 'shippingFee', Number(e.target.value))}
                  />
                </FormGroup>
                <FormGroup label="무료배송 기준 금액 (원)">
                  <Input
                    type="number"
                    value={settings.shop.freeShippingThreshold}
                    onChange={(e) => handleChange('shop', 'freeShippingThreshold', Number(e.target.value))}
                  />
                </FormGroup>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4 text-gray-900">적립금 정책</h3>
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="checkbox"
                    id="enablePoints"
                    checked={settings.shop.enablePointSystem}
                    onChange={(e) => handleChange('shop', 'enablePointSystem', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="enablePoints" className="text-gray-700">적립금 제도 사용</label>
                </div>
                {settings.shop.enablePointSystem && (
                  <FormGroup label="구매 금액 적립률 (%)">
                    <Input
                      type="number"
                      value={settings.shop.pointAccumulationRate}
                      onChange={(e) => handleChange('shop', 'pointAccumulationRate', Number(e.target.value))}
                      className="max-w-[150px]"
                    />
                  </FormGroup>
                )}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">기능 및 외부 연동</h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">소셜 로그인 설정</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    사용자가 네이버, 카카오 아이디로 간편하게 가입/로그인 할 수 있습니다.
                  </p>

                  <div className="space-y-3">
                    <Toggle
                      label="네이버 로그인 사용"
                      checked={settings.features.enableNaverLogin}
                      onChange={(val) => handleChange('features', 'enableNaverLogin', val)}
                    />
                    <Toggle
                      label="카카오 로그인 사용"
                      checked={settings.features.enableKakaoLogin}
                      onChange={(val) => handleChange('features', 'enableKakaoLogin', val)}
                    />
                    <Toggle
                      label="구글 로그인 사용"
                      checked={settings.features.enableGoogleLogin}
                      onChange={(val) => handleChange('features', 'enableGoogleLogin', val)}
                    />
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h3 className="font-medium text-orange-900 mb-2 flex items-center gap-2">
                    <Lock size={16} />
                    시스템 점검 모드
                  </h3>
                  <p className="text-sm text-orange-700 mb-4">
                    활성화하면 관리자를 제외한 일반 사용자의 접속이 차단되고 점검 페이지가 표시됩니다.
                  </p>
                  <Toggle
                    label="점검 모드 활성화"
                    checked={settings.features.maintenanceMode}
                    onChange={(val) => handleChange('features', 'maintenanceMode', val)}
                    dangerous
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// --- Helper Components ---

const FormGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const Toggle = ({ label, checked, onChange, dangerous = false }: { label: string, checked: boolean, onChange: (val: boolean) => void, dangerous?: boolean }) => (
  <div className="flex items-center justify-between py-2">
    <span className={`text-sm ${dangerous ? 'font-medium text-red-700' : 'text-gray-700'}`}>{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${checked ? (dangerous ? 'bg-red-600' : 'bg-blue-600') : 'bg-gray-200'
        }`}
    >
      <span
        className={`${checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  </div>
);
