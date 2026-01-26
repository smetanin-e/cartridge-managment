import { ResponsibleForm } from '@/entities/user/ui';
import { FormDate } from '@/shared/components/form';
import { FormTextarea } from '@/shared/components/form/form-textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { batchFormSchema, BatchFormType } from '../model/schemas/batch-form-schema';
import { convertDate } from '@/shared/lib';
import { Button } from '@/shared/components/ui';
import { useBatchMutations } from '../model/hooks/use-batch-mutation';

interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: (ids: number[]) => void;
  batchId: string;
  onClose: VoidFunction;
}

export const ReturnBatchForm: React.FC<Props> = ({
  batchId,
  selectedCartridges,
  setSelectedCartridges,
  onClose,
}) => {
  const { update } = useBatchMutations();
  const form = useForm<BatchFormType>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      notes: '',
      responsible: '',
    },
  });

  const onSubmit = async (data: BatchFormType) => {
    try {
      data.date = convertDate(data.date);
      const payload = {
        ...data,
        batchId: batchId,
        cartridges: selectedCartridges,
      };

      update.mutateAsync(payload);
      setSelectedCartridges([]);
      form.reset();
    } catch (error) {
      console.error('Error [Return_Batch_Form]', error);
    } finally {
      onClose();
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <FormDate name='date' label='Дата приема' />
          <ResponsibleForm />
        </div>
        <div>
          <FormTextarea name='notes' label='Примечания' placeholder='Комментарий возврата...' />
        </div>

        <div className='pt-4 grid grid-cols-2 gap-4'>
          <Button
            type='submit'
            disabled={selectedCartridges.length === 0 || form.formState.isSubmitting}
          >
            Принять
            {selectedCartridges.length !== 0 ? ` (${selectedCartridges.length} шт.)` : ''}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type='button'
            variant='outline'
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
