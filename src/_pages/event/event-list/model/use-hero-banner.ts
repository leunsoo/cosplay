'use client';

import { useState, useEffect } from 'react';
import { useBannerList } from '../api/get-banner-list';
import type { BannersDTO } from '../api/get-banner-list';

export function useHeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading, error } = useBannerList();

  const banners: BannersDTO = data?.data ?? [];

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return {
    banners,
    currentSlide,
    isLoading,
    error,
    goToPrev,
    goToNext,
  };
}
