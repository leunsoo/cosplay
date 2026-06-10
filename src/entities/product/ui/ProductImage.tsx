import { Badge } from './Badge';
import { BadgeInfo } from '../model';

interface ProductImageProps {
  imageUrl: string;
  badges?: BadgeInfo[];
}

export function ProductImage({ imageUrl, badges }: ProductImageProps) {
  return (
    <div
      className="aspect-square w-full bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
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
