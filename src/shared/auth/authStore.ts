import { create } from 'zustand';
import { getJwtInfoFromToken } from '@/shared/jwt/jwt';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthActions {
  setAuthChecking: () => void;
  setAuthenticated: (accessToken: string) => void;
  setDemoAuthenticated: () => void;
  setDemoTempAuthenticated: () => void;
  setUnauthenticated: () => void;
}

interface AuthState {
  userUuid: string;
  role: string | null;
  accessToken: string;
  authStatus: AuthStatus;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  userUuid: '',
  role: null,
  accessToken: '',
  authStatus: 'checking',
  setAuthChecking: () => set({ authStatus: 'checking' }),
  setAuthenticated: (accessToken: string) => {
    const { userUuid, role } = getJwtInfoFromToken(accessToken);
    set({
      userUuid,
      role: normalizeRole(role),
      accessToken,
      authStatus: 'authenticated',
    });
  },
  setDemoAuthenticated: () =>
    set({
      userUuid: 'demo-user-uuid-0000',
      role: 'member',
      accessToken: 'demo-token',
      authStatus: 'authenticated',
    }),
  // 데모 모드에서 OAuth 로그인 → 신규 유저 회원가입 흐름 재현용 (role: 'temp')
  setDemoTempAuthenticated: () =>
    set({
      userUuid: 'demo-user-uuid-0000',
      role: 'temp',
      accessToken: 'demo-temp-token',
      authStatus: 'authenticated',
    }),
  setUnauthenticated: () =>
    set({
      userUuid: '',
      role: null,
      accessToken: '',
      authStatus: 'unauthenticated',
    }),
}));

function normalizeRole(rawRole: string) {
  if (rawRole.startsWith('ROLE_')) {
    const trimmed = rawRole.slice('ROLE_'.length); // ADMIN
    const lower = trimmed.toLowerCase(); // admin
    return lower;
  }
}
