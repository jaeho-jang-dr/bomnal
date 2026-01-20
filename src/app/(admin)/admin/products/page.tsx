'use client';

import React, { useState, useEffect } from 'react';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '@/lib/firebase/firestore';
import Image from 'next/image';
import SmartRegisterModal from '@/components/admin/SmartRegisterModal';
import { LayoutGrid, List, Plus, Search, Edit2, Trash2, Save, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '', tag: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSmartModalOpen, setIsSmartModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid'); // Default to Grid for visual impact
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    const productList = (await getProducts()) as Product[];
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProduct) return;
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };


  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    await addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: newProduct.image,
      tag: newProduct.tag,
    });
    setNewProduct({ name: '', price: '', description: '', image: '', tag: '' });
    fetchProducts();
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('이 상품을 삭제하시겠습니까?')) {
      await deleteProduct(productId);
      fetchProducts();
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: typeof editingProduct.price === 'string' ? parseFloat(editingProduct.price) : editingProduct.price,
      description: editingProduct.description,
      image: editingProduct.image,
      tag: editingProduct.tag,
    });
    setEditingProduct(null);
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">상품 관리</h1>
          <p className="text-gray-500 mt-1">총 {products.length}개의 상품이 등록되어 있습니다.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsSmartModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
            AI 스마트 등록
          </button>
        </div>
      </div>

      <SmartRegisterModal
        isOpen={isSmartModalOpen}
        onClose={() => setIsSmartModalOpen(false)}
        onRegister={async (data) => {
          await addProduct(data);
          fetchProducts();
        }}
      />

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="상품 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Add Product Form (Collapsed state could be better, but keeping it visible for now) */}
      <form onSubmit={handleAddProduct} className="mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
            <Plus size={18} />
          </div>
          새 상품 직접 등록
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="상품명"
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>
          <div className="md:col-span-1">
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="가격"
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="설명"
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="bg-blue-600 text-white w-full h-full rounded-xl font-bold hover:bg-blue-700 transition-colors">
              추가
            </button>
          </div>
          {/* Secondary Row */}
          <div className="md:col-span-3">
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="이미지 URL (https://...)"
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="md:col-span-3">
            <input
              type="text"
              name="tag"
              value={newProduct.tag}
              onChange={handleInputChange}
              placeholder="태그 (예: BEST, NEW)"
              className="p-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </form>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
              {editingProduct?.id === product.id ? (
                <div className="p-4 space-y-3">
                  {/* Edit Mode in Grid */}
                  <input type="text" name="image" value={editingProduct.image} onChange={handleEditInputChange} className="w-full text-xs p-1 border rounded" placeholder="Image URL" />
                  <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden relative">
                    {editingProduct.image && <Image src={editingProduct.image} alt="Preview" fill className="object-cover opacity-50" />}
                  </div>
                  <input type="text" name="name" value={editingProduct.name} onChange={handleEditInputChange} className="w-full font-bold p-1 border rounded" />
                  <input type="number" name="price" value={editingProduct.price} onChange={handleEditInputChange} className="w-full p-1 border rounded" />
                  <textarea name="description" value={editingProduct.description} onChange={handleEditInputChange} className="w-full p-1 border rounded text-xs" rows={2} />
                  <div className="flex gap-2 pt-2">
                    <button onClick={handleUpdateProduct} className="flex-1 bg-green-500 text-white py-1.5 rounded-lg text-sm font-bold">저장</button>
                    <button onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-200 text-gray-600 py-1.5 rounded-lg text-sm font-bold">취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300">No Image</div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditProduct(product)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-600 shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full font-medium">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-900">₩{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">상품 정보</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">가격</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">태그</th>
                <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    {editingProduct?.id === product.id ? (
                      <div className="space-y-2">
                        <input className="block w-full border rounded p-1" name="name" value={editingProduct.name} onChange={handleEditInputChange} />
                        <input className="block w-full border rounded p-1 text-xs" name="image" value={editingProduct.image} onChange={handleEditInputChange} placeholder="Image URL" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                          {product.image && <Image src={product.image} alt={product.name} fill className="object-cover" />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="number"
                        name="price"
                        value={editingProduct.price}
                        onChange={handleEditInputChange}
                        className="p-1 border rounded w-full"
                      />
                    ) : (
                      <span className="font-medium">₩{product.price.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="text"
                        name="tag"
                        value={editingProduct.tag || ''}
                        onChange={handleEditInputChange}
                        className="p-1 border rounded w-full"
                      />
                    ) : (
                      product.tag && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{product.tag}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {editingProduct?.id === product.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleUpdateProduct}
                          className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-50"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-50"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
