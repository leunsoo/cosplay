'use client';

import { useState } from 'react';
import { type MeetupFormData, INITIAL_FORM_DATA } from './meetup-form';

// 모임 등록/수정 폼의 필드 상태 관리 (등록·수정 여부와 무관)
//
// 상태에는 사용자가 실제로 변경한 필드(diff)만 두고, 화면에 보여줄 값은
// baseData와 매 렌더마다 병합해 계산한다. diff의 초기값은 baseData 로딩
// 여부와 무관하게 항상 빈 객체라서, baseData가 비동기로 나중에 채워져도
// 이 훅을 조기 return 이전에 무조건 호출할 수 있다.
export function useMeetupFormState(
  baseData: MeetupFormData = INITIAL_FORM_DATA
) {
  const [edits, setEdits] = useState<Partial<MeetupFormData>>({});
  const formData: MeetupFormData = { ...baseData, ...edits };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEdits((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: string) => {
    setEdits((prev) => ({ ...prev, eventDate: date }));
  };

  const handleTimeChange = (time: string) => {
    setEdits((prev) => ({ ...prev, eventTime: time }));
  };

  const handleImageUpload = (file: File, preview: string) => {
    setEdits((prev) => ({
      ...prev,
      thumbnailFile: file,
      thumbnailPreview: preview,
    }));
  };

  const handleImageRemove = () => {
    setEdits((prev) => ({
      ...prev,
      thumbnailFile: null,
      thumbnailPreview: '',
    }));
  };

  const handleLocationChange = (location: string) => {
    setEdits((prev) => ({ ...prev, location }));
  };

  return {
    formData,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleLocationChange,
  };
}
