
'use client';

import React, { useState } from 'react';
// import Image from 'next/image'; // Can't use next/image for blob URLs easily without config

interface AnalyzedData {
    name: string;
    price: number;
    description: string;
    tag: string;
    image_prompts: string[];
}

interface SmartRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (product: Record<string, unknown>) => void;
}

export default function SmartRegisterModal({ isOpen, onClose, onRegister }: SmartRegisterModalProps) {
    const [activeTab, setActiveTab] = useState<'image' | 'url'>('image');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [urlInput, setUrlInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analyzedData, setAnalyzedData] = useState<AnalyzedData | null>(null);

    // Form states for final edit
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        tag: '',
        images: [] as string[]
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAnalyzedData(null);

        try {
            let payload = {};
            if (activeTab === 'image' && file) {
                // Resize image before sending to avoid payload limits
                const resizedBase64 = await resizeImage(file);
                payload = { type: 'image', data: resizedBase64 };
            } else {
                payload = { type: 'url', data: urlInput };
            }

            await sendAnalysisRequest(payload as { type: string; data: string });

        } catch (error: unknown) {
            console.error("Analysis failed", error);
            alert(`분석 실패: ${error instanceof Error ? error.message : String(error)}`);
            setIsAnalyzing(false);
        }
    };

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1024; // Limit width to 1024px
                    const scaleSize = MAX_WIDTH / img.width;
                    const width = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
                    const height = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8)); // Convert to JPEG with 80% quality
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    };

    const sendAnalysisRequest = async (payload: { type: string; data: string }) => {
        const res = await fetch('/api/admin/analyze-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Server Error: ${res.status}`);
        }

        const data: AnalyzedData = await res.json();
        setAnalyzedData(data);
        setFormData({
            name: data.name,
            price: data.price,
            description: data.description,
            tag: data.tag,
            images: [] // Images generated later
        });
        setIsAnalyzing(false);
    };

    const handleGenerateImages = async () => {
        // START: Simulation of Whisk/Imagen Generation
        // In a real scenario, we would call another API endpoint here with `analyzedData.image_prompts`
        const generatedImages = [
            "https://placehold.co/600x600/png?text=Front+View+(AI)",
            "https://placehold.co/600x600/png?text=Angle+View+(AI)",
            "https://placehold.co/600x600/png?text=Detail+View+(AI)",
            "https://placehold.co/600x600/png?text=Wearing+View+(Doll)"
        ];
        // END Simulation

        setFormData(prev => ({ ...prev, images: generatedImages }));
        // Auto-select the first one as main image
    };

    const handleSubmit = () => {
        onRegister({
            ...formData,
            image: formData.images[0] || "https://placehold.co/600x600/png?text=No+Image" // Use first image as main
        });
        onClose();
    };

    // -- Clipboard & Drag-n-Drop Handlers start --
    const handlePaste = (e: React.ClipboardEvent) => {
        if (activeTab !== 'image') return;
        if (e.clipboardData.files && e.clipboardData.files.length > 0) {
            const pastedFile = e.clipboardData.files[0];
            if (pastedFile.type.startsWith('image/')) {
                setFile(pastedFile);
                setPreviewUrl(URL.createObjectURL(pastedFile));
                e.preventDefault();
            }
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        if (activeTab !== 'image') return;
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith('image/')) {
                setFile(droppedFile);
                setPreviewUrl(URL.createObjectURL(droppedFile));
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        if (activeTab !== 'image') return;
        e.preventDefault();
        e.stopPropagation();
    };

    // Attach global paste listener when modal is open
    React.useEffect(() => {
        const globalPasteHandler = (e: ClipboardEvent) => {
            if (!isOpen || activeTab !== 'image') return;
            if (e.clipboardData && e.clipboardData.files.length > 0) {
                const pastedFile = e.clipboardData.files[0];
                if (pastedFile.type.startsWith('image/')) {
                    setFile(pastedFile);
                    setPreviewUrl(URL.createObjectURL(pastedFile));
                    e.preventDefault();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('paste', globalPasteHandler);
        }

        return () => {
            document.removeEventListener('paste', globalPasteHandler);
        };
    }, [isOpen, activeTab]);
    // -- Handlers end --

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-800">🛍️ 스마트 상품 등록 (AI Analysis)</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div
                    className="p-6"
                    onPaste={handlePaste} // Fallback if global fails or focused inside
                >
                    {!analyzedData ? (
                        // Upload / Input Step
                        <div className="space-y-6">
                            <div className="flex gap-4 border-b">
                                <button
                                    className={`pb-2 px-1 ${activeTab === 'image' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('image')}
                                >
                                    📸 스크린샷 업로드
                                </button>
                                <button
                                    className={`pb-2 px-1 ${activeTab === 'url' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('url')}
                                >
                                    🔗 URL / 텍스트
                                </button>
                            </div>

                            <div
                                className="min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 transition-colors hover:bg-gray-100 hover:border-blue-400"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                {activeTab === 'image' ? (
                                    <>
                                        {previewUrl ? (
                                            <div className="relative w-full h-48 mb-4">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={previewUrl} className="w-full h-full object-contain" alt="Preview" />
                                                <button onClick={() => { setFile(null); setPreviewUrl(null); }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                                                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                                                <span className="text-gray-600 font-medium">클릭하여 스크린샷 업로드</span>
                                                <span className="text-gray-400 text-sm mt-1">또는 Ctrl+V (붙여넣기) / 파일 드래그</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    aria-label="Upload screenshot"
                                                />
                                            </label>
                                        )}
                                    </>
                                ) : (
                                    <textarea
                                        className="w-full h-32 p-3 border rounded resize-none"
                                        placeholder="상품 페이지의 텍스트를 복사해 붙여넣거나 URL을 입력하세요..."
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        aria-label="URL or product text input"
                                    />
                                )}
                            </div>

                            <button
                                disabled={isAnalyzing || (activeTab === 'image' && !file) || (activeTab === 'url' && !urlInput)}
                                onClick={handleAnalyze}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined">refresh</span>
                                        AI 분석 중...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">auto_fix</span>
                                        분석 시작
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        // Review & Edit Step
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-700 border-b pb-2">📦 기본 정보 (AI 추출)</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">상품명</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        aria-label="Product Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">가격</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        aria-label="Price"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">태그</label>
                                    <input
                                        type="text"
                                        value={formData.tag}
                                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        aria-label="Tag"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        aria-label="Description"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-700 border-b pb-2">✨ AI 이미지 생성 (Whisk/Imagen)</h3>

                                {formData.images.length === 0 ? (
                                    <div className="flex flex-col items-center text-center space-y-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <p className="text-sm text-gray-600">
                                            다음 프롬프트를 기반으로 4장의 이미지를 생성합니다:
                                        </p>
                                        <ul className="text-xs text-left text-gray-500 space-y-1 bg-white p-3 rounded w-full">
                                            {analyzedData.image_prompts.map((p, i) => (
                                                <li key={i}>• {p.substring(0, 50)}...</li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={handleGenerateImages}
                                            className="w-full py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">draw</span>
                                            이미지 생성하기
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative group aspect-square">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={img} className="w-full h-full object-cover rounded shadow-sm border" alt={`Generated ${idx}`} />
                                                <span className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[10px] px-1 rounded">
                                                    {idx === 3 ? '착용샷 (인형/모델)' : `Angle ${idx + 1}`}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {formData.images.length > 0 && (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-bold shadow-lg hover:bg-green-700 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">check_circle</span>
                                        등록 완료
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
