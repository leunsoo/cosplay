import { useRouter } from 'next/navigation';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { useAuthStore, type AuthStore } from '@/shared/auth/authStore';
import { saveLoginRedirectPath } from '@/shared/auth';
import {
  resolveDemoLoginRedirect,
  resolveOAuthLoginRedirect,
  type LoginProvider,
  type LoginRedirectAction,
} from './loginRedirectStrategy';

export function useLoginRedirect(
  provider: LoginProvider,
  nextPath?: string | null
): () => void {
  const router = useRouter();
  const setDemoAuthenticated = useAuthStore(
    (state) => state.setDemoAuthenticated
  );
  const setDemoTempAuthenticated = useAuthStore(
    (state) => state.setDemoTempAuthenticated
  );

  return function handleLoginClick() {
    const action = IS_DEMO
      ? resolveDemoLoginRedirect(nextPath)
      : resolveOAuthLoginRedirect(provider, nextPath);

    runLoginRedirectAction(action, router, {
      setDemoAuthenticated,
      setDemoTempAuthenticated,
    });
  };
}

function runLoginRedirectAction(
  action: LoginRedirectAction,
  router: ReturnType<typeof useRouter>,
  demoActions: Pick<
    AuthStore,
    'setDemoAuthenticated' | 'setDemoTempAuthenticated'
  >
) {
  if (action.type !== 'config-error') {
    saveLoginRedirectPath(action.pathToPersist);
  }

  switch (action.type) {
    case 'navigate':
      if (action.authenticateAs === 'member') {
        demoActions.setDemoAuthenticated();
      } else {
        demoActions.setDemoTempAuthenticated();
      }
      if (action.asReplace) {
        router.replace(action.path);
      } else {
        router.push(action.path);
      }
      return;
    case 'oauth-redirect':
      window.location.assign(action.url);
      return;
    case 'config-error':
      throw new Error(action.reason);
  }
}
