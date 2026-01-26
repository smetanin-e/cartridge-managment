import React from 'react';
import { Badge, Checkbox } from '@/shared/components/ui';
import { Calendar, CheckCircle } from 'lucide-react';
import { BatchCartridge } from '../model/types';
interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: React.Dispatch<React.SetStateAction<number[]>>;
  cartridges: BatchCartridge[];
}

export const ChoiceCartridges: React.FC<Props> = ({
  selectedCartridges,
  setSelectedCartridges,
  cartridges,
}) => {
  const avaibleCartridges = cartridges.filter((c) => !c.returned);

  const isAllSelected =
    cartridges.length > 0 && selectedCartridges.length === avaibleCartridges.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const avaibleIds = avaibleCartridges.map((c) => c.id);
      setSelectedCartridges(avaibleIds);
    } else {
      setSelectedCartridges([]);
    }
  };

  const handleCartridgeSelect = (cartridgeId: number, checked: boolean) => {
    if (checked) {
      setSelectedCartridges((prev) => [...prev, cartridgeId]);
    } else {
      setSelectedCartridges((prev) => prev.filter((id) => id !== cartridgeId));
    }
  };
  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>
        Выберите картриджи для приема (доступно: {avaibleCartridges.length})
      </h3>

      <div className='h-60 overflow-y-auto'>
        <div className='grid sticky top-0 z-10 text-sm font-semibold px-2 py-2 grid-cols-[50px_120px_150px_120px_150px_150px_1fr] bg-card-header shadow-sm mb-2'>
          <div>
            <Checkbox
              id='select-all-return'
              checked={isAllSelected}
              onCheckedChange={(checked) => handleSelectAll(checked === true)}
            />
          </div>
          <div>Номер</div>
          <div>Модель</div>
          <div>Статус</div>
          <div>Дата возврата</div>
          <div>Ответственный</div>
          <div>Комментарий</div>
        </div>

        <div>
          {cartridges.map((c) => (
            <div
              key={c.id}
              className='grid px-2 py-2 items-center text-sm  grid-cols-[50px_120px_150px_120px_150px_150px_1fr]'
            >
              <div>
                {!c.returned ? (
                  <Checkbox
                    checked={selectedCartridges.includes(c.id)}
                    onCheckedChange={(checked) => handleCartridgeSelect(c.id, checked as boolean)}
                  />
                ) : (
                  <CheckCircle className='h-4 w-4 text-success' />
                )}
              </div>

              <div className='font-medium'>{c.label}</div>
              <div>{c.model.model}</div>

              <div>
                <Badge variant={c.returned ? 'success' : 'secondary'}>
                  {c.returned ? 'Возвращен' : 'В сервисе'}
                </Badge>
              </div>

              <div>
                {c.returned ? (
                  <div className='flex items-center gap-1 text-sm'>
                    <Calendar className='h-3 w-3' />
                    <span>{c.returnDate}</span>
                  </div>
                ) : (
                  <span className='text-muted-foreground text-sm'>—</span>
                )}
              </div>

              <div>
                {c.returned ? (
                  <span>{c.returnResponsible}</span>
                ) : (
                  <span className='text-muted-foreground text-sm'>—</span>
                )}
              </div>

              <div className='text-xs break-words whitespace-normal'>
                {c.returnNotes ?? <span className='text-muted-foreground text-sm'>—</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
