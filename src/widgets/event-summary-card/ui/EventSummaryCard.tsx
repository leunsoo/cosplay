import Link from 'next/link';
import { ROUTES } from '@/core/config';
import {
  type OfficialEvent,
  formatEventDate,
  getStatusColor,
} from '@/entities/event';
import { FavoriteButton } from '@/features/favorite-event';
import { SummaryCardInfoRow } from '@/shared/ui';

interface EventSummaryCardProps {
  event: OfficialEvent;
}

export function EventSummaryCard({ event }: EventSummaryCardProps) {
  const statusColor = getStatusColor(event.status);

  return (
    <Link href={ROUTES.EVENT.DETAIL(event.id)}>
      <article className="group relative flex flex-col md:flex-row bg-white rounded-md md:rounded-xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all shadow-card hover:shadow-card-hover cursor-pointer">
        {/* 이미지 */}
        <div className="md:w-60 aspect-square relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${event.imageUrl}')` }}
          ></div>
          <div className="absolute top-3 left-3 flex gap-1">
            <span className="bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded">
              {event.category}
            </span>
            <span
              className={`${statusColor.bg} ${statusColor.text} text-[11px] font-bold px-2 py-1 rounded shadow-md`}
            >
              {event.status}
            </span>
          </div>
          {/* 찜 버튼 — 모바일에서만 이미지 우측 상단 */}
          <div
            className="md:hidden absolute top-3 right-3"
            onClick={(e) => e.preventDefault()}
          >
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

        {/* 내용 */}
        <div className="flex-1 p-3 md:p-6 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-900 text-lg md:text-xl font-bold group-hover:text-primary transition-colors leading-tight truncate">
              {event.title}
            </h3>
            {/* 찜 버튼 — 데스크톱에서만 내용 영역 우측 */}
            <div
              className="hidden md:block"
              onClick={(e) => e.preventDefault()}
            >
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

          {/* 정보 목록 */}
          <div className="flex flex-col gap-1 md:gap-4 text-sm text-gray-600 md:my-3">
            <SummaryCardInfoRow
              icon="calendar_today"
              text={formatEventDate(event.dateInfo)}
            />
            <SummaryCardInfoRow icon="location_on" text={event.location} />
            <SummaryCardInfoRow
              icon="payments"
              text={event.price === 0 ? '무료' : String(event.price)}
            />
          </div>

          {/* 태그 */}
          {(event.tags || []).length > 0 && (
            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
              {(event.tags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
