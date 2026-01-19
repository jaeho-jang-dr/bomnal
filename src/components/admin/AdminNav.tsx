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
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-white ${
                pathname === item.href ? 'font-bold' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
