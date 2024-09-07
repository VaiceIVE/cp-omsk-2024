import { Fragment } from 'react';
import { FormSection } from '../FormSection';
import { Title } from 'shared/ui/Title';
import { Flex, Stack } from '@mantine/core';
import { Button } from 'shared/ui/Button';

export const OptionsForm = () => {
  return (
    <Fragment>
      <FormSection>
        <Title level={4} semibold title="Настройки презентации" />
        <></>
      </FormSection>

      <FormSection>
        <Title level={4} semibold title="Настройки графиков (необязательно)" />
        <Stack gap={20}>
          <p className="text semibold">Отображение данных</p>
        </Stack>
      </FormSection>
    </Fragment>
  );
};
