'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BANNER_QUERIES } from '@/shared/api/banner';
import type { BannersDTO } from '@/shared/api/banner';

export function useHeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading, error } = useQuery(BANNER_QUERIES.list());

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
