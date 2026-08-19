import { queryOptions } from '@tanstack/react-query';
import { getMyProfile } from './get-my-profile';

export const USER_QUERIES = {
  all: () => ['user'] as const,
  myProfiles: () => [...USER_QUERIES.all(), 'my-profile'] as const,
  myProfile: (uuid: string) =>
    queryOptions({
      queryKey: [...USER_QUERIES.myProfiles(), uuid] as const,
      queryFn: () => getMyProfile({ uuid }),
      enabled: uuid.length > 0,
    }),
};
