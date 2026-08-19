import { MeetupDetailPage } from '@/_pages/event/meetup-detail';

interface MeetupDetailRouteProps {
  params: Promise<{ meetupId: string }>;
}

export default async function MeetupDetailRoute({
  params,
}: MeetupDetailRouteProps) {
  const { meetupId } = await params;

  return <MeetupDetailPage meetupId={meetupId} />;
}
