import { useMutation } from '@tanstack/react-query';
import { logout } from '@/shared/api/endpoints/user';

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
