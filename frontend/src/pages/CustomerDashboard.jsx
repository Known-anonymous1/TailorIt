import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function CustomerDashboard() {
  const [summary, setSummary] = useState({ favorites: 0, inquiries: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      try {
        const response = await api.get('/auth/summary');
        setSummary(response.data);
      } catch {
        setError('Unable to load your activity summary.');
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  const navigate = useNavigate();

  return (
    <section className="space-y-8">
      <div className="card-surface">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Customer dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Your recent activity</h1>
          </div>
          <button onClick={() => navigate('/search')} className="button-primary">Browse tailors</button>
        </div>
      </div>
      {error && <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Favorites</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '—' : summary.favorites}</h2>
          <p className="mt-3 text-sm text-slate-600">Tailors saved for quick access.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Inquiries</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '—' : summary.inquiries}</h2>
          <p className="mt-3 text-sm text-slate-600">Messages sent to local studios.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Reviews</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '—' : summary.reviews}</h2>
          <p className="mt-3 text-sm text-slate-600">Reviews you have left for tailors.</p>
        </div>
      </div>
    </section>
  );
}
