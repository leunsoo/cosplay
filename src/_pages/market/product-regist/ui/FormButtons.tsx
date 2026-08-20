interface FormButtonsProps {
  isPending?: boolean;
  isEditMode?: boolean;
}

export function FormButtons({
  isPending = false,
  isEditMode = false,
}: FormButtonsProps) {
  const pendingLabel = isEditMode ? '수정 중...' : '등록 중...';
  const idleLabel = isEditMode ? '수정하기' : '등록하기';

  return (
    <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-gray-100">
      <button
        className="px-8 py-3 rounded-lg bg-black cursor-pointer text-white font-bold disabled:opacity-50"
        type="submit"
        disabled={isPending}
      >
        {isPending ? pendingLabel : idleLabel}
      </button>
    </div>
  );
}
