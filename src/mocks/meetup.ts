import type { MeetupListDTO } from '@/views/event-list/model/schema/getMeetupList';
import type { MeetupDetailDTO } from '@/views/meetup-detail/model/schema/getMeetupDetail';
import type { MeetupMembersDTO } from '@/views/meetup-detail/model/schema/getMeetupMembers';
import type { CreateMeetupBody } from '@/views/meetup-regist/model';
import { DEMO_USER_UUID, mockMyProfile } from './user';

export const mockMeetupList: MeetupListDTO = [
  {
    meetupId: 1,
    title: '원피스 코스프레 팬미팅 @ 홍대',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-onepiece/600/400',
    scheduledAt: '2025-07-26T14:00:00',
    location: '서울 홍대 공연장',
    maxMembers: 20,
    currentMembers: 13,
    status: 'ONGOING',
  },
  {
    meetupId: 2,
    title: '귀멸의 칼날 코스 야외 촬영 모임',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-demon/600/400',
    scheduledAt: '2025-08-02T10:00:00',
    location: '경기 용인 에버랜드 근처',
    maxMembers: 15,
    currentMembers: 9,
    status: 'ONGOING',
  },
  {
    meetupId: 3,
    title: '건담 코스프레 & 프라모델 오프',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-gundam/600/400',
    scheduledAt: '2025-05-17T13:00:00',
    location: '서울 종로 카페',
    maxMembers: 12,
    currentMembers: 12,
    status: 'CLOSED',
  },
  {
    meetupId: 4,
    title: '페르소나 5 캐릭터 코스오프',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-persona/600/400',
    scheduledAt: '2025-07-12T15:00:00',
    location: '서울 강남 스튜디오',
    maxMembers: 10,
    currentMembers: 7,
    status: 'ONGOING',
  },
  {
    meetupId: 5,
    title: '스파이×패밀리 코스프레 팬오프',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-spyfam/600/400',
    scheduledAt: '2025-08-09T12:00:00',
    location: '서울 마포 공원',
    maxMembers: 16,
    currentMembers: 11,
    status: 'ONGOING',
  },
  {
    meetupId: 6,
    title: '주술회전 코스프레 오프라인 모임',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-jujutsu/600/400',
    scheduledAt: '2025-04-26T14:00:00',
    location: '서울 이태원 루프탑 카페',
    maxMembers: 10,
    currentMembers: 10,
    status: 'CLOSED',
  },
  {
    meetupId: 7,
    title: '이세계 이야기 (리제로) 코스오프',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-rezero/600/400',
    scheduledAt: '2025-09-13T13:00:00',
    location: '인천 송도 센트럴파크',
    maxMembers: 18,
    currentMembers: 5,
    status: 'ONGOING',
  },
  {
    meetupId: 8,
    title: '롤 챔피언 코스프레 대규모 오프',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-lol/600/400',
    scheduledAt: '2025-06-07T11:00:00',
    location: '부산 BEXCO',
    maxMembers: 30,
    currentMembers: 30,
    status: 'CLOSED',
  },
];

