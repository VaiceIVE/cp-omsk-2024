import { Fragment } from 'react';
import { FormSection } from '../FormSection';
import { Title } from 'shared/ui/Title';
import { Divider, Flex, Stack } from '@mantine/core';
import { Textarea } from 'shared/ui/Textarea';
import { Controller, useFormContext } from 'react-hook-form';
import { Upload } from 'shared/ui/Upload';
import { IconFileFilled, IconPaperclip } from '@tabler/icons-react';
import { useCreatingPage } from 'pages/creating/useCreatingPage';

export const InitialForm = () => {
  const { control, watch } = useFormContext();
  const {
    setDocFile,
    setTableFile,
    resetDocRef,
    resetTableRef,
    docFile,
    tableFile,
  } = useCreatingPage();

  const text = watch('text');

  return (
    <Fragment>
      <FormSection>
        <Title semibold level={4} title="Текст презентации*" />

        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <Textarea
              disabled={!!docFile}
              field={field}
              {...field}
              label="Текст презентации"
              placeholder="Введите текст презентации"
            />
          )}
        />

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

          <Stack gap={16}>
            <Upload
              disabled={!!text}
              resetRef={resetDocRef}
              onChange={setDocFile}
              label="Загрузить файл .docx"
              accept=".doc,.docx,.pdf,.txt,.rtf"
              variant="accent"
              icon={<IconPaperclip />}
            />
            {!!docFile && (
              <Flex gap={16}>
                <p className="text medium secondary">Загружено:</p>
                <Flex gap={8} align={'center'}>
                  <IconFileFilled color="#383838" size={18} />
                  <p className="text medium secondary">{docFile.name}</p>
                </Flex>
              </Flex>
            )}
          </Stack>
        </Stack>
      </FormSection>

      <FormSection>
        <Title semibold level={4} title="Файл графиков (опционально)" />

        <Stack gap={20}>
          <Stack gap={10}>
            <p className="text semibold">Загрузить новый файл</p>
            <p className="text medium secondary">
              Выберите файл до 10 мб для анализа данных для визуализации
            </p>
          </Stack>
          <Stack gap={16}>
            <Upload
              label="Загрузить файл .xlsx"
              variant="accent"
              icon={<IconPaperclip />}
              resetRef={resetTableRef}
              onChange={setTableFile}
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            {!!tableFile && (
              <Flex gap={16}>
                <p className="text medium secondary">Загружено:</p>
                <Flex gap={8} align={'center'}>
                  <IconFileFilled color="#383838" size={18} />
                  <p className="text medium secondary">{tableFile.name}</p>
                </Flex>
              </Flex>
            )}
          </Stack>
        </Stack>

        <Stack gap={20}>
          <p className="text semibold">Выбрать загруженный файл</p>
        </Stack>
      </FormSection>
    </Fragment>
  );
};
