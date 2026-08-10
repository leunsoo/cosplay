'use client';

import Image from 'next/image';
import { formatEventDate, type OfficialEventDetail } from '@/entities/event';
import { FavoriteButton } from '@/features/favorite-event';

interface EventHeaderProps {
  event: Pick<
    OfficialEventDetail,
    | 'id'
    | 'imageUrl'
    | 'title'
    | 'category'
    | 'status'
    | 'dateInfo'
    | 'location'
    | 'address'
    | 'price'
  >;
}

export function EventHeader({ event }: EventHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch bg-white md:border md:border-gray-200 md:rounded-xs md:shadow-sm md:p-12">
      {/* 이미지 */}
      <div className="md:w-2/5 md:shrink-0 md:pr-12">
        <div className="relative w-full aspect-4/5 md:rounded-xs overflow-hidden md:shadow-md">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
          {/* 모바일: 찜 버튼 이미지 우측 상단 오버레이 */}
          <div className="absolute top-3 right-3 md:hidden">
            <FavoriteButton
              eventId={Number(event.id)}
              title={event.title}
              startDate={event.dateInfo.startDate.toISOString()}
              endDate={(
                event.dateInfo.endDate ?? event.dateInfo.startDate
              ).toISOString()}
              location={event.location}
              thumbnailUrl={event.imageUrl}
            />
          </div>
        </div>
      </div>

      {/* 제목 + 메타정보 */}
      <div className="flex-1 flex flex-col gap-4 px-4 md:px-0">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
            {event.title}
          </h1>
          {/* 데스크탑: 찜 버튼 제목 옆 */}
          <div className="hidden md:block">
            <FavoriteButton
              eventId={Number(event.id)}
              title={event.title}
              startDate={event.dateInfo.startDate.toISOString()}
              endDate={(
                event.dateInfo.endDate ?? event.dateInfo.startDate
              ).toISOString()}
              location={event.location}
              thumbnailUrl={event.imageUrl}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 divide-y divide-gray-100">
          {/* 날짜 */}
          <div className="flex items-center gap-4 md:gap-8 flex-1 py-3 md:py-4">
            <div className="hidden md:flex p-3 bg-primary/10 rounded-xl text-primary shrink-0">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '32px' }}
              >
                calendar_month
              </span>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400 uppercase font-bold tracking-wider mb-0.5 md:mb-1">
                날짜
              </p>
              <p className="font-bold text-gray-900 text-sm md:text-lg">
                {formatEventDate(event.dateInfo)}
              </p>
              {event.dateInfo.startTime && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {event.dateInfo.startTime}
                  {event.dateInfo.endTime ? ` - ${event.dateInfo.endTime}` : ''}
                </p>
              )}
            </div>
          </div>

          {/* 장소 */}
          <div className="flex items-center gap-4 md:gap-8 flex-1 py-3 md:py-4">
            <div className="hidden md:flex p-3 bg-primary/10 rounded-xl text-primary shrink-0">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '32px' }}
              >
                location_on
              </span>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400 uppercase font-bold tracking-wider mb-0.5 md:mb-1">
                장소
              </p>
              <p className="font-bold text-gray-900 text-sm md:text-lg">
                {event.location}
              </p>
              {event.address && (
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  {event.address}
                </p>
              )}
            </div>
          </div>

          {/* 가격 */}
          <div className="flex items-center gap-4 md:gap-8 flex-1 py-3 md:py-4">
            <div className="hidden md:flex p-3 bg-primary/10 rounded-xl text-primary shrink-0">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '32px' }}
              >
                sell
              </span>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400 uppercase font-bold tracking-wider mb-0.5 md:mb-1">
                가격
              </p>
              <p className="font-bold text-gray-900 text-sm md:text-lg">
                {event.price === 0
                  ? '무료'
                  : `${event.price.toLocaleString()}원`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
