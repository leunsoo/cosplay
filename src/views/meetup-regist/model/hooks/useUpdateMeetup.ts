import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/core/config/routes';
import { convertToWebp, uploadToS3 } from '@/shared/lib/imageUpload';
import { mapFormDataToCreateMeetupBody } from '../mapper';
import { getMeetupPresignedUrl, updateMeetup } from '../../api';
import type { MeetupFormData } from '../types';

export function useUpdateMeetup(meetupId?: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (formData: MeetupFormData) => {
      if (!meetupId) throw new Error('meetupId가 없습니다.');

      let thumbnailUrl: string | undefined;

      if (formData.thumbnailFile) {
        const res = await getMeetupPresignedUrl('thumbnail.webp');
        const { uploadUrl, imageUrl } = res.data;
        const webp = await convertToWebp(formData.thumbnailFile);
        await uploadToS3(uploadUrl, webp);
        thumbnailUrl = imageUrl;
      }

      const body = mapFormDataToCreateMeetupBody(formData, thumbnailUrl);
      return updateMeetup(meetupId, {
        ...body,
        thumbnailUrl: thumbnailUrl ?? formData.thumbnailPreview,
        locationDetail: body.locationDetail ?? '',
      });
    },
    onSuccess: () => {
      if (!meetupId) return;
      queryClient.invalidateQueries({ queryKey: ['meetup-detail', meetupId] });
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
