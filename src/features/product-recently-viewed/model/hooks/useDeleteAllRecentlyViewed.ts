import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAllRecentlyViewed } from '../../api';

interface UseDeleteAllRecentlyViewedParams {
  uuid: string;
  onSuccess?: () => void;
}

export function useDeleteAllRecentlyViewed({
  uuid,
  onSuccess,
}: UseDeleteAllRecentlyViewedParams) {
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const mutation = useMutation({
    mutationFn: deleteAllRecentlyViewed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recently-viewed', uuid],
      });
      onSuccess?.();
      dialogRef.current?.close();
    },
  });

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!clickedInDialog) {
      dialog.close();
    }
  };

  return {
    dialogRef,
    isPending: mutation.isPending,
    openDialog,
    closeDialog,
    handleBackdropClick,
    handleConfirm: () => mutation.mutate({ uuid }),
  };
}
