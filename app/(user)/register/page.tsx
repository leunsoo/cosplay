import { AuthGuard } from '@/core/providers/AuthGuard';
import { RegisterPage } from '@/_pages/register';

export default function Page() {
  return (
    <AuthGuard allowRoles={['temp']}>
      <RegisterPage />
    </AuthGuard>
  );
}
