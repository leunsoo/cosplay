import type { EventDetailDTO } from '../model';
import { mapEventDetailDtoToEventDetailWithUploader } from '../model';
import { EventHeader } from './EventHeader';
import { EventTabsSection } from './EventTabsSection';
import { EventAbout } from './EventAbout';
import { EventSchedule } from './EventSchedule';
import { EventLocation } from './EventLocation';
import { EventGroupChat } from './EventGroupChat';

interface EventDetailPageProps {
  eventId: string;
  event: EventDetailDTO;
}

export function EventDetailPage({ eventId, event: dto }: EventDetailPageProps) {
  const { event } = mapEventDetailDtoToEventDetailWithUploader(dto);

  return (
    <main className="flex-1 container-custom pt-8 md:pb-20">
      <div className="space-y-4 md:space-y-8">
        <EventHeader event={event} />

        <EventTabsSection
          detailsContent={
            <>
              <EventAbout description={event.description} />
              {event.schedules && event.schedules.length > 0 && (
                <EventSchedule schedules={event.schedules} />
              )}
              {event.location && <EventLocation location={event.location} />}
            </>
          }
          communityContent={
            <EventGroupChat eventId={eventId} eventStatus={event.status} />
          }
        />
      </div>
    </main>
  );
}
