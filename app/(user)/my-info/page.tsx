import { AuthGuard } from '@/core/providers/AuthGuard';
import { MyInfoPage } from '@/_pages/my-info';

export default function Page() {
  return (
    <AuthGuard allowRoles={['member']}>
      <MyInfoPage />
    </AuthGuard>
  );
}
