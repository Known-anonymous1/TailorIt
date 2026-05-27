import StarRating from '../components/StarRating.jsx';

export default function TailorProfile() {
  return (
    <section className="space-y-10">
      <div className="card-surface">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-100 text-3xl font-bold text-brand-700">T</div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Featured tailor</p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-900">Tailor Crafted Studio</h1>
                <p className="mt-2 text-sm text-slate-600">Elegant suits, bridal wear, and custom fittings with a trusted local touch.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Wedding</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Alterations</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Custom Suits</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="rounded-3xl bg-slate-50 px-4 py-3">Location: Old Town</div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3">Response time: 2h</div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3">Rating: 4.9</div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-900/95 p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Quick contact</p>
            <h2 className="mt-4 text-2xl font-semibold">Request a quote</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Send a direct inquiry and get a tailored reply from the workshop.</p>
            <div className="mt-8 grid gap-3">
              <button className="button-primary w-full">Message tailor</button>
              <button className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/20">Save to favorites</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel-card lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Services offered</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Bridal gown tailoring</h3>
              <p className="mt-2 text-sm leading-6">Custom bridal fittings with no detail overlooked.</p>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Premium suit design</h3>
              <p className="mt-2 text-sm leading-6">Made-to-measure suits with premium fabrics and finishes.</p>
            </li>
          </ul>
        </div>
        <div className="panel-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Reviews</h2>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">4.9</span>
          </div>
          <div className="mt-6 space-y-5 text-slate-600">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">Excellent craftmanship</p>
                <StarRating value={5} />
              </div>
              <p className="mt-2 text-sm">The tailoring experience was seamless and the fit was perfect.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">Super responsive</p>
                <StarRating value={4} />
              </div>
              <p className="mt-2 text-sm">Great communication and fast delivery for my dress alterations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
