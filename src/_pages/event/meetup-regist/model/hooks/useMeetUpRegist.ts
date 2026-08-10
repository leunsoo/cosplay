import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { mapFormDataToCreateMeetupBody } from '../mapper';
import { getMeetupPresignedUrl, createMeetup } from '../../api';
import type { MeetupFormData } from '../types';
import { IS_DEMO } from '@/shared/lib/isDemo';

export function useMeetUpRegist() {
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
      queryClient.invalidateQueries({ queryKey: ['meetups'] });
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
