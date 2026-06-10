'use client';

import { use } from 'react';
import { MeetUpEditView } from '@/views/meetup-regist/MeetUpEditView';

interface MeetUpEditPageProps {
  params: Promise<{ meetupId: string }>;
}

export default function MeetUpEditPage({ params }: MeetUpEditPageProps) {
  const { meetupId } = use(params);
  return <MeetUpEditView meetupId={Number(meetupId)} />;
}
