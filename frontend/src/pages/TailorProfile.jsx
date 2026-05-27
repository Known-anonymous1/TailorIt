import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import StarRating from '../components/StarRating.jsx';

export default function TailorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tailor, setTailor] = useState(null);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTailor = async () => {
      try {
        const response = await api.get(`/tailors/${id}`);
        setTailor(response.data.tailor);
      } catch (err) {
        setError('Unable to load tailor profile.');
      } finally {
        setLoading(false);
      }
    };

    loadTailor();
  }, [id]);

  const handleSendInquiry = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!message.trim()) {
      setNotification('Please enter a message before sending.');
      return;
    }

    try {
      await api.post('/inquiries', { tailorId: id, message });
      setNotification('Your message was sent to the tailor.');
      setMessage('');
    } catch {
      setNotification('Failed to send inquiry. Try again later.');
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/favorites', { tailorId: id });
      setNotification('Tailor added to favorites.');
    } catch {
      setNotification('Unable to save favorite.');
    }
  };

  if (loading) {
    return <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-slate-500">Loading tailor profile...</div>;
  }

  if (error || !tailor) {
    return <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-rose-700">{error || 'Tailor not found.'}</div>;
  }

  return (
    <section className="space-y-10">
      <div className="card-surface">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-100 text-3xl font-bold text-brand-700">{tailor.business_name?.[0] || 'T'}</div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Featured tailor</p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-900">{tailor.business_name}</h1>
                <p className="mt-2 text-sm text-slate-600">{tailor.bio || 'Trusted local tailor specializing in custom fittings and alterations.'}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Expert craftsmanship</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Custom fittings</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Local studio</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="rounded-3xl bg-slate-50 px-4 py-3">Location: {tailor.address || 'N/A'}</div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3">Rating: {tailor.reviews?.length ? (tailor.reviews.reduce((acc, item) => acc + item.rating, 0) / tailor.reviews.length).toFixed(1) : 'New'}</div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3">Owner: {tailor.owner}</div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-900/95 p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Quick contact</p>
            <h2 className="mt-4 text-2xl font-semibold">Request a quote</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Send a direct inquiry and get a tailored reply from the workshop.</p>
            <div className="mt-8 space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Start your message to the tailor"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100/30"
              />
              <button onClick={handleSendInquiry} className="button-primary w-full">Message tailor</button>
              <button onClick={handleFavorite} className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/20">Save to favorites</button>
              {notification && <p className="text-sm text-brand-100/95">{notification}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel-card lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Services offered</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            {tailor.services?.length ? (
              tailor.services.map((service) => (
                <li key={service.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6">{service.description || 'Tailor service package.'}</p>
                  <p className="mt-3 text-sm text-slate-500">Price: ${service.price?.toFixed(2) || '0.00'} • {service.duration}</p>
                </li>
              ))
            ) : (
              <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-500">No services listed yet.</li>
            )}
          </ul>
        </div>
        <div className="panel-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Reviews</h2>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{tailor.reviews?.length || 0}</span>
          </div>
          <div className="mt-6 space-y-5 text-slate-600">
            {tailor.reviews?.length ? (
              tailor.reviews.map((review) => (
                <div key={review.id} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-slate-900">{review.username || 'Guest review'}</p>
                    <StarRating value={review.rating} />
                  </div>
                  <p className="mt-2 text-sm">{review.comment || 'No additional review text provided.'}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 p-4 text-slate-500">No reviews yet. Be the first to share your experience.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
