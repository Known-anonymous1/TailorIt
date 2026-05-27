export default function TailorDashboard() {
  return (
    <section className="space-y-8">
      <div className="card-surface">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-teal">Tailor dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage your studio</h1>
          </div>
          <button className="button-primary">Add new service</button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Portfolio</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">24</h2>
          <p className="mt-3 text-sm text-slate-600">Images and completed work examples.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Leads</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">16</h2>
          <p className="mt-3 text-sm text-slate-600">New customer inquiries awaiting reply.</p>
        </div>
        <div className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Reviews</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">4.9</h2>
          <p className="mt-3 text-sm text-slate-600">Average rating from recent customers.</p>
        </div>
      </div>
    </section>
  );
}