export const mockMeetupDetails: Record<number, MeetupDetailDTO> = {
  1: {
    meetupId: 1,
    host: {
      uuid: 'demo-user-uuid-0001',
      nickname: '루피짱',
      profileImageUrl: 'https://picsum.photos/seed/user-luffy/100/100',
    },
    title: '원피스 코스프레 팬미팅 @ 홍대',
    description:
      '원피스 팬이라면 누구나 환영합니다! 코스프레 의상을 입고 오시거나 사복으로도 참가 가능합니다. 함께 사진도 찍고 원피스 이야기도 나눠요. 당일 포토존 및 간식 제공 예정입니다.',
    scheduledAt: '2025-07-26T14:00:00',
    location: '서울 홍대',
    locationDetail: '홍대 놀이터 앞 카페',
    maxMembers: 20,
    currentMembers: 13,
    status: 'ONGOING',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-onepiece/600/400',
    createdAt: '2025-06-15T09:00:00',
  },
  2: {
    meetupId: 2,
    host: {
      uuid: 'demo-user-uuid-0002',
      nickname: '탄지로코스',
      profileImageUrl: null,
    },
    title: '귀멸의 칼날 코스 야외 촬영 모임',
    description:
      '귀멸의 칼날 코스프레 야외 촬영 모임입니다. 아름다운 자연 배경에서 멋진 코스프레 사진을 찍어봐요. 촬영 후 근처 식당에서 식사도 함께 할 예정입니다. 카메라 지참 환영!',
    scheduledAt: '2025-08-02T10:00:00',
    location: '경기 용인',
    locationDetail: '에버랜드 근처 공원',
    maxMembers: 15,
    currentMembers: 9,
    status: 'ONGOING',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-demon/600/400',
    createdAt: '2025-07-01T10:00:00',
  },
  3: {
    meetupId: 3,
    host: {
      uuid: 'demo-user-uuid-0003',
      nickname: '가브리엘',
      profileImageUrl: null,
    },
    title: '건담 코스프레 & 프라모델 오프',
    description:
      '건담 코스프레와 프라모델을 함께 즐기는 오프라인 모임입니다. 행사 종료 후 건담 카페 방문도 계획 중입니다.',
    scheduledAt: '2025-05-17T13:00:00',
    location: '서울 종로',
    locationDetail: null,
    maxMembers: 12,
    currentMembers: 12,
    status: 'CLOSED',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-gundam/600/400',
    createdAt: '2025-04-20T08:00:00',
  },
  4: {
    meetupId: 4,
    host: {
      uuid: 'demo-user-uuid-0004',
      nickname: '조커코스',
      profileImageUrl: 'https://picsum.photos/seed/user-joker/100/100',
    },
    title: '페르소나 5 캐릭터 코스오프',
    description:
      '페르소나 5 & 페르소나 5 로얄 캐릭터 코스프레 모임입니다. 팬텀 도둑단 멤버 코스 특히 환영합니다. 스튜디오에서 공식 느낌 사진 촬영 예정.',
    scheduledAt: '2025-07-12T15:00:00',
    location: '서울 강남',
    locationDetail: '강남 스튜디오 3층',
    maxMembers: 10,
    currentMembers: 7,
    status: 'ONGOING',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-persona/600/400',
    createdAt: '2025-06-20T11:00:00',
  },
  5: {
    meetupId: 5,
    host: {
      uuid: 'demo-user-uuid-0005',
      nickname: '로이드포저',
      profileImageUrl: null,
    },
    title: '스파이×패밀리 코스프레 팬오프',
    description:
      '스파이×패밀리 캐릭터 코스프레 야외 모임! 로이드, 요르, 아냐 등 인기 캐릭터 코스 모두 환영합니다. 공원에서 자유롭게 즐기는 가벼운 오프 모임입니다.',
    scheduledAt: '2025-08-09T12:00:00',
    location: '서울 마포',
    locationDetail: '마포 한강공원 물빛광장',
    maxMembers: 16,
    currentMembers: 11,
    status: 'ONGOING',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-spyfam/600/400',
    createdAt: '2025-07-10T14:00:00',
  },
  6: {
    meetupId: 6,
    host: {
      uuid: 'demo-user-uuid-0006',
      nickname: '고죠선생',
      profileImageUrl: null,
    },
    title: '주술회전 코스프레 오프라인 모임',
    description:
      '주술회전 1기, 2기 캐릭터 코스프레 모임입니다. 루프탑에서 멋진 사진 촬영 후 저녁 식사를 함께 합니다.',
    scheduledAt: '2025-04-26T14:00:00',
    location: '서울 이태원',
    locationDetail: '이태원 루프탑 카페 COSPLAY',
    maxMembers: 10,
    currentMembers: 10,
    status: 'CLOSED',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-jujutsu/600/400',
    createdAt: '2025-04-01T09:00:00',
  },
  7: {
    meetupId: 7,
    host: {
      uuid: 'demo-user-uuid-0007',
      nickname: '에밀리아짱',
      profileImageUrl: null,
    },
    title: '이세계 이야기 (리제로) 코스오프',
    description:
      '리제로 캐릭터 코스프레 모임입니다. 에밀리아, 렘, 람, 베아트리스, 서브루 등 인기 캐릭터 코스 모두 환영합니다.',
    scheduledAt: '2025-09-13T13:00:00',
    location: '인천 송도',
    locationDetail: '송도 센트럴파크 카페 거리',
    maxMembers: 18,
    currentMembers: 5,
    status: 'ONGOING',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-rezero/600/400',
    createdAt: '2025-08-01T10:00:00',
  },
  8: {
    meetupId: 8,
    host: {
      uuid: 'demo-user-uuid-0008',
      nickname: '야스오코스',
      profileImageUrl: null,
    },
    title: '롤 챔피언 코스프레 대규모 오프',
    description:
      '리그 오브 레전드 챔피언 코스프레 대규모 오프라인 모임입니다. 이번 행사는 BEXCO와 함께 진행됩니다.',
    scheduledAt: '2025-06-07T11:00:00',
    location: '부산 BEXCO',
    locationDetail: '제2전시장 앞 광장',
    maxMembers: 30,
    currentMembers: 30,
    status: 'CLOSED',
    thumbnailUrl: 'https://picsum.photos/seed/meetup-lol/600/400',
    createdAt: '2025-05-01T08:00:00',
  },
};

