'use client';
import { FormCheckbox } from '@/shared/components/form';
import { Card, CardContent, Input, Label } from '@/shared/components/ui';
import React from 'react';
import { useGetModels } from '../api/use-get-mogels';
import { ButtonRegisterModel } from './button-register-model';
import { Search } from 'lucide-react';
import { ClearButton } from '@/shared/components';

interface Props {
  className?: string;
}

export const CheckModels: React.FC<Props> = () => {
  const { data } = useGetModels();

  const [searchValue, setSearchValue] = React.useState('');

  const onClickClear = () => {
    setSearchValue('');
  };
  if (!data) return null;

  const filteredModels = data.filter((madel) =>
    madel.model.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <div>
      <Label className='font-semibold'>Выберите совместимые модели картриджей</Label>
      <Card className='mt-2 max-w-[462px] p-4'>
        <CardContent className='p-0'>
          <div className='relative mb-4'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Поиск...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='pl-10 bg-white '
            />
            {searchValue && <ClearButton onClick={onClickClear} />}
          </div>

          <div className='flex flex-col gap-2   h-[200px] overflow-y-scroll '>
            {filteredModels.length === 0 ? (
              <>
                <div className='text-center py-16 text-muted-foreground'>Модель не найдена</div>
                <ButtonRegisterModel />
              </>
            ) : (
              <>
                {filteredModels.map((model) => (
                  <div key={model.id} className='flex items-center space-x-2'>
                    <FormCheckbox name='models' label={model.model} value={model.id} />
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
