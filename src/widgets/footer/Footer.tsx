import Link from 'next/link';
import { ROUTES } from '@/core/config';

export function Footer() {
  return (
    <footer className="w-full border-t border-border-color bg-gray-50 mt-auto">
      <div className="container-custom mx-auto px-4 py-10">
        {/* 브랜드 */}
        <div className="flex flex-col gap-2 mb-6">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="text-slate-900 text-lg font-black tracking-tight">
              LLOWA
            </span>
          </Link>
          <p className="text-sm text-text-sub">코스프레 행사 정보 플랫폼</p>
        </div>

        {/* 링크 */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
          <span className="text-sm text-text-sub">
            llowa.official@gmail.com
          </span>
          {/* <a
            href="mailto:llowa.official@gmail.com"
            className="text-sm text-text-sub hover:text-primary transition-colors"
          >
            1:1 문의하기
          </a> */}
          {/* <Link
            href="/privacy"
            className="text-sm text-text-sub hover:text-primary transition-colors"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="text-sm text-text-sub hover:text-primary transition-colors"
          >
            이용약관
          </Link> */}
        </div>

        {/* 서비스 이용 주의사항 */}
        <div className="mb-6 p-4 bg-gray-100 rounded-md">
          <p className="text-xs text-gray-kr leading-relaxed">
            LLOWA는 판매중개자이며, 판매의 당사자가 아닙니다. 상품, 상품정보,
            거래에 관한 책임은 개별 판매자에게 귀속하고, LLOWA는 원칙적으로
            회원간 거래에 대하여 책임을 지지 않습니다.
          </p>
        </div>

        <div className="pt-6 border-t border-border-color">
          <p className="text-xs text-gray-kr">
            © {new Date().getFullYear()} LLOWA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
