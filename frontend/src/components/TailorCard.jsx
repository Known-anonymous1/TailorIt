export default function TailorCard({ name, location, specialty }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-slate-600">{location}</p>
      <p className="mt-3 text-slate-700">{specialty}</p>
    </div>
  );
}
