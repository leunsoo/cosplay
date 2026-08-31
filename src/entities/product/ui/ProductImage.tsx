import { ImageWithFallback } from '@/shared/ui';
import { Badge } from './Badge';
import { BadgeInfo } from '../model/product';

interface ProductImageProps {
  imageUrl: string;
  title: string;
  badges?: BadgeInfo[];
}

export function ProductImage({ imageUrl, title, badges }: ProductImageProps) {
  return (
    <div className="aspect-square w-full relative overflow-hidden">
      <ImageWithFallback
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

      {badges && badges.length > 0 && (
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {badges.map((badge, index) => (
            <Badge key={index} label={badge.label} />
          ))}
        </div>
      )}
    </div>
  );
}
