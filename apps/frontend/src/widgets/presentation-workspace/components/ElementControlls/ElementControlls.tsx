import { Stack } from '@mantine/core';
import { IconWand } from '@tabler/icons-react';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import { Controller, useFormContext } from 'react-hook-form';
import { SlideElementType } from 'shared/models/ISlideElement';
import { Button } from 'shared/ui/Button';
import { Select } from 'shared/ui/Select';
import { Title } from 'shared/ui/Title';
import { SizeChange } from './components/SizeChange';
import { ColorChange } from './components/ColorChange';
import { TextChange } from './components/TextChange';

const titleByType = {
  [SlideElementType.Icon]: 'Настройки изображения',
  [SlideElementType.Image]: 'Настройки изображения', //done
  [SlideElementType.Text]: 'Настройки текста',
  [SlideElementType.Figure]: 'Настройки фигуры',
  [SlideElementType.Heading]: 'Настройки текста',
  [SlideElementType.Numeric]: 'Настройки текста',
};

export const ElementControlls = () => {
  const { activeElement } = usePresentationPage();

  const { control } = useFormContext();

  return (
    <Stack p={28} gap={28}>
      <Title
        level={4}
        title={
          activeElement
            ? titleByType[activeElement.elementType]
            : 'Настройки слайда'
        }
      />
      <Button
        reverse
        label="Генерировать новый"
        fullWidth
        variant="outline"
        icon={<IconWand stroke={2} />}
      />

      <Stack gap={22}>
        {activeElement?.elementType === SlideElementType.Image && (
          <Controller
            name="style"
            defaultValue={'Деловой'}
            control={control}
            render={({ field }) => (
              <Select
                label="Стиль"
                data={[
                  { value: 'Деловой', label: 'Деловой' },
                  { value: 'Позитивный', label: 'Позитивный' },
                  { value: 'Серьезный', label: 'Серьезный' },
                  { value: 'Детализированный', label: 'Детализированный' },
                ]}
                field={field}
              />
            )}
          />
        )}

        {(activeElement?.elementType === SlideElementType.Image ||
          activeElement?.elementType === SlideElementType.Figure) && (
          <SizeChange />
        )}

        {activeElement?.elementType === SlideElementType.Heading ||
          activeElement?.elementType === SlideElementType.Numeric ||
          (activeElement?.elementType === SlideElementType.Text && (
            <TextChange />
          ))}

        {activeElement?.elementType !== SlideElementType.Image &&
          activeElement?.elementType !== SlideElementType.Icon &&
          !!activeElement && <ColorChange />}
      </Stack>
    </Stack>
  );
};
