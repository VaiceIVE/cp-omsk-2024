import { Stack } from '@mantine/core';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'shared/ui/Input';
import { Select } from 'shared/ui/Select';

const weights: Record<number, string> = {
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
};

const fonts = ['Manrope'];

export const TextChange = () => {
  const { activeElement, updateTypography, currentSlideId } =
    usePresentationPage();

  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (activeElement) {
      setValue('fontSize', activeElement?.typeography?.fontSize.toString());
      setValue('fontWeight', activeElement?.typeography?.fontWeight.toString());
      setValue('fontFamily', activeElement?.typeography?.fontFamily.toString());
    }
  }, [activeElement, setValue]);

  return (
    <Stack gap={22}>
      <Controller
        name="fontFamily"
        defaultValue={
          activeElement?.typeography
            ? weights[activeElement.typeography.fontWeight]
            : ''
        }
        control={control}
        render={({ field }) => (
          <Select
            label="Шрифт"
            placeholder="Шрифт"
            data={fonts.map((f) => ({ value: f, label: f }))}
            field={field}
            onChange={(e) => {
              field.onChange(e);
              updateTypography(currentSlideId, 'fontFamily', e ?? '');
            }}
          />
        )}
      />
      <Controller
        name="fontSize"
        defaultValue={activeElement?.typeography?.fontSize.toString()}
        control={control}
        render={({ field }) => (
          <Input
            placeholder="Размер шрифта"
            field={field}
            label="Размер"
            fullWidth
            type="number"
            onChange={(e) => {
              field.onChange(e);
              updateTypography(currentSlideId, 'fontSize', e.target.value);
            }}
          />
        )}
      />
      <Controller
        name="fontWeight"
        defaultValue={
          activeElement?.typeography
            ? weights[activeElement.typeography.fontWeight]
            : ''
        }
        control={control}
        render={({ field }) => (
          <Select
            label="Начертание"
            placeholder="Начертание шрифта"
            data={Object.keys(weights).map((w) => ({
              value: w,
              label: weights[+w],
            }))}
            field={field}
            onChange={(e) => {
              field.onChange(e);
              updateTypography(currentSlideId, 'fontWeight', e ?? '');
            }}
          />
        )}
      />
    </Stack>
  );
};
