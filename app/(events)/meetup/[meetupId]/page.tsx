import { MeetUpDetailPage } from '@/_pages/event/meetup-detail';

interface MeetUpDetailRouteProps {
  params: Promise<{ meetupId: string }>;
}

export default async function MeetUpDetailRoute({
  params,
}: MeetUpDetailRouteProps) {
  const { meetupId } = await params;

  return <MeetUpDetailPage meetupId={meetupId} />;
}
