import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login, please try again');
    }
  };

  return (
    <section className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] bg-gradient-to-br from-brand-900 to-slate-900 p-10 text-white shadow-glow">
        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-brand-200">Welcome back</span>
        <h1 className="mt-8 text-4xl font-semibold">Login to TailorIt</h1>
        <p className="mt-4 max-w-sm text-base leading-7 text-brand-100/85">Continue building your tailor network, manage bookings, and explore services with a modern dashboard experience.</p>
      </div>
      <div className="rounded-[2rem] bg-white p-10 shadow-glow">
        <h2 className="text-3xl font-semibold text-slate-900">Sign in</h2>
        <p className="mt-2 text-sm text-slate-500">Enter your account details to access your workspace.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="name@example.com"
          />
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Enter your password"
          />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button type="submit" className="button-primary w-full">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          New to TailorIt? <Link to="/register" className="font-semibold text-brand-800 hover:text-brand-900">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
