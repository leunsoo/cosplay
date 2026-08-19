import type {
  NoticeList,
  NoticeDetail,
} from '@/shared/api/endpoints/notice/notice';
import type { QnaList, QnaDetail } from '@/shared/api/endpoints/qna/qna';
import { mockMyProfile } from './user';

export const mockNoticeList: NoticeList = [
  {
    id: 1,
    title: '[공지] LLOWA 서비스 이용 약관 개정 안내',
    isImportant: true,
    viewCount: 1204,
    createdAt: '2025-05-20T10:00:00',
  },
  {
    id: 2,
    title: '[공지] 행사 정보 등록 가이드라인 업데이트',
    isImportant: true,
    viewCount: 876,
    createdAt: '2025-05-15T09:00:00',
  },
  {
    id: 3,
    title: '[안내] 코믹월드 2025 서울 행사 정보 등록 완료',
    isImportant: false,
    viewCount: 543,
    createdAt: '2025-05-10T14:00:00',
  },
  {
    id: 4,
    title: '[안내] 마켓 서비스 점검 안내 (6/1 새벽 2시~4시)',
    isImportant: false,
    viewCount: 312,
    createdAt: '2025-05-28T16:00:00',
  },
  {
    id: 5,
    title: '[이벤트] LLOWA 오픈 기념 이벤트 당첨자 발표',
    isImportant: false,
    viewCount: 921,
    createdAt: '2025-04-30T12:00:00',
  },
];

export const mockNoticeDetails: Record<number, NoticeDetail> = {
  1: {
    id: 1,
    title: '[공지] LLOWA 서비스 이용 약관 개정 안내',
    isImportant: true,
    viewCount: 1204,
    createdAt: '2025-05-20T10:00:00',
    content: `안녕하세요, LLOWA 운영팀입니다.

2025년 6월 1일부터 서비스 이용 약관이 일부 개정됩니다.

**주요 변경 사항**

1. 개인정보 처리방침 제3조 (수집 항목) 변경
2. 마켓 서비스 이용 조건 추가
3. 금지 행위 항목 구체화

변경된 약관은 2025년 6월 1일부터 적용됩니다.
기존 회원은 변경 약관에 동의한 것으로 간주됩니다.

문의 사항이 있으시면 고객센터로 연락해 주세요.

감사합니다.`,
  },
  2: {
    id: 2,
    title: '[공지] 행사 정보 등록 가이드라인 업데이트',
    isImportant: true,
    viewCount: 876,
    createdAt: '2025-05-15T09:00:00',
    content: `LLOWA 행사 정보 등록 가이드라인이 업데이트되었습니다.

**업데이트 내용**
- 행사 썸네일 이미지 권장 사이즈: 800x600px (4:3 비율)
- 행사 설명 최소 50자 이상 작성 필수
- 위치 정보는 지도에서 정확히 핀 설정 권장
- 허위 정보 등록 시 계정 제재 가능

더 많은 정보는 FAQ를 참고해 주세요.`,
  },
  3: {
    id: 3,
    title: '[안내] 코믹월드 2025 서울 행사 정보 등록 완료',
    isImportant: false,
    viewCount: 543,
    createdAt: '2025-05-10T14:00:00',
    content: `코믹월드 2025 서울 행사 정보가 LLOWA에 등록되었습니다.

행사 일정: 2025년 8월 2일 ~ 3일
장소: 서울 COEX 전시홀

자세한 내용은 행사 상세 페이지를 확인해 주세요!`,
  },
  4: {
    id: 4,
    title: '[안내] 마켓 서비스 점검 안내 (6/1 새벽 2시~4시)',
    isImportant: false,
    viewCount: 312,
    createdAt: '2025-05-28T16:00:00',
    content: `안정적인 서비스 제공을 위한 정기 점검이 진행됩니다.

점검 일시: 2025년 6월 1일 (일) 새벽 2:00 ~ 4:00
점검 범위: 마켓 서비스 전체 (상품 조회, 채팅 포함)

점검 시간 동안에는 서비스 이용이 제한됩니다.
불편을 드려 죄송합니다.`,
  },
  5: {
    id: 5,
    title: '[이벤트] LLOWA 오픈 기념 이벤트 당첨자 발표',
    isImportant: false,
    viewCount: 921,
    createdAt: '2025-04-30T12:00:00',
    content: `LLOWA 오픈 기념 이벤트에 참여해 주신 모든 분들께 감사드립니다.

당첨자 명단은 개인 DM으로 발송되었습니다.
상품 수령은 2025년 5월 7일까지 확인 부탁드립니다.`,
  },
};

export const mockQnaList: QnaList = [
  {
    id: 1,
    inquirer: '코스짱',
    title: '행사 정보를 직접 등록할 수 있나요?',
    isAnswer: true,
    updatedAt: '2025-05-22T14:00:00',
  },
  {
    id: 2,
    inquirer: '루피팬',
    title: '마켓에서 의상을 팔려면 어떻게 하나요?',
    isAnswer: true,
    updatedAt: '2025-05-20T10:00:00',
  },
  {
    id: 3,
    inquirer: '코스입문자',
    title: '처음 코스프레를 시작하려는데 어디서 의상을 구할 수 있나요?',
    isAnswer: false,
    updatedAt: '2025-05-25T09:00:00',
  },
  {
    id: 4,
    inquirer: '사진가',
    title: '코스프레 촬영 의뢰는 어디서 할 수 있나요?',
    isAnswer: true,
    updatedAt: '2025-05-18T16:00:00',
  },
  {
    id: 5,
    inquirer: '밋업주최',
    title: '개인 행사(밋업) 참가 인원은 최대 몇 명까지 설정할 수 있나요?',
    isAnswer: false,
    updatedAt: '2025-05-26T11:00:00',
  },
];

