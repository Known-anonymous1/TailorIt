import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
      <div className="space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Page not found</p>
        <h1 className="text-5xl font-bold text-slate-900">404</h1>
        <p className="max-w-xl mx-auto text-base leading-8 text-slate-600">
          The page you are looking for doesn’t exist or has been moved. Use the navigation above or return to the homepage.
        </p>
        <Link to="/" className="button-primary inline-flex px-8 py-3">
          Return home
        </Link>
      </div>
    </section>
  );
}
