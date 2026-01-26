import { CartridgeDTO } from '../types';

//TODO Сделать рефакторинг
export const handleCartridgeSelect = (
  selectedCartridges: number[],
  cartridgeId: number,
  checked: boolean,
  setCartridges: (cartridgeId: number[]) => void,
) => {
  if (checked) {
    setCartridges([...selectedCartridges, cartridgeId]);
  } else {
    setCartridges(selectedCartridges.filter((id) => id !== cartridgeId));
  }
};

export const handleSelectAllCartridges = (
  availableForService: CartridgeDTO[],
  checked: boolean,
  setCartridges: (cartridgeId: number[]) => void,
) => {
  if (checked) {
    const availableIds = availableForService.map((c) => c.id);
    setCartridges(availableIds);
  } else {
    setCartridges([]);
  }
};
