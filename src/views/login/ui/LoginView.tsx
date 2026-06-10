'use client';

import { useSearchParams } from 'next/navigation';
import { LoginBtn } from '@/features/login/ui/LoginBtn';

export function LoginView() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');

  return (
    <main className="min-h-[calc(100vh-64px)] bg-linear-to-b from-white via-gray-50 to-white">
      <section className="container-custom mx-auto px-4 py-10 md:py-16">
        <div className="mx-auto w-full max-w-md rounded-2xl md:border border-gray-200 md:bg-white p-6 md:shadow-sm md:p-8">
          <div className="mb-6">
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
              로그인
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              소셜 계정으로 빠르게 로그인하세요.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-3">
            <LoginBtn provider="google" nextPath={nextPath} />
            <LoginBtn provider="kakao" nextPath={nextPath} />
            <LoginBtn provider="x" nextPath={nextPath} />
          </div>
        </div>
      </section>
    </main>
  );
}
