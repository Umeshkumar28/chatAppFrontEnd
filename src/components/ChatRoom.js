import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import API from '../api';

export default function ChatRoom({ currentUser, targetUser, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);   // 👈 Added here
  const stompRef = useRef();

  // 1️⃣ Fetch/create chat room + history when a user is selected
  useEffect(() => {
    if (!targetUser) return;
    setLoading(true);  // 👈 Start loading
    API.get(`/chatroom/${targetUser.username}`)
      .then(res => {
        setRoomId(res.data.chatRoomId);
        setMessages(res.data.history || []);
      })
      .catch(() => alert('Error loading chat history'))
      .finally(() => setLoading(false));  // 👈 Stop loading
  }, [targetUser]);

  // 2️⃣ If we are still loading, don't render the chat UI
  if (loading) {
    return <div style={{ padding: 10 }}>Loading chat...</div>;  // 👈 Loading UI
  }

  // 3️⃣ Subscribe to the room via WebSocket after roomId is set
  useEffect(() => {
    if (!roomId) return;
    const token = localStorage.getItem('jwtToken');
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        client.subscribe(`/topic/messages/${roomId}`, msg => {
          setMessages(prev => [...prev, JSON.parse(msg.body)]);
        });
      },
      reconnectDelay: 5000
    });
    client.activate();
    stompRef.current = client;
    return () => client.deactivate();
  }, [roomId]);

  const sendMessage = () => {
    if (stompRef.current && stompRef.current.connected && input) {
      stompRef.current.send('/app/chat.send', {}, JSON.stringify({
        chatRoomId: roomId,
        from: currentUser,
        to: targetUser.username,
        content: input,
        messageType: 'TEXT'
      }));
      setInput('');
    }
  };

  if (!targetUser) {
    return <div style={{ padding: 10 }}>Select a user to chat.</div>;
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10 }}>
      <h4>Chat with {targetUser.username}</h4>
      <div style={{
        background: '#f8f8f8', flex: 1, overflowY: 'auto',
        border: '1px solid #ddd', marginBottom: 10, padding: 8
      }}>
          {messages.map((m, idx) => (
              <div key={idx}>
                  <b>{m.from}:</b> {m.content}
                  {m.status === 'DELIVERED' && <span> ✓✓</span>}
                  {m.status === 'READ' && <span style={{color:'blue'}}> ✓✓</span>}
              </div>
          ))}
      </div>
      <div>
        <input value={input}
          disabled={!roomId}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type message..."
          style={{ width: 300 }}
        />
        <button onClick={sendMessage} disabled={!input}>Send</button>
      </div>
      <button onClick={onLogout} style={{ marginTop: 8, alignSelf: 'flex-end' }}>Logout</button>
    </div>
  );
}
