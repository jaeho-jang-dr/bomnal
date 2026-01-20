'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { updateOrderStatus } from '@/lib/firebase/firestore';
import { MoreVertical, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    total: number;
    status: string;
    items?: any[];
}

interface KanbanBoardProps {
    initialOrders: Order[];
    onOrderUpdate: () => void;
}

const COLUMNS = [
    { id: 'Pending', title: '접수 대기', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'Processing', title: '상품 준비', icon: PackageIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'Shipped', title: '배송 중', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'Delivered', title: '배송 완료', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'Cancelled', title: '취소됨', icon: XCircle, color: 'text-gray-400', bg: 'bg-gray-50' },
];

// Helper to simulate icons since we can't dynamic import easily in the array above without component wrapping
function PackageIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16.5 9.4 7.5 4.21" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
    )
}

export default function KanbanBoard({ initialOrders, onOrderUpdate }: KanbanBoardProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [winReady, setWinReady] = useState(false);

    useEffect(() => {
        setOrders(initialOrders);
        setWinReady(true);
    }, [initialOrders]);

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Optimistic UI Update
        const newStatus = destination.droppableId;
        const reorderedOrders = Array.from(orders);
        const movedOrderIndex = reorderedOrders.findIndex(o => o.id === draggableId);

        if (movedOrderIndex > -1) {
            const movedOrder = { ...reorderedOrders[movedOrderIndex], status: newStatus };
            reorderedOrders.splice(movedOrderIndex, 1);
            reorderedOrders.splice(destination.index, 0, movedOrder); // Re-insert (conceptually, though kanban is filtered)

            // Actually we just need to update the status text, the mapping handles the column.
            // But for visual stability while dragging in some lists, strict reordering logic is complex.
            // Here we just update the status immediately.
            setOrders(orders.map(o => o.id === draggableId ? { ...o, status: newStatus } : o));
        }

        // Server Update
        const success = await updateOrderStatus(draggableId, newStatus);
        if (!success) {
            alert("상태 업데이트 실패! 다시 시도해주세요.");
            onOrderUpdate(); // Revert
        }
    };

    if (!winReady) return <div>로딩 중...</div>;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-200px)] min-w-[1200px]">
                {COLUMNS.map((col) => {
                    const colOrders = orders.filter(
                        (o) => o.status === col.id ||
                            (col.id === 'Processing' && !['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(o.status)) // Fallback
                    );

                    return (
                        <div key={col.id} className="flex-1 min-w-[300px] flex flex-col">
                            <div className={`flex items-center justify-between p-4 rounded-t-xl border-b-2 ${col.bg} border-${col.color.split('-')[1]}-200`}>
                                <div className="flex items-center gap-2">
                                    <col.icon className={`w-5 h-5 ${col.color}`} />
                                    <h3 className="font-bold text-gray-700">{col.title}</h3>
                                </div>
                                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm border text-gray-500">
                                    {colOrders.length}
                                </span>
                            </div>

                            <Droppable droppableId={col.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`flex-1 p-3 rounded-b-xl bg-gray-50/50 border border-t-0 border-gray-200 transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50ring-2 ring-blue-100' : ''
                                            }`}
                                    >
                                        {colOrders.map((order, index) => (
                                            <Draggable key={order.id} draggableId={order.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`bg-white p-4 mb-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group ${snapshot.isDragging ? 'rotate-2 scale-105 shadow-xl ring-2 ring-primary' : ''
                                                            }`}
                                                        style={provided.draggableProps.style}
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="text-xs font-mono text-gray-400">#{order.id.slice(0, 8)}</span>
                                                            <button className="text-gray-300 hover:text-gray-600">
                                                                <MoreVertical size={16} />
                                                            </button>
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 mb-1">{order.customer || 'Guest Guest'}</h4>
                                                        <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                                                            {order.items ? `${order.items.length} items` : `Total: ₩${order.total?.toLocaleString()}`}
                                                        </p>

                                                        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                                            <span className="font-bold text-gray-900">₩{order.total?.toLocaleString()}</span>
                                                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                                                {new Date().toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
}
