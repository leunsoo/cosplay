'use client';

import { useState, useEffect } from 'react';

interface Coords {
  lat: number;
  lng: number;
}

export function useGeocodedLocation(location: string) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const search = () => {
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
    };

    if (window.kakao?.maps) {
      window.kakao.maps.load(search);
    }
  }, [location]);

  return { coords, error };
}
