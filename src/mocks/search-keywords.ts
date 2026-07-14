import type { SearchKeywordsDTO } from '@/entities/search-keywords/model/schema/getSearchKeywords';

// 데모 모드 최근 검색어 상태 (메모리 유지, 새로고침 시 초기화)
// 최신 검색이 앞에 오도록 배열 순서 자체로 관리한다.
const demoSearchKeywords: {
  id: number;
  keyword: string;
  searchedAt: string;
}[] = [
  { id: 1, keyword: '에렌 예거', searchedAt: '2025-06-11T10:00:00' },
  { id: 2, keyword: '코스프레 의상', searchedAt: '2025-06-10T15:00:00' },
  { id: 3, keyword: '원피스 루피', searchedAt: '2025-06-09T12:00:00' },
  { id: 4, keyword: '귀멸 탄지로', searchedAt: '2025-06-08T09:00:00' },
  { id: 5, keyword: '가발', searchedAt: '2025-06-07T18:00:00' },
];

export function getDemoSearchKeywords(): SearchKeywordsDTO {
  return { keywords: demoSearchKeywords.map((k) => ({ ...k })) };
}

export function addDemoSearchKeyword(keyword: string): void {
  const trimmed = keyword.trim();
  if (!trimmed) return;

  const existingIndex = demoSearchKeywords.findIndex(
    (k) => k.keyword === trimmed
  );
  if (existingIndex !== -1) demoSearchKeywords.splice(existingIndex, 1);

  const nextId =
    demoSearchKeywords.length > 0
      ? Math.max(...demoSearchKeywords.map((k) => k.id)) + 1
      : 1;

  demoSearchKeywords.unshift({
    id: nextId,
    keyword: trimmed,
    searchedAt: new Date().toISOString(),
  });
}

export function removeDemoSearchKeyword(keywordId: number): void {
  const index = demoSearchKeywords.findIndex((k) => k.id === keywordId);
  if (index !== -1) demoSearchKeywords.splice(index, 1);
}

export function clearDemoSearchKeywords(): void {
  demoSearchKeywords.length = 0;
}
