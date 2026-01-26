import { Departament, Replacement } from '@prisma/client';

export type ReplacementDTO = Replacement & {
  departament: Departament;
};

export type Replace = {
  date: string;
  departamentId: number;
  installedCartridgeLabel: string | null;
  removedCartridgeLabel: string | null;
  responsible: string;
};
