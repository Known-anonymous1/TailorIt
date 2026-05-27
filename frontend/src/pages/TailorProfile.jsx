import StarRating from '../components/StarRating.jsx';

export default function TailorProfile() {
  return (
    <section className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold">Tailor profile</h2>
      <p className="text-slate-600">Public listing page with services, portfolio and reviews.</p>
      <StarRating value={4} />
    </section>
  );
}
