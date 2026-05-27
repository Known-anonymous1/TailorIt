import SearchBar from '../components/SearchBar.jsx';

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Find custom tailors near you.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-200">Search local stitchers, compare portfolios, and book services with reviews and favorites.</p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <SearchBar onSearch={(q) => console.log('Search', q)} />
      </div>
    </section>
  );
}