export const mockMeetupMembers: Record<number, MeetupMembersDTO> = {
  1: [
    {
      user: {
        uuid: 'demo-user-uuid-0001',
        nickname: '루피짱',
        profileImageUrl: 'https://picsum.photos/seed/user-luffy/100/100',
      },
      joinedAt: '2025-06-15T09:00:00',
    },
    {
      user: {
        uuid: 'demo-user-uuid-0009',
        nickname: '조로코스',
        profileImageUrl: null,
      },
      joinedAt: '2025-06-16T10:00:00',
    },
    {
      user: {
        uuid: 'demo-user-uuid-0010',
        nickname: '나미짱',
        profileImageUrl: null,
      },
      joinedAt: '2025-06-17T11:00:00',
    },
    {
      user: {
        uuid: 'demo-user-uuid-0011',
        nickname: '우솝이',
        profileImageUrl: null,
      },
      joinedAt: '2025-06-18T12:00:00',
    },
    {
      user: {
        uuid: 'demo-user-uuid-0012',
        nickname: '상디코스',
        profileImageUrl: null,
      },
      joinedAt: '2025-06-20T09:00:00',
    },
  ],
  2: [
    {
      user: {
        uuid: 'demo-user-uuid-0002',
        nickname: '탄지로코스',
        profileImageUrl: null,
      },
      joinedAt: '2025-07-01T10:00:00',
    },
    {
      user: {
        uuid: 'demo-user-uuid-0013',
        nickname: '네즈코짱',
        profileImageUrl: null,
      },
      joinedAt: '2025-07-02T11:00:00',
    },
    {
      user: {
        uuid: 'demo-user-uuid-0014',
        nickname: '젠이츠',
        profileImageUrl: null,
      },
      joinedAt: '2025-07-03T09:00:00',
    },
  ],
};

export function getDemoMeetupMembers(meetupId: number): MeetupMembersDTO {
  return mockMeetupMembers[meetupId] ?? [];
}

export function joinDemoMeetup(meetupId: number): void {
  const members = (mockMeetupMembers[meetupId] ??= []);
  if (members.some((m) => m.user.uuid === DEMO_USER_UUID)) return;

  members.push({
    user: {
      uuid: DEMO_USER_UUID,
      nickname: mockMyProfile.nickname ?? '데모유저',
      profileImageUrl: mockMyProfile.profileImageUri ?? null,
    },
    joinedAt: new Date().toISOString(),
  });
}

export function leaveDemoMeetup(meetupId: number): void {
  const members = mockMeetupMembers[meetupId];
  if (!members) return;

  mockMeetupMembers[meetupId] = members.filter(
    (m) => m.user.uuid !== DEMO_USER_UUID
  );
}

function getNextDemoMeetupId(): number {
  const ids = mockMeetupList.map((meetup) => meetup.meetupId);
  return (ids.length > 0 ? Math.max(...ids) : 0) + 1;
}

export function createDemoMeetup(body: CreateMeetupBody): number {
  const meetupId = getNextDemoMeetupId();
  const now = new Date().toISOString();

  const detail: MeetupDetailDTO = {
    meetupId,
    host: {
      uuid: DEMO_USER_UUID,
      nickname: mockMyProfile.nickname ?? '데모유저',
      profileImageUrl: mockMyProfile.profileImageUri ?? null,
    },
    title: body.title,
    description: body.description,
    scheduledAt: body.scheduledAt,
    location: body.location,
    locationDetail: body.locationDetail,
    maxMembers: body.maxMembers,
    currentMembers: 1,
    status: 'ONGOING',
    thumbnailUrl: body.thumbnailUrl ?? null,
    createdAt: now,
  };

  mockMeetupDetails[meetupId] = detail;
  mockMeetupList.push({
    meetupId,
    title: detail.title,
    thumbnailUrl: detail.thumbnailUrl ?? null,
    scheduledAt: detail.scheduledAt,
    location: detail.location,
    maxMembers: detail.maxMembers,
    currentMembers: detail.currentMembers,
    status: 'ONGOING',
  });
  mockMeetupMembers[meetupId] = [
    {
      user: detail.host,
      joinedAt: now,
    },
  ];

  return meetupId;
}

export function updateDemoMeetup(
  meetupId: number,
  body: CreateMeetupBody & { thumbnailUrl: string; locationDetail: string }
): void {
  const existing = mockMeetupDetails[meetupId];
  if (!existing) return;

  const updated: MeetupDetailDTO = {
    ...existing,
    title: body.title,
    description: body.description,
    scheduledAt: body.scheduledAt,
    location: body.location,
    locationDetail: body.locationDetail,
    maxMembers: body.maxMembers,
    thumbnailUrl: body.thumbnailUrl,
  };
  mockMeetupDetails[meetupId] = updated;

  const listIndex = mockMeetupList.findIndex((m) => m.meetupId === meetupId);
  if (listIndex !== -1) {
    mockMeetupList[listIndex] = {
      ...mockMeetupList[listIndex],
      title: updated.title,
      thumbnailUrl: updated.thumbnailUrl ?? null,
      scheduledAt: updated.scheduledAt,
      location: updated.location,
      maxMembers: updated.maxMembers,
    };
  }
}