export const mockQnaDetails: Record<number, QnaDetail> = {
  1: {
    id: 1,
    inquirer: '코스짱',
    title: '행사 정보를 직접 등록할 수 있나요?',
    content:
      '안녕하세요! LLOWA에서 공식 행사 외에 개인이 주최하는 코스프레 행사도 등록할 수 있는지 궁금합니다. 직접 행사를 등록해서 참가자를 모집할 수 있으면 좋겠어요.',
    answer:
      '안녕하세요, LLOWA 운영팀입니다!\n\n네, 개인 주최 행사(밋업)는 [행사 탭 > 개인 탭 > 밋업 등록] 버튼을 통해 직접 등록하실 수 있습니다.\n\n공식 행사(코믹월드 등)는 운영팀에서 직접 등록하며, 개인 등록은 불가능합니다.\n\n감사합니다.',
    answerAt: '2025-05-22T14:00:00',
    updatedAt: '2025-05-22T14:00:00',
  },
  2: {
    id: 2,
    inquirer: '루피팬',
    title: '마켓에서 의상을 팔려면 어떻게 하나요?',
    content:
      '코스프레 의상을 몇 개 팔려고 하는데, LLOWA 마켓에서 판매하는 방법을 알고 싶습니다. 수수료는 없나요?',
    answer:
      '안녕하세요!\n\n마켓 판매는 [마켓 탭 > 상품 등록] 버튼을 통해 등록하실 수 있습니다.\n\n현재 판매 수수료는 없으며, 구매자와 판매자가 직접 거래하는 개인 간 거래 방식입니다. 거래 관련 분쟁은 LLOWA가 책임지지 않으니 유의해 주세요.\n\n감사합니다.',
    answerAt: '2025-05-20T10:00:00',
    updatedAt: '2025-05-20T10:00:00',
  },
  3: {
    id: 3,
    inquirer: '코스입문자',
    title: '처음 코스프레를 시작하려는데 어디서 의상을 구할 수 있나요?',
    content:
      '코스프레를 처음 시작하려고 합니다. 의상은 어디서 구매하면 좋을까요? LLOWA 마켓에서도 의상을 살 수 있나요?',
    answer: null,
    answerAt: null,
    updatedAt: '2025-05-25T09:00:00',
  },
  4: {
    id: 4,
    inquirer: '사진가',
    title: '코스프레 촬영 의뢰는 어디서 할 수 있나요?',
    content:
      '코스프레 전문 사진가에게 촬영을 의뢰하고 싶은데, LLOWA에서 촬영 의뢰 기능이 있는지 궁금합니다.',
    answer:
      '안녕하세요!\n\n현재 LLOWA에는 전문 촬영 의뢰 기능이 없습니다. 다만 커뮤니티 Q&A 게시판을 통해 촬영 의뢰를 요청하시거나, 마켓에서 서비스 형태로 등록하는 경우도 있으니 참고해 주세요.\n\n향후 촬영 매칭 서비스 도입을 검토 중입니다. 감사합니다.',
    answerAt: '2025-05-18T16:00:00',
    updatedAt: '2025-05-18T16:00:00',
  },
  5: {
    id: 5,
    inquirer: '밋업주최',
    title: '개인 행사(밋업) 참가 인원은 최대 몇 명까지 설정할 수 있나요?',
    content:
      '밋업을 주최하려고 하는데, 참가 인원을 최대 몇 명까지 설정할 수 있는지 궁금합니다. 큰 규모의 오프 모임을 계획 중입니다.',
    answer: null,
    answerAt: null,
    updatedAt: '2025-05-26T11:00:00',
  },
};

function getNextDemoQnaId(): number {
  const ids = mockQnaList.map((post) => post.id);
  return (ids.length > 0 ? Math.max(...ids) : 0) + 1;
}

export function createDemoQna(body: {
  title: string;
  content: string;
}): number {
  const id = getNextDemoQnaId();
  const now = new Date().toISOString();
  const inquirer = mockMyProfile.nickname ?? '데모유저';

  mockQnaDetails[id] = {
    id,
    inquirer,
    title: body.title,
    content: body.content,
    answer: null,
    answerAt: null,
    updatedAt: now,
  };
  mockQnaList.unshift({
    id,
    inquirer,
    title: body.title,
    isAnswer: false,
    updatedAt: now,
  });

  return id;
}

export function updateDemoQna(body: {
  id: number;
  title: string;
  content: string;
}): void {
  const existing = mockQnaDetails[body.id];
  if (!existing) return;

  const now = new Date().toISOString();
  mockQnaDetails[body.id] = {
    ...existing,
    title: body.title,
    content: body.content,
    updatedAt: now,
  };

  const listIndex = mockQnaList.findIndex((post) => post.id === body.id);
  if (listIndex !== -1) {
    mockQnaList[listIndex] = {
      ...mockQnaList[listIndex],
      title: body.title,
      updatedAt: now,
    };
  }
}

export function deleteDemoQna(qnaPostId: number): void {
  delete mockQnaDetails[qnaPostId];

  const listIndex = mockQnaList.findIndex((post) => post.id === qnaPostId);
  if (listIndex !== -1) mockQnaList.splice(listIndex, 1);
}
