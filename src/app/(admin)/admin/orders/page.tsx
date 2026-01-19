'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/firebase/firestore';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const orderList = (await getOrders()) as Order[];
    setOrders(orderList);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    fetchOrders(); // Refresh the list
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customer}</td>
              <td className="py-2 px-4 border-b">${order.total}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;
