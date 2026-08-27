export interface EventDate {
  startDate: string; // ISO 문자열 — Date 인스턴스로 만들면 서버→클라이언트 경계를 못 건넘
  endDate?: string;
  startTime?: string; // "18:00" 형식
  endTime?: string;
  isRecurring: boolean;
}

export enum EventStatus {
  ENDED = '종료됨',
  ONGOING = '진행중',
  UPCOMING = '예정',
}

export enum EventSource {
  OFFICIAL = 'OFFICIAL',
  PERSONAL = 'PERSONAL',
}

// 공식/개인 행사 공통 필드
interface BaseEvent {
  id: string;
  imageUrl: string;
  status: EventStatus;
  dateInfo: EventDate;
  title: string;
  location: string; // 상세 장소명
}

// 공식 행사 (리스트용)
export interface OfficialEvent extends BaseEvent {
  source: EventSource.OFFICIAL;
  category: string; // 게임, 애니메이션, 코스프레
  price: number;
  address?: string; // 상세 주소
  tags?: string[];
}

// 개인 행사(meetup)
export interface PersonalEvent extends BaseEvent {
  source: EventSource.PERSONAL;
  currentMembers: number;
  maxMembers: number;
}
