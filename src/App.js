import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import ChatRoom from './components/ChatRoom';

export default function App() {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwtToken'));
    const [mode, setMode] = useState('login');
    const [selectedUser, setSelectedUser] = useState(null);
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        setSelectedUser(null);
        setAuthenticated(false);
    };

    if (!authenticated) {
        return (
            <div>
                <button onClick={() => setMode('login')} disabled={mode === 'login'}>Login</button>
                <button onClick={() => setMode('register')} disabled={mode === 'register'}>Register</button>
                {mode === 'login'
                    ? <Login onLogin={() => setAuthenticated(true)} />
                    : <Register onRegister={() => setAuthenticated(true)} />}
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <UserList onSelectUser={setSelectedUser} currentUser={username} />
            <ChatRoom
                currentUser={username}
                targetUser={selectedUser}
                onLogout={handleLogout}
            />
        </div>
    );
}