'use client';

import { useEffect, useState } from 'react';
import { searchUsers } from '@/app/actions/user-actions';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    searchUsers('Alice').then(data => setUsers(data));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
