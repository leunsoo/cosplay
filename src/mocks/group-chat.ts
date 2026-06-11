import type { EventChatRoomDTO } from '@/features/event-group-chat/model/schema/getEventChatRoom';
import type { EventChatMessageListDTO } from '@/features/event-group-chat/model/schema/getEventChatMessages';
import type { EventChatActiveCountDTO } from '@/features/event-group-chat/model/schema/getEventChatActiveCount';
import type { MeetupChatRoomDTO } from '@/features/meetup-group-chat/model/schema/getMeetupChatRoom';
import type { MeetupChatMessageListDTO } from '@/features/meetup-group-chat/model/schema/getMeetupChatMessages';
import type { MeetupChatActiveCountDTO } from '@/features/meetup-group-chat/model/schema/getMeetupChatActiveCount';

export const mockEventChatRoom: EventChatRoomDTO = {
  roomId: 101,
  eventId: 1,
  status: 'ACTIVE',
};

export const mockEventChatMessages: EventChatMessageListDTO = [
  {
    id: 1,
    roomId: 101,
    eventId: 1,
    senderUuid: 'demo-user-uuid-0009',
    senderNickname: '조로코스',
    senderProfileImageUri: null,
    content: '코믹월드 기대됩니다! 작년보다 더 큰 행사가 될 것 같아요.',
    type: 'TEXT',
    createdAt: '2025-06-10T10:00:00',
  },
  {
    id: 2,
    roomId: 101,
    eventId: 1,
    senderUuid: 'demo-user-uuid-0010',
    senderNickname: '나미',
    senderProfileImageUri: null,
    content: '저도 진짜 기대돼요! 올해는 원피스 팀 코스 도전해볼 계획이에요',
    type: 'TEXT',
    createdAt: '2025-06-10T10:05:00',
  },
  {
    id: 3,
    roomId: 101,
    eventId: 1,
    senderUuid: 'demo-user-uuid-0011',
    senderNickname: '우솝이',
    senderProfileImageUri: null,
    content: '포토존 있나요? 예전에 줄이 너무 길었던 기억이...',
    type: 'TEXT',
    createdAt: '2025-06-10T10:08:00',
  },
  {
    id: 4,
    roomId: 101,
    eventId: 1,
    senderUuid: 'demo-user-uuid-0009',
    senderNickname: '조로코스',
    senderProfileImageUri: null,
    content: '포토존 3개 운영 예정이라고 했어요! 올해는 대기 덜 할 것 같음',
    type: 'TEXT',
    createdAt: '2025-06-10T10:10:00',
  },
  {
    id: 5,
    roomId: 101,
    eventId: 1,
    senderUuid: 'demo-user-uuid-0012',
    senderNickname: '상디코스',
    senderProfileImageUri: null,
    content: '다들 코스 완성됐나요? 저는 상디 의상 마지막 손질 중이에요',
    type: 'TEXT',
    createdAt: '2025-06-10T10:15:00',
  },
];

export const mockEventChatActiveCount: EventChatActiveCountDTO = {
  count: 47,
};

export const mockMeetupChatRoom: MeetupChatRoomDTO = {
  roomId: 201,
  meetupId: 1,
  status: 'ACTIVE',
};

export const mockMeetupChatMessages: MeetupChatMessageListDTO = [
  {
    id: 1,
    roomId: 201,
    meetupId: 1,
    senderUuid: 'demo-user-uuid-0001',
    senderNickname: '루피',
    senderProfileImageUri: 'https://picsum.photos/seed/user-luffy/100/100',
    content: '다들 오늘 밋업 준비 잘 되셨나요? 홍대 앞에서 2시에 만나요!',
    type: 'TEXT',
    createdAt: '2025-07-26T10:00:00',
  },
  {
    id: 2,
    roomId: 201,
    meetupId: 1,
    senderUuid: 'demo-user-uuid-0009',
    senderNickname: '조로코스',
    senderProfileImageUri: null,
    content: '네! 의상 다 챙겼어요 :) 2시에 홍대 놀이터 앞으로 갈게요',
    type: 'TEXT',
    createdAt: '2025-07-26T10:30:00',
  },
  {
    id: 3,
    roomId: 201,
    meetupId: 1,
    senderUuid: 'demo-user-uuid-0010',
    senderNickname: '나미',
    senderProfileImageUri: null,
    content: '저도 곧 출발할게요~ 기대됩니다!',
    type: 'TEXT',
    createdAt: '2025-07-26T11:00:00',
  },
];

export const mockMeetupChatActiveCount: MeetupChatActiveCountDTO = {
  count: 8,
};
