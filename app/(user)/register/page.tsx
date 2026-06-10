import { AuthGuard } from '@/core/providers/AuthGuard';
import { RegisterView } from '@/views/register';

export default function RegisterPage() {
  return (
    <AuthGuard allowRoles={['temp']}>
      <RegisterView />
    </AuthGuard>
  );
}
