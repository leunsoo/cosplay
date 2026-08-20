interface FavoriteIconButtonProps {
  favorited: boolean;
  isPending?: boolean;
  isLoading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function FavoriteIconButton({
  favorited,
  isPending,
  isLoading,
  onClick,
}: FavoriteIconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isPending || isLoading}
      className={`w-12 h-12 flex items-center cursor-pointer justify-center transition-all disabled:opacity-50 ${
        favorited
          ? 'md:border md:rounded-lg md:border-red-200 md:bg-red-50 text-red-500'
          : 'md:border md:rounded-lg md:border-gray-300 text-white md:text-gray-500'
      }`}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0",
          textShadow: favorited ? 'none' : '0 0 3px rgba(0,0,0,0.4)',
        }}
      >
        favorite
      </span>
    </button>
  );
}
