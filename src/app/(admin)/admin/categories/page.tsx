'use client';

import { useState, useEffect } from 'react';
import { getCategories, setCategory, deleteCategory } from '@/lib/firebase/firestore';
import { Plus, Edit2, Trash2, RotateCcw, Save, X } from 'lucide-react';

interface CategoryData {
    id: string; // The slug (e.g., 'mobility')
    name: string;
    description: string;
    icon: string;
    colorFrom: string;
    colorTo: string;
    order?: number;
}

const DEFAULT_CATEGORIES = [
    { id: 'mobility', name: '이동/안전', description: '품격 있는 외출을 위한 프리미엄 이동 솔루션', icon: 'assistive_walker', colorFrom: '#1e3a8a', colorTo: '#1e40af' },
    { id: 'daily', name: '생활/돌봄', description: '편안한 일상을 완성하는 고품격 생활 용품', icon: 'home', colorFrom: '#854d0e', colorTo: '#a16207' },
    { id: 'fashion', name: '패션/편의', description: '세련된 감각이 돋보이는 시니어 룩', icon: 'checkroom', colorFrom: '#701a75', colorTo: '#86198f' },
    { id: 'health', name: '건강/힐링', description: '활력 있는 삶을 위한 웰니스 케어', icon: 'spa', colorFrom: '#064e3b', colorTo: '#047857' },
    { id: 'favorites', name: '찜한 상품', description: '나만을 위한 큐레이션, 위시리스트', icon: 'favorite', colorFrom: '#9f1239', colorTo: '#be123c' },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<CategoryData>({
        id: '',
        name: '',
        description: '',
        icon: 'change_history',
        colorFrom: '#000000',
        colorTo: '#000000'
    });

    const fetchCategories = async () => {
        setLoading(true);
        const data = await getCategories();
        // Sort by order or just default
        setCategories(data as CategoryData[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInitialize = async () => {
        if (!confirm('기존 카테고리가 덮어쓰여질 수 있습니다. 계속하시겠습니까?')) return;
        setLoading(true);
        for (const cat of DEFAULT_CATEGORIES) {
            await setCategory({
                id: cat.id,
                name: cat.name,
                description: cat.description,
                icon: cat.icon,
                colorFrom: cat.colorFrom,
                colorTo: cat.colorTo,
                order: 0
            });
        }
        await fetchCategories();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await deleteCategory(id);
        fetchCategories();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await setCategory(currentCategory);
        setIsEditing(false);
        fetchCategories();
    };

    const openEdit = (cat?: CategoryData) => {
        if (cat) {
            setCurrentCategory(cat);
        } else {
            setCurrentCategory({
                id: '',
                name: '',
                description: '',
                icon: 'star',
                colorFrom: '#1e3a8a',
                colorTo: '#1e40af'
            });
        }
        setIsEditing(true);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">카테고리 관리</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleInitialize}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <RotateCcw size={18} />
                        초기화
                    </button>
                    <button
                        onClick={() => openEdit()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={18} />
                        새 카테고리
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all"
                        >
                            {/* Card Preview Header */}
                            <div
                                className={`h-32 p-6 bg-gradient-to-br flex items-center justify-between text-white relative overflow-hidden`}
                                style={{
                                    backgroundImage: `linear-gradient(to bottom right, ${cat.colorFrom}, ${cat.colorTo})`
                                }}
                            >
                                <div>
                                    <div className="text-3xl font-bold font-serif mb-1">{cat.name}</div>
                                    <div className="text-xs opacity-80 uppercase tracking-widest">{cat.id}</div>
                                </div>
                                <span className="material-symbols-outlined text-5xl opacity-40 absolute -right-2 -bottom-4 rotate-12">
                                    {cat.icon}
                                </span>
                            </div>

                            <div className="p-4">
                                <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">
                                    {cat.description}
                                </p>
                                <div className="flex justify-between items-center border-t pt-4">
                                    <div className="flex gap-2 text-xs text-gray-400 font-mono">
                                        <div className="size-4 rounded-full" style={{ background: cat.colorFrom }}></div>
                                        <div className="size-4 rounded-full" style={{ background: cat.colorTo }}></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(cat)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {currentCategory.id ? '카테고리 수정' : '새 카테고리 추가'}
                            </h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 ID (영문)</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCategory.id}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, id: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="mobility, daily..."
                                    disabled={!!currentCategory.id && categories.some(c => c.id === currentCategory.id)}
                                // Disable ID edit if it exists (simplification, can act as create new if changed)
                                // Actually let's allow changing ID but it creates a new doc. 
                                // Better to keep simple: ID is key.
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 이름</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCategory.name}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="이동/안전"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">설명 (카드 부제)</label>
                                <textarea
                                    required
                                    value={currentCategory.description}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                                    placeholder="카테고리의 매력적인 설명..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">시작 색상 (Gradient From)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={currentCategory.colorFrom}
                                            onChange={(e) => setCurrentCategory({ ...currentCategory, colorFrom: e.target.value })}
                                            className="h-10 w-10 p-0 border-0 rounded overflow-hidden cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={currentCategory.colorFrom}
                                            onChange={(e) => setCurrentCategory({ ...currentCategory, colorFrom: e.target.value })}
                                            className="flex-1 px-3 py-2 border rounded-lg text-sm uppercase"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">끝 색상 (Gradient To)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={currentCategory.colorTo}
                                            onChange={(e) => setCurrentCategory({ ...currentCategory, colorTo: e.target.value })}
                                            className="h-10 w-10 p-0 border-0 rounded overflow-hidden cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={currentCategory.colorTo}
                                            onChange={(e) => setCurrentCategory({ ...currentCategory, colorTo: e.target.value })}
                                            className="flex-1 px-3 py-2 border rounded-lg text-sm uppercase"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    아이콘 (Material Symbols 이름)
                                    <a href="https://fonts.google.com/icons" target="_blank" className="text-blue-500 text-xs ml-2 hover:underline">아이콘 찾기</a>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={currentCategory.icon}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, icon: e.target.value })}
                                        className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="home, star, favorite..."
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        <span className="material-symbols-outlined text-2xl">{currentCategory.icon}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    저장하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
