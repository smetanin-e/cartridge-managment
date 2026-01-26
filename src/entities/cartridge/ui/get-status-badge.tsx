import { CARTRIDGE_STATUS_CONFIG } from '@/shared/constants';
import { Badge } from '@/shared/components/ui';
import { CartridgeStatus } from '@prisma/client';

export const getStatusBadge = (status: CartridgeStatus) => {
  const config = CARTRIDGE_STATUS_CONFIG[status];
  return <Badge className={`${config.color} text-white w-[152px]`}>{config.label}</Badge>;
};
