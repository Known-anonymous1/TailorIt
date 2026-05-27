import TailorCard from '../components/TailorCard.jsx';
import MapView from '../components/MapView.jsx';

export default function SearchResults() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        <TailorCard name="Elegant Stitch" location="Downtown" specialty="Wedding alterations" />
        <TailorCard name="Urban Bespoke" location="Midtown" specialty="Custom suits" />
      </div>
      <MapView />
    </div>
  );
}
