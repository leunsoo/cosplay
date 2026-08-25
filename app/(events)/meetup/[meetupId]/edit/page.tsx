import { MeetupEditPage } from '@/_pages/event/meetup-regist';

interface MeetupEditRouteProps {
  params: Promise<{ meetupId: string }>;
}

export default async function MeetupEditRoute({
  params,
}: MeetupEditRouteProps) {
  const { meetupId } = await params;
  return <MeetupEditPage meetupId={Number(meetupId)} />;
}
