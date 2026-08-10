import { UserAvatar } from '@/entities/user';
import { SellerProfile } from '../model/types';

export function SellerProfileCard({
  name,
  avatarUrl,
  introduction,
}: SellerProfile) {
  return (
    <div className="bg-white  rounded-xl border border-border-color shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
        <div className="relative px-2">
          <UserAvatar
            avatarUrl={avatarUrl}
            size="lg"
            shape="circle"
            className="border-2 border-white"
          />
        </div>
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 items-center">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          </div>

          <p className="w-full text-sm bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-600 empty:text-gray-400">
            {introduction || '등록된 소개 문구가 없습니다.'}
          </p>
        </div>
      </div>
    </div>
  );
}
