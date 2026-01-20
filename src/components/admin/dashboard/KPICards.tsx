'use client';

import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const stats = [
    {
        title: '총 매출',
        value: '₩12,450,000',
        change: '+12.5%',
        icon: DollarSign,
        color: 'bg-blue-500',
        trend: 'up',
    },
    {
        title: '신규 주문',
        value: '154건',
        change: '+8.2%',
        icon: ShoppingBag,
        color: 'bg-green-500',
        trend: 'up',
    },
    {
        title: '신규 회원',
        value: '45명',
        change: '-2.4%',
        icon: Users,
        color: 'bg-orange-500',
        trend: 'down',
    },
    {
        title: '활성 사용자',
        value: '1,230명',
        change: '+5.1%',
        icon: TrendingUp,
        color: 'bg-purple-500',
        trend: 'up',
    },
];

export default function KPICards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                {stat.value}
                            </h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                            <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span
                            className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {stat.change}
                        </span>
                        <span className="text-sm text-gray-400 ml-2">지난달 대비</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
