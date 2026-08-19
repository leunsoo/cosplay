import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { mapFormDataToCreateMeetupBody } from './mapper';
import { uploadThumbnail } from './upload-thumbnail';
import { MEETUP_QUERIES, updateMeetup } from '@/shared/api/endpoints/meetup';
import type { MeetupFormData } from '../model/meetup-form';

export function useUpdateMeetup(meetupId?: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (formData: MeetupFormData) => {
      if (!meetupId) throw new Error('meetupId가 없습니다.');

      const thumbnailUrl = formData.thumbnailFile
        ? await uploadThumbnail(formData.thumbnailFile)
        : undefined;

      const body = mapFormDataToCreateMeetupBody(formData, thumbnailUrl);
      return updateMeetup(meetupId, {
        ...body,
        thumbnailUrl: thumbnailUrl ?? formData.thumbnailPreview,
        locationDetail: body.locationDetail ?? '',
      });
    },
    onSuccess: () => {
      if (!meetupId) return;
      queryClient.invalidateQueries({
        queryKey: MEETUP_QUERIES.detail(meetupId).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: MEETUP_QUERIES.all() });
      alert('모임이 수정되었습니다.');
      router.push(ROUTES.MEETUP.DETAIL(meetupId));
    },
    onError: (error) => {
      console.error('모임 수정 실패:', error);
      alert('모임 수정에 실패했습니다.');
    },
  });

  return { update, isPending };
}
