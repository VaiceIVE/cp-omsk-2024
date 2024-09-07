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
import { SlideType } from 'shared/models/ISlide';
import { useEffect } from 'react';
import { Textarea } from 'shared/ui/Textarea';

const titleByType: Record<SlideElementType, string> = {
  [SlideElementType.Icon]: 'Настройки изображения',
  [SlideElementType.Image]: 'Настройки изображения',
  [SlideElementType.Text]: 'Настройки текста',
  [SlideElementType.Figure]: 'Настройки фигуры',
  [SlideElementType.Heading]: 'Настройки текста',
  [SlideElementType.Numeric]: 'Настройки текста',
};

const slideByType: Record<SlideType, string> = {
  [SlideType.Header]: 'Титульный лист',
  [SlideType.OneText]: 'Заголовок + 1 блок текста + картинка',
  [SlideType.TwoText]: 'Заголовок + 2 блока текста + 2 иконки',
  [SlideType.ThreeText]: 'Заголовок + 3 блока текста + 3 иконки',
  [SlideType.BigNumbers]: 'Заголовок + 3 блока текста + числовые данные',
  [SlideType.Chart]: 'Заголовок + диаграмма',
  [SlideType.Ending]: 'Заключительный слайд',
};

export const ElementControlls = () => {
  const { activeElement, presentation, currentSlide, handleRegenerate } =
    usePresentationPage();

  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (!activeElement) {
      setValue('slideType', presentation?.slides[currentSlide].slideType);
    }
  }, [activeElement, currentSlide, presentation?.slides, setValue]);

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

      {!activeElement && presentation && (
        <Stack gap={12}>
          <p className="text bold">
            Тип слайда:{' '}
            <span className="text medium secondary">
              {slideByType[presentation.slides[currentSlide].slideType]}
            </span>
          </p>

          <Controller
            name="slideType"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Сменить тип слайда"
                data={Object.keys(slideByType).map((t: string) => ({
                  value: t as string,
                  label: slideByType[t as SlideType],
                }))}
                field={field}
              />
            )}
          />
        </Stack>
      )}

      {!activeElement && (
        <Textarea
          disabled
          placeholder="Для заголовков"
          label="Выделенный в файле текст"
          field={{
            onChange: () => null,
            onBlur: () => null,
            value: undefined,
            disabled: undefined,
            name: undefined,
            ref: () => null,
          }}
        />
      )}

      {activeElement?.elementType !== SlideElementType.Figure &&
        activeElement?.elementType !== SlideElementType.Icon && (
          <Button
            onClick={handleRegenerate}
            reverse
            label="Генерировать новый"
            fullWidth
            variant="outline"
            icon={<IconWand stroke={2} />}
          />
        )}

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
