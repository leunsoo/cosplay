interface FormButtonsProps {
  isPending?: boolean;
}

export function FormButtons({ isPending = false }: FormButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-gray-100">
      {/* <button
        className="px-6 py-3 rounded-lg border border-gray-300 cursor-pointer text-gray-700 font-bold hover:bg-gray-50 transition-colors"
        type="button"
        disabled={isPending}
      >
        임시저장
      </button> */}
      <button
        className="px-8 py-3 rounded-lg bg-black cursor-pointer text-white font-bold disabled:opacity-50"
        type="submit"
        disabled={isPending}
      >
        {isPending ? '등록 중...' : '등록하기'}
      </button>
    </div>
  );
}
