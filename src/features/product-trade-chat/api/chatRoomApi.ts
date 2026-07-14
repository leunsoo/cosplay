import { apiClient, type ApiResponse } from '@/shared/api';
import {
  ChatRoomListDTOSchema,
  GetChatRoomListParamsSchema,
  CreateChatRoomBodySchema,
  CreateChatRoomDTOSchema,
  GetChatRoomParamsSchema,
  ChatRoomDetailDTOSchema,
  ResolveChatRoomParamsSchema,
  ResolveChatRoomDTOSchema,
  LeaveChatRoomParamsSchema,
  LeaveChatRoomBodySchema,
  type GetChatRoomListParams,
  type ChatRoomListDTO,
  type CreateChatRoomBody,
  type CreateChatRoomDTO,
  type GetChatRoomParams,
  type ChatRoomDetailDTO,
  type ResolveChatRoomParams,
  type ResolveChatRoomDTO,
  type LeaveChatRoomParams,
  type LeaveChatRoomBody,
} from '../model/schema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  mockChatRoomList,
  mockChatRoomDetails,
  resolveDemoChatRoom,
  createDemoChatRoom,
  leaveDemoChatRoom,
} from '@/mocks';

/**
 * 채팅방 목록 조회 API
 * @param params - 쿼리 파라미터 (userUuid)
 * @returns 채팅방 목록 (Zod로 검증됨)
 */
export const getChatRoomList = async (
  params: GetChatRoomListParams
): Promise<ApiResponse<ChatRoomListDTO>> => {
  const validatedParams = GetChatRoomListParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockChatRoomList };

  return apiClient.getWithValidation(
    '/api/v1/chat/rooms',
    ChatRoomListDTOSchema,
    {
      params: validatedParams,
    }
  );
};

/**
 * 채팅방 생성 API
 * @param body - 요청 본문 (productId, buyerUuid, sellerUuid)
 * @returns 생성된 채팅방 정보 (Zod로 검증됨)
 */
export const createChatRoom = async (
  body: CreateChatRoomBody
): Promise<ApiResponse<CreateChatRoomDTO>> => {
  const validatedBody = CreateChatRoomBodySchema.parse(body);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: createDemoChatRoom(validatedBody),
    };
  }

  return apiClient.postWithValidation(
    '/api/v1/chat/rooms',
    CreateChatRoomDTOSchema,
    validatedBody
  );
};

/**
 * 채팅방 단건 조회 API
 * @param params - 경로 파라미터 (roomId) 및 쿼리 파라미터 (userUuid)
 * @returns 채팅방 상세 정보 (Zod로 검증됨)
 */
export const getChatRoom = async (
  params: GetChatRoomParams
): Promise<ApiResponse<ChatRoomDetailDTO>> => {
  const validatedParams = GetChatRoomParamsSchema.parse(params);

  if (IS_DEMO) {
    const detail =
      mockChatRoomDetails[validatedParams.roomId] ?? mockChatRoomDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }

  return apiClient.getWithValidation(
    `/api/v1/chat/rooms/${validatedParams.roomId}`,
    ChatRoomDetailDTOSchema,
    {
      params: { userUuid: validatedParams.userUuid },
    }
  );
};

/**
 * 채팅방 존재 여부 확인 API
 * @param params - 쿼리 파라미터 (productId, buyerUuid, sellerUuid)
 * @returns 채팅방 존재 여부 및 roomId (Zod로 검증됨)
 */
export const resolveChatRoom = async (
  params: ResolveChatRoomParams
): Promise<ApiResponse<ResolveChatRoomDTO>> => {
  const validatedParams = ResolveChatRoomParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: resolveDemoChatRoom(validatedParams.productId),
    };

  return apiClient.getWithValidation(
    '/api/v1/chat/rooms/resolve',
    ResolveChatRoomDTOSchema,
    {
      params: validatedParams,
    }
  );
};

/**
 * 채팅방 나가기 API
 * @param params - 경로 파라미터 (roomId)
 * @param body - 요청 본문 (userUuid)
 */
export const leaveChatRoom = async (
  params: LeaveChatRoomParams,
  body: LeaveChatRoomBody
): Promise<void> => {
  const validatedParams = LeaveChatRoomParamsSchema.parse(params);
  const validatedBody = LeaveChatRoomBodySchema.parse(body);

  if (IS_DEMO) {
    leaveDemoChatRoom(validatedParams.roomId);
    return;
  }

  await apiClient.post(
    `/api/v1/chat/rooms/${validatedParams.roomId}/leave`,
    validatedBody
  );
};
