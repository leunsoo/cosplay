'use client';

import { useFavoriteToggle } from '../model';

interface FavoriteButtonProps {
  productId: number;
  title: string;
  price: number;
  mainImageUrl: string;
}

export function FavoriteButton({
  productId,
  title,
  price,
  mainImageUrl,
}: FavoriteButtonProps) {
  const { displayedFavorited, isPending, isLoading, handleClick } =
    useFavoriteToggle({ productId, title, price, mainImageUrl });

  return (
    <button
      onClick={handleClick}
      disabled={isPending || isLoading}
      className={`w-12 h-12 flex items-center cursor-pointer justify-center border rounded-lg transition-all disabled:opacity-50 ${
        displayedFavorited
          ? 'border-red-200 bg-red-50 text-red-500'
          : 'border-gray-300 text-gray-500'
      }`}
    >
      <span
        className={`material-symbols-outlined ${displayedFavorited ? 'fill-current' : ''}`}
      >
        favorite
      </span>
    </button>
  );
}
