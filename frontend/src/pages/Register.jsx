import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] bg-brand-50 p-10 shadow-glow">
        <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm uppercase tracking-[0.3em] text-brand-600">Join TailorIt</span>
        <h1 className="mt-8 text-4xl font-semibold text-slate-900">Create your account</h1>
        <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">Start connecting with tailors, managing inquiries, and discovering local craftsmanship.</p>
      </div>
      <div className="rounded-[2rem] bg-white p-10 shadow-glow">
        <h2 className="text-3xl font-semibold text-slate-900">Sign up</h2>
        <p className="mt-2 text-sm text-slate-500">Register your customer or tailor account to get started.</p>
        <form className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-700">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Your name"
          />
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
            placeholder="Choose a secure password"
          />
          <button className="button-primary w-full">Create account</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">Login</Link>
        </p>
      </div>
    </section>
  );
}
