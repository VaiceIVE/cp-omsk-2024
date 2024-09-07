import { Divider, Flex, Grid, Stack } from '@mantine/core';
import styles from './CreatingPage.module.scss';
import { Title } from 'shared/ui/Title';
import { ReactNode, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InitialForm } from './components/InitialForm';
import { Button } from 'shared/ui/Button';
import { StyleForm } from './components/StyleForm';
import { OptionsForm } from './components/OptionsForm';
import { IconCircle } from './components/IconCircle';
import { EyeIcon } from 'shared/assets/EyeIcon';
import { CreatingPageContext } from './CreatingPageContext';

const steps: Record<number, ReactNode> = {
  0: <InitialForm />,
  1: <OptionsForm />,
  2: <StyleForm />,
};

const CreatingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const creatingForm = useForm();

  const [docFile, setDocFile] = useState<File | null>(null);
  const [tableFile, setTableFile] = useState<File | null>(null);

  const StepComponent = steps[currentStep];

  const resetDocRef = useRef<() => void>(null);
  const resetTableRef = useRef<() => void>(null);

  return (
    <div className={styles.wrapper}>
      <Grid className={styles.root}>
        <Grid.Col className={styles.section} span={6}>
          <Stack className={styles.form} p={32} gap={32}>
            <Flex gap={20} align={'center'}>
              <IconCircle width={56} size={32} src={EyeIcon} />

              <Stack gap={2}>
                <Title level={2} title="Создание презентации" />
                <p className="text small medium secondary-hover">
                  Шаг {currentStep + 1} из 3
                </p>
              </Stack>
            </Flex>

            <Divider />

            <CreatingPageContext.Provider
              value={{
                docFile: docFile,
                tableFile: tableFile,
                setDocFile,
                setTableFile,
                resetDocRef,
                resetTableRef,
              }}
            >
              <FormProvider {...creatingForm}>{StepComponent}</FormProvider>
            </CreatingPageContext.Provider>
          </Stack>
        </Grid.Col>
      </Grid>
      <footer className={styles.footer}>
        <Button
          onClick={() => {
            setCurrentStep((prev) => prev - 1);
          }}
          disabled={!currentStep}
          w={147}
          variant="outline"
          label="Назад"
        />
        <Button
          onClick={() => {
            setCurrentStep((prev) => prev + 1);
          }}
          disabled={currentStep === 2}
          w={147}
          label="Продолжить"
        />
      </footer>
    </div>
  );
};

export default CreatingPage;
