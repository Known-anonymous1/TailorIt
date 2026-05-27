import { useEffect, useState } from 'react';
import TailorCard from '../components/TailorCard.jsx';
import MapView from '../components/MapView.jsx';
import SearchBar from '../components/SearchBar.jsx';
import api from '../services/api.js';

export default function SearchResults() {
  const [tailors, setTailors] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTailors = async (search = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/tailors', { params: { q: search } });
      setTailors(response.data.tailors);
    } catch (err) {
      setError('Unable to load tailors, please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTailors();
  }, []);

  return (
    <section className="space-y-8">
      <div className="card-surface">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Search results</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Tailors near you</h1>
          </div>
          <div className="max-w-2xl">
            <SearchBar
              onSearch={(value) => {
                setQuery(value);
                fetchTailors(value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {loading ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-slate-500">Loading tailors...</div>
          ) : error ? (
            <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-rose-700">{error}</div>
          ) : tailors.length ? (
            tailors.map((tailor) => (
              <TailorCard
                key={tailor.id}
                name={tailor.business_name}
                location={tailor.address || 'Local area'}
                specialty={tailor.bio || 'Custom tailoring services'}
                tags={[tailor.owner || 'Tailor']}
              />
            ))
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-slate-500">No tailors found for “{query || 'all'}”. Try another search.</div>
          )}
        </div>
        <div className="space-y-6">
          <div className="panel-card">
            <h2 className="text-xl font-semibold text-slate-900">Filter by</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Location</p>
                <p className="mt-1">Search by city, neighborhood, or workshop.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Service type</p>
                <p className="mt-1">Compare bridal, suits, alterations and bespoke design.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Rating</p>
                <p className="mt-1">Only show high-rated local tailors.</p>
              </div>
            </div>
          </div>
          <MapView />
        </div>
      </div>
    </section>
  );
}
