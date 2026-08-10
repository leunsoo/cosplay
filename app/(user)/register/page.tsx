import { AuthGuard } from '@/_app/providers/AuthGuard';
import { RegisterPage } from '@/_pages/register';

export default function Page() {
  return (
    <AuthGuard allowRoles={['temp']}>
      <RegisterPage />
    </AuthGuard>
  );
}
