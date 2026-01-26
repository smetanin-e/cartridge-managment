import { axiosInstance } from '@/shared/service/instance';
import { Model } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useGetModels = () => {
  return useQuery<Model[]>({
    queryKey: ['models'],
    queryFn: async () => {
      return (
        await axiosInstance.get<Model[]>('/model', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
          },
        })
      ).data;
    },
    initialData: [],
  });
};
