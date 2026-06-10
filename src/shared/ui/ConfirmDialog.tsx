import { RefObject } from 'react';

export interface ConfirmDialogContent {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pendingLabel?: string;
}

interface ConfirmDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  content: ConfirmDialogContent;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onBackdropClick: (e: React.MouseEvent<HTMLDialogElement>) => void;
}

export function ConfirmDialog({
  dialogRef,
  content,
  isPending = false,
  onConfirm,
  onCancel,
  onBackdropClick,
}: ConfirmDialogProps) {
  const {
    title,
    description,
    confirmLabel = '확인',
    cancelLabel = '취소',
    pendingLabel,
  } = content;

  return (
    <dialog
      ref={dialogRef}
      onClick={onBackdropClick}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 rounded-lg p-6 shadow-xl border border-gray-300 backdrop:bg-transparent max-w-sm w-full"
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-6">{description}</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {isPending ? (pendingLabel ?? confirmLabel) : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
