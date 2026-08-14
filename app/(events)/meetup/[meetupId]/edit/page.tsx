'use client';

import { use } from 'react';
import { MeetUpEditPage } from '@/_pages/event/meetup-regist';

interface MeetUpEditRouteProps {
  params: Promise<{ meetupId: string }>;
}

export default function MeetUpEditRoute({ params }: MeetUpEditRouteProps) {
  const { meetupId } = use(params);
  return <MeetUpEditPage meetupId={Number(meetupId)} />;
}
