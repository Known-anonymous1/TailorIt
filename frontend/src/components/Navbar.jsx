import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900">TailorIt</Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <Link to="/" className="transition hover:text-slate-900">Home</Link>
          <Link to="/search" className="transition hover:text-slate-900">Search</Link>
          {user && user.role === 'tailor' && (
            <Link to="/tailor-dashboard" className="transition hover:text-slate-900">Tailor</Link>
          )}
          {user && user.role === 'customer' && (
            <Link to="/customer" className="transition hover:text-slate-900">Customer</Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">{user.username}</span>
              <button onClick={logout} className="button-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Login</Link>
              <Link to="/register" className="button-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
