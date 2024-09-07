import { Fragment } from 'react';
import { FormSection } from '../FormSection';
import { Title } from 'shared/ui/Title';
import { Divider, Flex, Stack } from '@mantine/core';
import { Button } from 'shared/ui/Button';

export const InitialForm = () => {
  return (
    <Fragment>
      <FormSection>
        <Title level={4} title="Текст презентации*" />

        <Flex gap={16} align={'center'}>
          <Divider flex={1} />
          <p className="text small medium tertiary">или</p>
          <Divider flex={1} />
        </Flex>

        <Stack gap={20}>
          <Stack gap={12}>
            <p className="text semibold">Выбрать файл или загрузите новые</p>
            <p className="text medium secondary">
              Выберите файл до 10 мб для анализа текста презентации
            </p>
          </Stack>
          <Button label="Загрузить файл .xlsx" variant="accent" />
        </Stack>
      </FormSection>

      <FormSection>
        <Title level={4} title="Файл графиков (опционально)" />
        <Stack gap={20}>
          <Stack gap={10}>
            <p className="text semibold">Загрузить новый файл</p>
            <p className="text medium secondary">
              Выберите файл до 10 мб для анализа данных для визуализации
            </p>
          </Stack>
          <Button label="Загрузить файл .xlsx" variant="accent" />
        </Stack>
      </FormSection>
    </Fragment>
  );
};
