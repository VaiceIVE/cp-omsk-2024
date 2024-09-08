import { Flex, Stack } from '@mantine/core';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'shared/ui/Checkbox';
import { Input } from 'shared/ui/Input';

export const SizeChange = () => {
  const {
    activeElement,
    updateSizeElement,
    isProportional,
    setIsProportional,
    currentSlideId,
  } = usePresentationPage();

  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (activeElement) {
      setValue(
        'width',
        activeElement?.image?.width?.toString() ??
          activeElement?.figure?.width?.toString()
      );
      setValue(
        'height',
        activeElement?.image?.height?.toString() ??
          activeElement?.figure?.height?.toString()
      );
    }
  }, [activeElement, setValue]);

  return (
    <Stack gap={16}>
      <Flex gap={8}>
        <Controller
          name="width"
          defaultValue={
            activeElement?.image?.width?.toString() ??
            activeElement?.figure?.width?.toString()
          }
          control={control}
          render={({ field }) => (
            <Input
              field={field}
              label="Ширина"
              fullWidth
              type="number"
              onChange={(e) => {
                field.onChange(e);
                currentSlideId &&
                  updateSizeElement(currentSlideId, 'width', e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="height"
          defaultValue={
            activeElement?.image?.height?.toString() ??
            activeElement?.figure?.height?.toString()
          }
          control={control}
          render={({ field }) => (
            <Input
              field={field}
              label="Высота"
              fullWidth
              type="number"
              onChange={(e) => {
                field.onChange(e);

                currentSlideId &&
                  updateSizeElement(currentSlideId, 'height', e.target.value);
              }}
            />
          )}
        />
      </Flex>
      <Checkbox
        value={''}
        checked={isProportional}
        onChange={setIsProportional}
        label={'Пропорциональное изменение'}
      />
    </Stack>
  );
};
