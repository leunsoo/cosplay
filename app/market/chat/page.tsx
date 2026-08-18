import { AuthGuard } from '@/_app/providers/AuthGuard';
import { ChatPage } from '@/_pages/market/product-chat';

interface ChatRouteProps {
  searchParams: Promise<{
    productId?: string;
    sellerUuid?: string;
    roomId?: string;
  }>;
}

export default async function ChatRoute({ searchParams }: ChatRouteProps) {
  const { productId, sellerUuid, roomId } = await searchParams;
  return (
    <AuthGuard>
      <ChatPage productId={productId} sellerUuid={sellerUuid} roomId={roomId} />
    </AuthGuard>
  );
}
