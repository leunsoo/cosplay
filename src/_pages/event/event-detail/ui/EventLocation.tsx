'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useGeocodedLocation } from '../model/use-geocoded-location';

interface EventLocationProps {
  location: string;
}

export function EventLocation({ location }: EventLocationProps) {
  const { coords, error } = useGeocodedLocation(location);

  return (
    <div>
      <h3 className="text-lg md:text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        장소
      </h3>

      {error ? (
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-xl text-sm text-gray-400">
          지도를 불러올 수 없습니다
        </div>
      ) : coords ? (
        <Map
          center={coords}
          className="w-full h-104 rounded-sm"
          level={4}
          draggable={false}
          zoomable={false}
        >
          <MapMarker position={coords} />
        </Map>
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-xl text-sm text-gray-400">
          지도 불러오는 중...
        </div>
      )}
    </div>
  );
}
