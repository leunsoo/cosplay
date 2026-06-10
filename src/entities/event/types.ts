export interface EventDate {
  startDate: Date;
  endDate?: Date;
  startTime?: string; // "18:00" 형식
  endTime?: string;
  isRecurring: boolean;
  recurrencePattern?: 'WEEKLY' | 'MONTHLY';
}

export interface Organizer {
  name: string; // 주최자명 (예: "Comic World HQ")
  logoUrl?: string; // 로고 이미지 URL
  since?: string; // 설립년도 (예: "Since 1999")
  instagram?: string; // 인스타그램 링크
  twitter?: string; // 트위터/X 링크
  website?: string; // 공식 웹사이트
}

export interface EventFeature {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
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
  label?: string;
  buttonText?: string;
  buttonStyle?: 'default' | 'primary';
}

// 공식 행사 (리스트용)
export interface OfficialEvent extends BaseEvent {
  source: EventSource.OFFICIAL;
  category: string; // 게임, 애니메이션, 코스프레
  price: number;
  region?: string; // 넓은 지역 (서울, 경기 등)
  address?: string; // 상세 주소
  tags?: string[];
}

// 공식 행사 상세 (상세 페이지 전용)
export interface OfficialEventDetail extends OfficialEvent {
  description?: string; // 긴 설명 (About the Event)
  features?: EventFeature[]; // 행사 특징
  schedule?: Array<{
    // 일정표 (Schedule Highlights)
    time: string; // "10:00"
    title: string;
  }>;
  schedules?: Array<{
    content: string;
    date: string; // "2026-03-14"
    time: string; // "09:00"
  }>;
  organizer?: Organizer; // 주최자 정보
  officialWebsite?: string; // 공식 웹사이트
}

// 개인 행사(meetup)
export interface PersonalEvent extends BaseEvent {
  source: EventSource.PERSONAL;
  currentMembers: number;
  maxMembers: number;
}

// 리스트에서 사용하는 유니온 타입
export type Event = OfficialEvent | PersonalEvent;

// 타입 가드
export function isOfficialEvent(event: Event): event is OfficialEvent {
  return event.source === EventSource.OFFICIAL;
}

export function isPersonalEvent(event: Event): event is PersonalEvent {
  return event.source === EventSource.PERSONAL;
}
