import SearchBar from '../components/SearchBar.jsx';
import TailorCard from '../components/TailorCard.jsx';
import MapView from '../components/MapView.jsx';

export default function Home() {
  return (
    <section className="space-y-14">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-800 via-brand-700 to-slate-900 px-6 py-16 text-white shadow-glow sm:px-12">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-brand-500 blur-3xl"></div>
          <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-accent-teal blur-3xl"></div>
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">TailorIt v1.0</span>
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Discover local tailors, browse portfolios, and book custom tailoring instantly.</h1>
            <p className="max-w-xl text-lg leading-8 text-brand-100/90">TailorIt blends modern search, rich tailor profiles, and an elegant marketplace experience built for customers and tailors alike.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/search" className="button-primary">Search Tailors</a>
              <a href="/register" className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm text-white transition hover:bg-white/20">Join as a tailor</a>
            </div>
          </div>
          <div className="grid gap-5 sm:max-w-md">
            <div className="rounded-[2rem] bg-white/10 p-6 shadow-xl backdrop-blur-xl border border-white/20">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">Platform architecture</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Search, compare, and connect with trusted tailors near you.</h2>
            </div>
            <div className="rounded-[2rem] bg-white/10 p-6 shadow-xl backdrop-blur-xl border border-white/20">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">Fast booking</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Easy discovery, service booking, and review-based trust.</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card-surface">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">Platform</span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Frontend + PWA</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">React + Vite + Tailwind deliver a sharp modern experience across mobile and desktop.</p>
          </div>
          <div className="card-surface">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-teal">Backend</span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Express + PostgreSQL</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Secure REST API with JWT auth, image uploads, and location-aware tailor search.</p>
          </div>
          <div className="card-surface">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">Scalable</span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Tailor marketplace ready</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Built to grow with favorites, portfolios, reviews, and customer-tailor messaging.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="card-surface">
              <h3 className="text-2xl font-semibold text-slate-900">Featured Tailors</h3>
              <p className="mt-2 text-sm text-slate-600">Browse top local artisans and explore services curated for your next project.</p>
            </div>
            <div className="space-y-5">
              <TailorCard name="Elevate Tailors" location="Old Town" specialty="Custom bridal and evening wear" tags={['Bridal', 'Couture']} />
              <TailorCard name="StitchCraft Studio" location="Harbor District" specialty="Suit tailoring and alteration services" tags={['Suits', 'Alterations']} />
            </div>
          </div>
          <MapView />
        </div>
      </div>
    </section>
  );
}
