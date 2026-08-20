import { ROUTES } from '@/shared/routes';
import {
  type PersonalEvent,
  formatEventDate,
  getStatusColor,
} from '@/entities/event';
import { useLogined } from '@/shared/auth';
import { FavoriteMeetupButton } from '@/features/favorite-meetup';
import { formatMemberCount } from '../lib/format';
import { SummaryCardShell } from './SummaryCardShell';
import { SummaryCardInfoRow } from './SummaryCardInfoRow';

interface MeetupSummaryCardProps {
  event: PersonalEvent;
}

export function MeetupSummaryCard({ event }: MeetupSummaryCardProps) {
  const statusColor = getStatusColor(event.status);
  const logined = useLogined();

  return (
    <SummaryCardShell
      href={ROUTES.MEETUP.DETAIL(event.id)}
      imageUrl={event.imageUrl}
      title={event.title}
      badges={
        <span
          className={`${statusColor.bg} ${statusColor.text} text-[11px] font-bold px-2 py-1 rounded shadow-md`}
        >
          {event.status}
        </span>
      }
      favoriteButton={logined && <FavoriteMeetupButton meetup={event} />}
      infoRows={
        <>
          <SummaryCardInfoRow
            icon="calendar_today"
            text={formatEventDate(event.dateInfo)}
          />
          <SummaryCardInfoRow icon="location_on" text={event.location} />
          <SummaryCardInfoRow
            icon="group"
            text={formatMemberCount(event.currentMembers, event.maxMembers)}
          />
        </>
      }
    />
  );
}
