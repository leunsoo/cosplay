import type { SearchKeywordsDTO } from '@/entities/search-keywords/model/schema/getSearchKeywords';

export const mockSearchKeywords: SearchKeywordsDTO = {
  keywords: [
    { id: 1, keyword: '에렌 예거', searchedAt: '2025-06-11T10:00:00' },
    { id: 2, keyword: '코스프레 의상', searchedAt: '2025-06-10T15:00:00' },
    { id: 3, keyword: '원피스 루피', searchedAt: '2025-06-09T12:00:00' },
    { id: 4, keyword: '귀멸 탄지로', searchedAt: '2025-06-08T09:00:00' },
    { id: 5, keyword: '가발', searchedAt: '2025-06-07T18:00:00' },
  ],
};
