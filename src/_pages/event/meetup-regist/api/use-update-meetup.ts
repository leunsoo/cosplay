import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { apiClient, type ApiResponse } from '@/shared/api';
import { updateDemoMeetup } from '@/mocks';
import { mapFormDataToCreateMeetupBody } from './mapper';
import { MEETUP_QUERIES } from '@/shared/api/meetup';
import { getMeetupPresignedUrl } from './get-meetup-presigned-url';
import type { CreateMeetupBody } from './use-regist-meetup';
import type { MeetupFormData } from '../model/meetup-form';
import { IS_DEMO } from '@/shared/lib/isDemo';

const updateMeetup = (
  meetupId: number,
  body: CreateMeetupBody & { thumbnailUrl: string; locationDetail: string }
): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    updateDemoMeetup(meetupId, body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.put(`/api/v1/meetups/${meetupId}`, body);
};

export function useUpdateMeetup(meetupId?: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (formData: MeetupFormData) => {
      if (!meetupId) throw new Error('meetupId가 없습니다.');

      let thumbnailUrl: string | undefined;

      if (formData.thumbnailFile) {
        if (IS_DEMO) {
          // 데모 모드: 실제 업로드 없이 로컬 미리보기 URL 사용
          thumbnailUrl = URL.createObjectURL(formData.thumbnailFile);
        } else {
          const res = await getMeetupPresignedUrl('thumbnail.webp');
          const { uploadUrl, imageUrl } = res.data;
          const webp = await convertToWebp(formData.thumbnailFile);
          await uploadToS3(uploadUrl, webp);
          thumbnailUrl = imageUrl;
        }
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
