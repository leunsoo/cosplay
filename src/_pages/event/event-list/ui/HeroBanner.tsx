'use client';

import Link from 'next/link';
import { ImageWithFallback } from '@/shared/ui';
import { useHeroBanner } from '../model/use-hero-banner';

const EMPTY_STATE_CLASSNAME =
  'relative w-full rounded-2xl overflow-hidden aspect-21/9 md:aspect-[2.5/1] flex items-center justify-center bg-gray-100';

export function HeroBanner() {
  const { banners, currentSlide, isLoading, error, goToPrev, goToNext } =
    useHeroBanner();

  if (isLoading) {
    return <section className={`${EMPTY_STATE_CLASSNAME} animate-pulse`} />;
  }

  if (error || banners.length === 0) {
    return (
      <section className={EMPTY_STATE_CLASSNAME}>
        <p className="text-gray-400 text-sm">공지가 아직 없습니다.</p>
      </section>
    );
  }

  const currentBanner = banners[currentSlide];
  const isInternal = currentBanner.linkUrl.startsWith('/');

  const bannerContent = (
    <>
      <ImageWithFallback
        src={currentBanner.imageUrl}
        alt={currentBanner.title}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center items-start z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 drop-shadow-sm">
          {currentBanner.title}
        </h2>
        <p className="text-gray-100 text-sm md:text-base mb-8 max-w-xl font-medium opacity-95 drop-shadow-sm">
          {currentBanner.description}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
        aria-label="이전 슬라이드"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
        aria-label="다음 슬라이드"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </>
  );

  const wrapperClass =
    'relative w-full rounded-2xl overflow-hidden aspect-21/9 md:aspect-[2.5/1] group block';

  return isInternal ? (
    <Link href={currentBanner.linkUrl} className={wrapperClass}>
      {bannerContent}
    </Link>
  ) : (
    <a
      href={currentBanner.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={wrapperClass}
    >
      {bannerContent}
    </a>
  );
}
