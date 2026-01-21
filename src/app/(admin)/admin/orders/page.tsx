'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/firebase/firestore';
import KanbanBoard from '@/components/admin/orders/KanbanBoard';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const fetchOrders = useCallback(async () => {
    const orderList = (await getOrders()) as Order[];
    setOrders(orderList);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-6 h-screen flex flex-col bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
          <p className="text-gray-500 text-sm">드래그하여 배송 상태를 변경하세요.</p>
        </div>

        <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'kanban' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            보드 보기
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            리스트 보기
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <KanbanBoard initialOrders={orders} onOrderUpdate={fetchOrders} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">주문 ID</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">고객명</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">결제금액</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 font-mono">#{order.id.slice(0, 8)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">₩{order.total?.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-orange-100 text-orange-800'
                      }`}>
                      {order.status}
                    </span>
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

export default AdminOrdersPage;
