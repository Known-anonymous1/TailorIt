export default function CustomerDashboard() {
  return (
    <section className="space-y-8">
      <div className="card-surface">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Customer dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Your recent activity</h1>
          </div>
          <button className="button-primary">Browse tailors</button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Favorites</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">12</h2>
          <p className="mt-3 text-sm text-slate-600">Tailors saved for quick access.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Inquiries</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">8</h2>
          <p className="mt-3 text-sm text-slate-600">Messages sent to local tailors.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Booked services</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">4</h2>
          <p className="mt-3 text-sm text-slate-600">Active tailoring requests in progress.</p>
        </div>
      </div>
    </section>
  );
}
