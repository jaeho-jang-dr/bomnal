'use client';

import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole } from '@/lib/firebase/auth';

interface User {
  uid: string;
  email: string;
  role: string;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const userList = (await getAllUsers()) as User[];
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (uid: string, newRole: string) => {
    await updateUserRole(uid, newRole);
    fetchUsers(); // Refresh the list
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
