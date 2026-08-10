import { eventHandlers } from './event';
import { productHandlers } from './product';

// 새 도메인을 추가할 때:
// 1. handlers/<domain>.ts 에 http.get/post/... 핸들러 배열을 export
//    (엔드포인트 URL은 `${process.env.NEXT_PUBLIC_API_BASE_URL}${실제 경로}` 형태로 작성)
// 2. 응답 data는 src/mocks/<domain>.ts 의 기존 픽스처를 재사용 (중복 데이터 생성 금지)
// 3. 아래 배열에 추가
export const handlers = [...eventHandlers, ...productHandlers];
