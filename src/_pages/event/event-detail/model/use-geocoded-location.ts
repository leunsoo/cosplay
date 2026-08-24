'use client';

import { useState, useEffect } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

interface Coords {
  lat: number;
  lng: number;
}

export function useGeocodedLocation(location: string) {
  const [sdkLoading, sdkError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY!,
    libraries: ['services'],
  });
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sdkLoading || sdkError) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(location, (result, status) => {
      if (
        status === window.kakao.maps.services.Status.OK &&
        result.length > 0
      ) {
        setCoords({ lat: Number(result[0].y), lng: Number(result[0].x) });
        return;
      }

      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(location, (result, status) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          result.length > 0
        ) {
          setCoords({ lat: Number(result[0].y), lng: Number(result[0].x) });
        } else {
          setError(true);
        }
      });
    });
  }, [location, sdkLoading, sdkError]);

  return { coords, error: error || Boolean(sdkError) };
}
