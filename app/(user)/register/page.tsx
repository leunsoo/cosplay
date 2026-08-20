import { AuthGuard } from '@/_app/providers/AuthGuard';
import { SignupPage } from '@/_pages/signup';

export default function Page() {
  return (
    <AuthGuard allowRoles={['temp']}>
      <SignupPage />
    </AuthGuard>
  );
}
