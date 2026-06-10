import { MeetUpDetailView } from '@/views/meetup-detail/MeetUpDetailView';

interface MeetUpDetailPageProps {
  params: Promise<{ meetupId: string }>;
}

export default async function MeetUpDetailPage({
  params,
}: MeetUpDetailPageProps) {
  const { meetupId } = await params;

  return <MeetUpDetailView meetupId={meetupId} />;
}
