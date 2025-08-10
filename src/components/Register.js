import React, { useState } from 'react';
import API from '../api';

export default function Register({ onRegister }) {
    const [form, setForm] = useState({ username: '', password: '', firstName: '', lastName: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/register', form);
            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('username', form.username);
            onRegister();
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="firstName" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
}
