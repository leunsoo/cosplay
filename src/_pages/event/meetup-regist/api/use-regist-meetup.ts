import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { mapFormDataToCreateMeetupBody } from './mapper';
import { uploadThumbnail } from './upload-thumbnail';
import { MEETUP_QUERIES, createMeetup } from '@/shared/api/endpoints/meetup';
import type { MeetupFormData } from '../model/meetup-form';

export function useRegistMeetup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (formData: MeetupFormData) => {
      const thumbnailUrl = formData.thumbnailFile
        ? await uploadThumbnail(formData.thumbnailFile)
        : undefined;

      const body = mapFormDataToCreateMeetupBody(formData, thumbnailUrl);
      return createMeetup(body);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: MEETUP_QUERIES.all() });
      alert('모임이 등록되었습니다.');
      router.push(ROUTES.MEETUP.DETAIL(res.data));
    },
    onError: (error) => {
      console.error('모임 등록 실패:', error);
      alert('모임 등록에 실패했습니다.');
    },
  });

  return { submit, isPending };
}
