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
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const productList = (await getProducts()) as Product[];
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    await addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
    });
    setNewProduct({ name: '', price: '' });
    fetchProducts();
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: editingProduct.price,
    });
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Product
          </button>
        </div>
      </form>

      {/* Products Table */}
      <h2 className="text-xl font-semibold mb-2">Existing Products</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">
                {editingProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="p-1 border rounded"
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingProduct?.id === product.id ? (
                  <button
                    onClick={handleUpdateProduct}
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-yellow-500 text-white p-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsPage;
