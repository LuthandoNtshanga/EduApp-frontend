import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  if (user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setMessage('Registration successful!');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="card login-form">
        <h2 className="login-title">Register</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <div className="input-icon-group">
            <span className="input-icon">👤</span>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="input-icon-group">
            <span className="input-icon">📧</span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-icon-group">
            <span className="input-icon">🔒</span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className="btn btn-primary login-btn" type="submit">
          <span className="btn-icon">📝</span> Register
        </button>
        {message && <p className="form-error" style={{ textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
} 