import { AuthGuard } from '@/core/providers/AuthGuard';
import { ChatView } from '@/views/product-chat';

interface ChatPageProps {
  searchParams: Promise<{
    productId?: string;
    sellerUuid?: string;
    roomId?: string;
  }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const { productId, sellerUuid, roomId } = await searchParams;
  return (
    <AuthGuard>
      <ChatView productId={productId} sellerUuid={sellerUuid} roomId={roomId} />
    </AuthGuard>
  );
}
