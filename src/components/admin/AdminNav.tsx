'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminNav = () => {
  const pathname = usePathname();
  const navItems = [
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full overflow-x-auto no-scrollbar">
        <ul className="flex p-4 space-x-2 min-w-max lg:justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    block px-6 py-3 rounded-full text-base font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
