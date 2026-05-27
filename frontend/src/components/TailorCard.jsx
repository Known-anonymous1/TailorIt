import { Link } from 'react-router-dom';

export default function TailorCard({ id, name, location, specialty, rating = 4.8, tags = ['Wedding', 'Alterations'] }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
          <p className="mt-1 text-sm text-slate-500">{location}</p>
        </div>
        <div className="rounded-2xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">{rating} ★</div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{tag}</span>
        ))}
      </div>
      <p className="mt-5 text-slate-600">{specialty}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={id ? `/tailor/${id}` : '/search'} className="button-primary text-sm">View profile</Link>
        <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50">Favorite</button>
      </div>
    </article>
  );
}
