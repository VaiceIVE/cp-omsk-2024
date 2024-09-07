import { Divider, Flex, Grid, Stack } from '@mantine/core';
import styles from './CreatingPage.module.scss';
import { Title } from 'shared/ui/Title';
import { ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InitialForm } from './components/InitialForm';
import { IconPresentation } from '@tabler/icons-react';
import { Button } from 'shared/ui/Button';
import { StyleForm } from './components/StyleForm';
import { OptionsForm } from './components/OptionsForm';

const steps: Record<number, ReactNode> = {
  0: <InitialForm />,
  1: <OptionsForm />,
  2: <StyleForm />,
};

const CreatingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const creatingForm = useForm();

  const StepComponent = steps[currentStep];

  return (
    <div className={styles.wrapper}>
      <Grid className={styles.root}>
        <Grid.Col className={styles.section} span={6}>
          <Stack className={styles.form} p={32} gap={32}>
            <Flex gap={20} align={'center'}>
              <div className={styles.icon}>
                <IconPresentation />
              </div>
              <Stack gap={2}>
                <Title level={2} title="Создание презентации" />
                <p className="text small medium secondary-hover">
                  Шаг {currentStep + 1} из 3
                </p>
              </Stack>
            </Flex>

            <Divider />

            <FormProvider {...creatingForm}>{StepComponent}</FormProvider>
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
