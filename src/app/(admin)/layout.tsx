'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
