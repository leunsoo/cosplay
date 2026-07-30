import { UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

const SIZE_MAP = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-32 h-32',
} as const;

const SHAPE_MAP = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  rectangle: 'rounded-sm',
} as const;

interface UserAvatarProps {
  avatarUrl: string | null;
  size?: keyof typeof SIZE_MAP;
  shape?: keyof typeof SHAPE_MAP;
  className?: string;
  onClick?: () => void;
}

export function UserAvatar({
  avatarUrl,
  size = 'md',
  shape = 'circle',
  className,
  onClick,
}: UserAvatarProps) {
  return (
    <div
      className={cn(
        'bg-gray-100 bg-cover bg-center flex items-center justify-center',
        SIZE_MAP[size],
        SHAPE_MAP[shape],
        onClick && 'cursor-pointer',
        className
      )}
      style={avatarUrl ? { backgroundImage: `url('${avatarUrl}')` } : undefined}
      onClick={onClick}
    >
      {!avatarUrl && <UserRound className="w-1/2 h-1/2 text-gray-400" />}
    </div>
  );
}
