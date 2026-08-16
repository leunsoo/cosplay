import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useProductSearch() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (searchKeyword?: string) => {
    const target = (searchKeyword ?? keyword).trim();
    if (!target) return;

    const params = new URLSearchParams({ keyword: target, page: '1' });
    router.push(`/market?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return { keyword, setKeyword, handleSearch, handleKeyDown };
}
