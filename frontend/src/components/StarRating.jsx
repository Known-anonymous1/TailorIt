import { useState } from 'react';

export default function StarRating({ value = 0, onChange }) {
  const [rating, setRating] = useState(value);
  return (
    <div className="flex items-center gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={rating >= star ? 'text-amber-400' : 'text-slate-300'}
          onClick={() => {
            setRating(star);
            onChange?.(star);
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
