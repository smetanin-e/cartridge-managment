'use server';

import { printerRepository } from '@/entities/printer/repository/printerRepository';
import { CreatePrinterDTO } from '@/entities/printer/model/types';

export const registerPrinterAction = async (formData: CreatePrinterDTO) => {
  try {
    const printer = await printerRepository.findByName(formData.name);
    if (printer) {
      return { success: false, message: 'Такой принтер уже есть в базе' };
    }

    await printerRepository.registerPrinter(formData);

    return { success: true };
  } catch (error) {
    console.error('[REGISTER_PRINTER_ACTION] Server error', error);
    return { success: false, message: 'Ошибка добавления принтера' };
  }
};
