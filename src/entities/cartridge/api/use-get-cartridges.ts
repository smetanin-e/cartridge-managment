import { axiosInstance } from '@/shared/service/instance';
import { useQuery } from '@tanstack/react-query';
import { CartridgeDTO } from '../model/types';
import { CartridgeStatus } from '@prisma/client';

//TODO сделать рефакторинг и вынести функцию отдельно
export const useGetCartridges = (statuses?: CartridgeStatus[]) => {
  const query = useQuery<CartridgeDTO[]>({
    queryKey: ['cartridges', { statuses }],
    queryFn: async () => {
      const queryString = statuses?.length
        ? statuses.map((s) => `status=${encodeURIComponent(s)}`).join('&')
        : '';
      return (
        await axiosInstance.get<CartridgeDTO[]>(`cartridge/?${queryString}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
          },
        })
      ).data;
    },
  });

  return {
    ...query,
    cartridges: query.data ?? [],
  };
};
