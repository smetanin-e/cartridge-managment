import { Cartridge } from '@prisma/client';

export type CartridgeDTO = Cartridge & { model: { model: string; id: number } };
export type BatchCartridge = CartridgeDTO & {
  returned: boolean;
  returnDate: string | null;
  returnResponsible: string | null;
  returnNotes: string | null;
};
