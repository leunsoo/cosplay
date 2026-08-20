'use client';

import { use } from 'react';
import { MeetupEditPage } from '@/_pages/event/meetup-regist';

interface MeetupEditRouteProps {
  params: Promise<{ meetupId: string }>;
}

export default function MeetupEditRoute({ params }: MeetupEditRouteProps) {
  const { meetupId } = use(params);
  return <MeetupEditPage meetupId={Number(meetupId)} />;
}
