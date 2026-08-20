import { ROUTES } from '@/shared/routes';
import {
  type OfficialEvent,
  formatEventDate,
  getStatusColor,
} from '@/entities/event';
import { useLogined } from '@/shared/auth';
import { FavoriteButton } from '@/features/favorite-event';
import { formatEventPrice } from '../lib/format';
import { SummaryCardShell } from './SummaryCardShell';
import { SummaryCardInfoRow } from './SummaryCardInfoRow';

interface EventSummaryCardProps {
  event: OfficialEvent;
}

export function EventSummaryCard({ event }: EventSummaryCardProps) {
  const statusColor = getStatusColor(event.status);
  const logined = useLogined();

  return (
    <SummaryCardShell
      href={ROUTES.EVENT.DETAIL(event.id)}
      imageUrl={event.imageUrl}
      title={event.title}
      badges={
        <>
          <span className="bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded">
            {event.category}
          </span>
          <span
            className={`${statusColor.bg} ${statusColor.text} text-[11px] font-bold px-2 py-1 rounded shadow-md`}
          >
            {event.status}
          </span>
        </>
      }
      favoriteButton={logined && <FavoriteButton event={event} />}
      infoRows={
        <>
          <SummaryCardInfoRow
            icon="calendar_today"
            text={formatEventDate(event.dateInfo)}
          />
          <SummaryCardInfoRow icon="location_on" text={event.location} />
          <SummaryCardInfoRow
            icon="payments"
            text={formatEventPrice(event.price)}
          />
        </>
      }
      tags={
        (event.tags || []).length > 0
          ? (event.tags || []).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))
          : undefined
      }
    />
  );
}
