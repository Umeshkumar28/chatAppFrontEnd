import React, { useEffect, useState } from 'react';
import API from '../api';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function UserList({ onSelectUser, currentUser }) {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data.filter(u => u.username !== currentUser)));
    // Sub to presence
    const token = localStorage.getItem('jwtToken');
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        client.subscribe('/topic/presence', msg => {
          const { userId, status } = JSON.parse(msg.body);
          setOnlineUsers(prev => {
            const s = new Set(prev);
            status === 'ONLINE' ? s.add(userId) : s.delete(userId);
            return s;
          });
        });
      },
      reconnectDelay: 5000
    });
    client.activate();
    return () => client.deactivate();
  }, [currentUser]);

  return (
    <div style={{ width: 200, borderRight: '1px solid #ccc', padding: 8 }}>
      <h4>Users</h4>
      <ul style={{paddingLeft: 0}}>
        {users.map(u => (
          <li key={u.username}
            onClick={() => onSelectUser(u)}
            style={{padding: 4, cursor: 'pointer'}}>
            {u.username}
            <span style={{fontSize: 14, marginLeft: 8, color: onlineUsers.has(u.username) ? 'green' : 'gray'}}>
              ●
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
