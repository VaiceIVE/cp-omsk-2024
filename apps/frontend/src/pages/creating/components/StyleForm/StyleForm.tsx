import { Fragment } from 'react';
import { FormSection } from '../FormSection';
import { Title } from 'shared/ui/Title';
import { Flex, Stack, Radio as MantineRadio } from '@mantine/core';
import { Upload } from 'shared/ui/Upload';
import { IconFileFilled, IconPaperclip } from '@tabler/icons-react';
import { useCreatingPage } from 'pages/creating/useCreatingPage';

import template1 from 'shared/assets/templates/template1.png';
import template2 from 'shared/assets/templates/template2.png';
import template3 from 'shared/assets/templates/template3.png';
import { Radio } from 'shared/ui/Radio';
import { Controller, useFormContext } from 'react-hook-form';
import { ColorInput } from 'widgets/color-input';

export const StyleForm = () => {
  const { logoFiles, setLogoFiles, resetLogoRef, accentColor, setAccentColor } =
    useCreatingPage();

  const { control } = useFormContext();

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
          <Stack gap={16}>
            <Upload
              disabled
              values={logoFiles}
              resetRef={resetLogoRef}
              onChangeArray={setLogoFiles}
              multiple
              label="Загрузить файлs .png, .jpeg, .svg"
              variant="accent"
              icon={<IconPaperclip />}
            />
            {!!logoFiles.length && (
              <Flex gap={16}>
                <p className="text medium secondary">
                  Загружено ({logoFiles.length}):
                </p>
                {logoFiles.map((f) => (
                  <Flex key={f.name} gap={8} align={'center'}>
                    <IconFileFilled color="#383838" size={18} />
                    <p className="text medium secondary">{f.name}</p>
                  </Flex>
                ))}
              </Flex>
            )}
          </Stack>
        </Stack>
      </FormSection>

      <FormSection>
        <Title level={4} semibold title="Стиль презентации" />
        <Stack gap={20}>
          <p className="text semibold">Шаблоны*</p>

          <Controller
            control={control}
            name="template"
            render={({ field }) => (
              <MantineRadio.Group {...field}>
                <Flex gap={12}>
                  <Radio
                    height="110"
                    type="block"
                    image={template1}
                    label={''}
                    value={'template1'}
                  />
                  <Radio
                    type="block"
                    image={template2}
                    label={''}
                    value={'template2'}
                  />
                  <Radio
                    type="block"
                    image={template3}
                    label={''}
                    value={'template3'}
                  />
                </Flex>
              </MantineRadio.Group>
            )}
          />
        </Stack>

        <Stack gap={20}>
          <p className="text semibold">Акцентный цвет презентации</p>

          <ColorInput value={accentColor} onChange={setAccentColor} />
        </Stack>
      </FormSection>
    </Fragment>
  );
};
