import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(query); }} className="flex gap-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Search tailors, services or location"
      />
      <button type="submit" className="button-primary">Search</button>
    </form>
  );
}
