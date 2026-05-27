import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Login</h2>
      <form className="mt-6 space-y-4">
        <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded-xl border px-4 py-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="button-primary w-full">Login</button>
      </form>
    </section>
  );
}
