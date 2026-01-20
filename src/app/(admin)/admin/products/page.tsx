'use client';

import React, { useState, useEffect } from 'react';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '@/lib/firebase/firestore';

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

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">상품 관리</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">새 상품 추가</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="상품명"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="가격"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="상품 설명"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            placeholder="이미지 URL"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="tag"
            value={newProduct.tag}
            onChange={handleInputChange}
            placeholder="태그 (예: 베스트셀러)"
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            상품 추가
          </button>
        </div>
      </form>

      {/* Products Table */}
      <h2 className="text-xl font-semibold mb-2">기존 상품 목록</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">이미지</th>
              <th className="py-2 px-4 border-b text-left">이름</th>
              <th className="py-2 px-4 border-b text-left">가격</th>
              <th className="py-2 px-4 border-b text-left">태그</th>
              <th className="py-2 px-4 border-b text-left">작업</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      name="image"
                      value={editingProduct.image}
                      onChange={handleEditInputChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editingProduct.name}
                      onChange={handleEditInputChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.description}</div>
                    </div>
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editingProduct.price}
                      onChange={handleEditInputChange}
                      className="p-1 border rounded w-24"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      name="tag"
                      value={editingProduct.tag || ''}
                      onChange={handleEditInputChange}
                      className="p-1 border rounded w-24"
                    />
                  ) : (
                    product.tag && <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">{product.tag}</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct?.id === product.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateProduct}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 text-sm hover:bg-yellow-600"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
