import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function TailorDashboard() {
  const [summary, setSummary] = useState({ services: 0, portfolio: 0, inquiries: 0, rating: '0.0' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      try {
        const response = await api.get('/tailors/summary');
        setSummary(response.data);
      } catch {
        setError('Unable to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  return (
    <section className="space-y-8">
      <div className="card-surface">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-teal">Tailor dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage your studio</h1>
          </div>
          <button onClick={() => window.location.assign('/search')} className="button-primary">Browse customers</button>
        </div>
      </div>
      {error && <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Portfolio</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '—' : summary.portfolio}</h2>
          <p className="mt-3 text-sm text-slate-600">Completed portfolio items and uploads.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Leads</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '—' : summary.inquiries}</h2>
          <p className="mt-3 text-sm text-slate-600">New customer inquiries awaiting reply.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Average rating</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '—' : summary.rating}</h2>
          <p className="mt-3 text-sm text-slate-600">Based on reviews from recent customers.</p>
        </div>
      </div>
    </section>
  );
}
