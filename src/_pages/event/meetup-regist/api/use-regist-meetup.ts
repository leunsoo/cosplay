import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mapFormDataToCreateMeetupBody } from './mapper';
import {
  MEETUP_QUERIES,
  createMeetup,
  getMeetupPresignedUrl,
} from '@/shared/api/endpoints/meetup';
import type { MeetupFormData } from '../model/meetup-form';

export function useRegistMeetup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (formData: MeetupFormData) => {
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
