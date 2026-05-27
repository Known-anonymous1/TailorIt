export default function MapView() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-50 to-slate-100 p-6 shadow-sm">
      <div className="h-96 rounded-[2rem] bg-slate-200 text-center text-slate-500 shadow-inner">
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <div className="text-2xl">🗺️</div>
          <p className="max-w-xs text-sm leading-relaxed">Interactive map view for tailor search and route previews.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/50" />
    </div>
  );
}
