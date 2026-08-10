interface EditActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  variant?: 'mobile' | 'desktop';
}

const BUTTON_CLASSNAME = {
  mobile: {
    cancel: 'px-3 py-1.5 text-sm text-gray-600 font-medium',
    save: 'px-3 py-1.5 text-sm bg-black text-white font-bold rounded-lg disabled:opacity-50',
  },
  desktop: {
    cancel:
      'px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors',
    save: 'px-5 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors',
  },
} as const;

export function EditActions({
  onCancel,
  onSave,
  isSaving,
  variant = 'desktop',
}: EditActionsProps) {
  const className = BUTTON_CLASSNAME[variant];

  return (
    <>
      <button type="button" onClick={onCancel} className={className.cancel}>
        취소
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className={className.save}
      >
        {isSaving ? '저장 중...' : '저장'}
      </button>
    </>
  );
}
