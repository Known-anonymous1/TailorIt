import TailorCard from '../components/TailorCard.jsx';
import MapView from '../components/MapView.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function SearchResults() {
  return (
    <section className="space-y-8">
      <div className="card-surface">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Search results</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Tailors near you</h1>
          </div>
          <div className="max-w-2xl">
            <SearchBar onSearch={(value) => console.log('Searching for', value)} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <TailorCard name="Elegant Stitch" location="Downtown" specialty="Wedding alterations and bespoke tailoring" tags={['Bridal', 'Custom']} />
          <TailorCard name="Urban Bespoke" location="Midtown" specialty="Premium suit tailoring and fitting" tags={['Suits', 'Corporate']} />
          <TailorCard name="Couture Corner" location="Market Square" specialty="Luxury dressmaking and remodelling" tags={['Luxury', 'Alterations']} />
        </div>
        <div className="space-y-6">
          <div className="panel-card">
            <h2 className="text-xl font-semibold text-slate-900">Filter by</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Location</p>
                <p className="mt-1">Near you or custom area</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Service type</p>
                <p className="mt-1">Suit, bridal, alterations, custom wear</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Rating</p>
                <p className="mt-1">4 stars and above</p>
              </div>
            </div>
          </div>
          <MapView />
        </div>
      </div>
    </section>
  );
}
