import { AuthGuard } from '@/core/providers/AuthGuard';
import { MyInfoView } from '@/views/my-info';

export default function MyInfoPage() {
  return (
    <AuthGuard allowRoles={['member']}>
      <MyInfoView />
    </AuthGuard>
  );
}
