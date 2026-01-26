'use server';

import { printerRepository } from '@/entities/printer/repository/printerRepository';

export const deletePrinterAction = async (printerId: number) => {
  try {
    const printer = await printerRepository.findById(printerId);
    if (!printer) {
      return { success: false, message: 'Принтер не найден' };
    }

    await printerRepository.deleteById(printer.id);

    return { success: true };
  } catch (error) {
    console.error('[DELETE_PRINTER_ACTION] Server error', error);
    return { success: false, message: 'Ошибка удаления принтера' };
  }
};
