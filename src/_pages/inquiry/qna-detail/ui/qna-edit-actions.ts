export interface QnaEditActions {
  isEditing: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  canSave: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}
