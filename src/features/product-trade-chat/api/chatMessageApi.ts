import { apiClient, type ApiResponse } from '@/shared/api';
import {
  GetChatMessagesParamsSchema,
  MessageListDTOSchema,
  MarkMessagesAsReadBodySchema,
  MarkMessagesAsReadDTOSchema,
  UploadChatImageBodySchema,
  UploadChatImageDTOSchema,
  type GetChatMessagesParams,
  type MessageListDTO,
  type MarkMessagesAsReadBody,
  type MarkMessagesAsReadDTO,
  type UploadChatImageBody,
  type UploadChatImageDTO,
} from '../model/schema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockChatMessages } from '@/mocks';

/**
 * 채팅방 메시지 목록 조회 API
 * @param params - 경로 파라미터 (roomId), 쿼리 파라미터 (userUuid, before)
 * @returns 메시지 목록 최신 50개 시간순 (Zod로 검증됨)
 */
export const getChatMessages = async (
  params: GetChatMessagesParams
): Promise<ApiResponse<MessageListDTO>> => {
  const { roomId, ...queryParams } = GetChatMessagesParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: mockChatMessages[roomId] ?? [],
    };

  return apiClient.getWithValidation(
    `/api/v1/chat/messages/room/${roomId}`,
    MessageListDTOSchema,
    { params: queryParams }
  );
};

/**
 * 채팅 메시지 읽음 처리 API
 * @param body - 요청 본문 (roomId, readerUuid)
 * @returns 읽음 처리 결과 (Zod로 검증됨)
 */
export const markMessagesAsRead = async (
  body: MarkMessagesAsReadBody
): Promise<ApiResponse<MarkMessagesAsReadDTO>> => {
  const validatedBody = MarkMessagesAsReadBodySchema.parse(body);

  return apiClient.patchWithValidation(
    '/api/v1/chat/messages/read',
    MarkMessagesAsReadDTOSchema,
    validatedBody
  );
};

/**
 * 채팅 이미지 업로드용 Pre-signed URL 발급 API
 * @param body - 요청 본문 (filename)
 * @returns uploadUrl (S3 PUT 업로드용), imageUrl (메시지 전송용)
 */
export const getChatImageUploadUrl = async (
  body: UploadChatImageBody
): Promise<ApiResponse<UploadChatImageDTO>> => {
  const validatedBody = UploadChatImageBodySchema.parse(body);

  return apiClient.postWithValidation(
    '/api/v1/chat/messages/image-upload-url',
    UploadChatImageDTOSchema,
    validatedBody
  );
};
