import { Flex, Stack } from '@mantine/core';
import { IconWand } from '@tabler/icons-react';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import { Fragment, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SlideType } from 'shared/models/ISlide';
import { SlideElementType } from 'shared/models/ISlideElement';
import { Button } from 'shared/ui/Button';
import { Checkbox } from 'shared/ui/Checkbox';
import { Input } from 'shared/ui/Input';
import { Select } from 'shared/ui/Select';
import { Title } from 'shared/ui/Title';

const titleByType = {
  [SlideElementType.Icon]: 'Настройки изображения',
  [SlideElementType.Image]: 'Настройки изображения',
  [SlideElementType.Text]: 'Настройки текста',
  [SlideElementType.Figure]: 'Настройки фигуры',
  [SlideElementType.Heading]: 'Настройки текста',
  [SlideElementType.Numeric]: 'Настройки текста',
};

export const ElementControlls = () => {
  const {
    activeElement,
    updateSizeElement,
    isProportional,
    setIsProportional,
  } = usePresentationPage();

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
      {!activeElement && (
        <Fragment>
          <></>
          <div>123</div>
        </Fragment>
      )}

      {activeElement?.elementType === SlideElementType.Image && (
        <Stack gap={22}>
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

          <Stack gap={16}>
            <Flex gap={8}>
              <Controller
                name="width"
                defaultValue={activeElement.image?.width.toString()}
                control={control}
                render={({ field }) => (
                  <Input
                    field={field}
                    label="Ширина"
                    fullWidth
                    type="number"
                    onChange={(e) => {
                      field.onChange(e);
                      updateSizeElement('width', e.target.value);
                    }}
                  />
                )}
              />

              <Controller
                name="height"
                defaultValue={activeElement.image?.height.toString()}
                control={control}
                render={({ field }) => (
                  <Input
                    field={field}
                    label="Высота"
                    fullWidth
                    type="number"
                    onChange={(e) => {
                      field.onChange(e);

                      updateSizeElement('height', e.target.value);
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
        </Stack>
      )}
    </Stack>
  );
};
