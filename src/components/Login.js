import React, { useState } from 'react';
import API from '../api';

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/login', form);
            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('username', form.username);
            onLogin();
        } catch {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
}
