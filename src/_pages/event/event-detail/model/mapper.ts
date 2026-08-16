import type { EventDetailDTO } from './schema';
import { EventStatus, EventSource } from '@/entities/event';
import type { OfficialEventDetail } from './event';

const statusMap: Record<'UPCOMING' | 'ONGOING' | 'CLOSED', EventStatus> = {
  UPCOMING: EventStatus.UPCOMING,
  ONGOING: EventStatus.ONGOING,
  CLOSED: EventStatus.ENDED,
};

export interface EventDetailWithUploader {
  event: OfficialEventDetail;
  // uploader: {
  //   uploaderUuid: string;
  //   nickname: string;
  //   profileImageUrl: string | null;
  // } | null;
  recommended: boolean;
}

export function mapEventDetailDtoToEventDetailWithUploader(
  dto: EventDetailDTO
): EventDetailWithUploader {
  const event: OfficialEventDetail = {
    id: String(dto.eventId),
    imageUrl: dto.thumbnailUrl,
    category: dto.category,
    dateInfo: {
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isRecurring: false,
    },
    title: dto.title,
    location: dto.location,
    address: dto.locationDetail ?? undefined,
    status: statusMap[dto.status],
    source: EventSource.OFFICIAL,
    price: dto.price,
    description: dto.description ?? undefined,
    schedules: dto.schedules ?? undefined,
  };

  return {
    event,
    // uploader: dto.uploader
    //   ? {
    //       uploaderUuid: dto.uploader.uuid,
    //       nickname: dto.uploader.nickname,
    //       profileImageUrl: dto.uploader.profileImageUrl,
    //     }
    //   : null,
    recommended: dto.recommended,
  };
}
