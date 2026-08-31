import { ImageWithFallback } from '@/shared/ui';

interface ProductImageProps {
  mainImage: string;
  title: string;
}

export function ProductImage({ mainImage, title }: ProductImageProps) {
  return (
    <div className="w-full max-w-120 shrink-0 flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-square w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative group">
        <ImageWithFallback
          src={mainImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
