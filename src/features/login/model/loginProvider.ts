export const PROVIDERS = ['google', 'kakao', 'x'] as const;

export type LoginProvider = (typeof PROVIDERS)[number];
