import { Fragment } from 'react';
import { FormSection } from '../FormSection';
import { Title } from 'shared/ui/Title';
import { Flex, Stack } from '@mantine/core';
import { Button } from 'shared/ui/Button';

export const StyleForm = () => {
  return (
    <Fragment>
      <FormSection>
        <Title level={4} semibold title="Логотип" />
        <Stack gap={20}>
          <Stack gap={12}>
            <p className="text semibold">Выбрать файл или загрузите новые</p>
            <p className="text medium secondary">
              Выберите до 3 файлов, каждый до 10 мб для анализа текста
              презентации
            </p>
          </Stack>
          <Button label="Загрузить файлs .png, .jpeg, .svg" variant="accent" />
        </Stack>
      </FormSection>

      <FormSection>
        <Title level={4} semibold title="Стиль презентации" />
        <Stack gap={20}>
          <p className="text semibold">Шаблоны*</p>
        </Stack>

        <Stack gap={20}>
          <p className="text semibold">Акцентный цвет презентации</p>
        </Stack>
      </FormSection>
    </Fragment>
  );
};
