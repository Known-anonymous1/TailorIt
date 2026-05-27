import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <Link to="/" className="text-xl font-bold text-slate-900">TailorIt</Link>
      <div className="flex items-center gap-4">
        <Link to="/search" className="text-slate-700 hover:text-slate-900">Search</Link>
        {user ? (
          <>
            <span className="text-slate-600">{user.username}</span>
            <button onClick={logout} className="button-primary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-slate-700 hover:text-slate-900">Login</Link>
            <Link to="/register" className="button-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
