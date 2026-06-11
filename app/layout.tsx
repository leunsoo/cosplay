import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { MainMenu } from '@/widgets/main-menu';
import { Footer } from '@/widgets/footer';
import { QueryProvider } from '@/core/providers/QueryProvider';
import { ClarityMaskBoundary } from '@/shared/observability/ClarityMaskBoundary';
import { ClarityScript } from '@/shared/observability/ClarityScript';
import { TracingBootstrap } from '@/shared/observability/TracingBootstrap';
import { MobileGuard, DemoBanner } from '@/shared/ui';
import { MobileBottomNav } from '@/widgets/mobile-bottom-nav/MobileBottomNav';
import { MobileHeader } from '@/widgets/mobile-header/MobileHeader';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
});

const BASE_URL = 'https://llowa.kr';

/**
 * 사이트 전체에 적용되는 기본 메타데이터
 * 각 페이지에서 metadata를 export하면 해당 페이지 것으로 덮어써짐 (Step 6에서 작업 예정)
 *
 * - title.template : 페이지별 title 앞에 자동으로 붙는 형식 ("%s | LLOWA")
 * - title.default  : title을 따로 지정하지 않은 페이지의 기본값
 * - openGraph      : 카카오톡/슬랙 등 링크 공유 시 표시되는 썸네일/제목/설명
 * - twitter        : 트위터(X) 공유 시 카드 형식
 * - robots         : 검색 엔진 수집 허용 여부 (robots.ts와 별개로 HTML에도 명시)
 * - canonical      : 동일 콘텐츠의 대표 URL (중복 색인 방지)
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },

  title: {
    template: '%s | LLOWA', // 예: "코믹월드 2024 | LLOWA"
    default: '코스프레 행사 일정 - LLOWA', // title 미지정 페이지의 기본값
  },

  description:
    '국내 최대 코스프레 행사 정보 플랫폼. 코스프레 행사 일정, 의상 거래까지 한 곳에서.',

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: 'LLOWA',
    title: '코스프레 행사 일정 - LLOWA',
    description:
      '국내 최대 코스프레 행사 정보 플랫폼. 코스프레 행사 일정, 의상 거래까지 한 곳에서.',
    // TODO: OG 이미지 준비 후 아래 주석 해제
    // images: [
    //   {
    //     url: '/og-image.png', // public/og-image.png (권장 사이즈: 1200x630)
    //     width: 1200,
    //     height: 630,
    //     alt: 'LLOWA - 코스프레 행사 일정',
    //   },
    // ],
  },

  twitter: {
    card: 'summary_large_image', // 큰 이미지 카드 형식
    title: '코스프레 행사 일정 - LLOWA',
    description:
      '국내 최대 코스프레 행사 정보 플랫폼. 코스프레 행사 일정, 의상 거래까지 한 곳에서.',
    // TODO: OG 이미지 준비 후 아래 주석 해제
    // images: ['/og-image.png'],
  },

  robots: {
    index: true, // 검색 엔진 색인 허용
    follow: true, // 페이지 내 링크 따라가기 허용
  },

  alternates: {
    canonical: BASE_URL, // 이 사이트의 대표 URL (중복 색인 방지)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${notoSansKR.variable} bg-background-light text-text-main font-sans overflow-x-hidden antialiased flex flex-col min-h-screen`}
      >
        <ClarityScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
        <DemoBanner />
        <QueryProvider>
          <TracingBootstrap serviceName="cosplay-web" />
          <MobileGuard>
            <MainMenu />
            <MobileHeader />
            <ClarityMaskBoundary>{children}</ClarityMaskBoundary>
            <Footer />
            <MobileBottomNav />
          </MobileGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
