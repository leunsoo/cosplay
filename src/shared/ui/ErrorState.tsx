interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = '정보를 불러오는데 실패했습니다.',
  onRetry,
}: ErrorStateProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-100 gap-4">
      <span className="material-symbols-outlined text-6xl text-gray-300">
        error
      </span>
      <p className="text-gray-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          다시 시도
        </button>
      )}
    </main>
  );
}
