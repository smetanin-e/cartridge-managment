import { axiosInstance } from '@/shared/service/instance';
import { useQuery } from '@tanstack/react-query';
import { PrinterDTO } from '../model/types';

export const useGetPrinters = () => {
  return useQuery<PrinterDTO[]>({
    queryKey: ['printers'],
    queryFn: async () => {
      return (
        await axiosInstance.get<PrinterDTO[]>('/printer', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
          },
        })
      ).data;
    },
  });
};
