'use client';

import { usePathname, useParams } from 'next/navigation';
import { Sidebar } from '@/widgets/event-sidebar';
import { MeetUpParticipants } from '@/views/meetup-detail/ui';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const hideSidebar = pathname === '/meetup/register';
  const isMeetupDetail = /^\/meetup\/[^/]+$/.test(pathname);
  const meetupId = isMeetupDetail ? Number(params?.meetupId) : null;

  return (
    <div className="relative w-full">
      {children}
      {!hideSidebar && (
        <aside className="hidden lg:flex flex-col gap-4 fixed top-20 right-[calc((100vw-60vw)/2-17rem)] z-10 w-64">
          <Sidebar />
          {isMeetupDetail && meetupId && (
            <MeetUpParticipants meetupId={meetupId} />
          )}
        </aside>
      )}
    </div>
  );
}
