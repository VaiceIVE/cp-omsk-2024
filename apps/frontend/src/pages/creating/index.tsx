import { Divider, Flex, Grid, Stack } from '@mantine/core';
import styles from './CreatingPage.module.scss';
import { Title } from 'shared/ui/Title';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InitialForm } from './components/InitialForm';
import { Button } from 'shared/ui/Button';
import { StyleForm } from './components/StyleForm';
import { OptionsForm } from './components/OptionsForm';
import { IconCircle } from './components/IconCircle';
import { EyeIcon } from 'shared/assets/EyeIcon';
import { CreatingPageContext } from './CreatingPageContext';
import PresentationServices from 'shared/services/PresentationServices';
import { LoadingOverlay } from 'shared/ui/LoadingOverlay';

const steps: Record<number, ReactNode> = {
  0: <InitialForm />,
  1: <OptionsForm />,
  2: <StyleForm />,
};

const CreatingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const creatingForm = useForm();

  const [loading, setLoading] = useState(false);

  const [docFile, setDocFile] = useState<File | null>(null);
  const [tableFile, setTableFile] = useState<File | null>(null);
  const [logoFiles, setLogoFiles] = useState<File[]>([]);

  const [selectedChart, setSelectedChart] = useState('');
  const [hasCharts, setHasCharts] = useState(false);

  const [accentColor, setAccentColor] = useState('#000000');

  const StepComponent = steps[currentStep];

  const resetDocRef = useRef<() => void>(null);
  const resetTableRef = useRef<() => void>(null);
  const resetLogoRef = useRef<() => void>(null);

  const text = creatingForm.watch('text') ?? '';
  const length = creatingForm.watch('length') ?? '';
  const changeText = creatingForm.watch('changeText') ?? '';
  const template = creatingForm.watch('template') ?? '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      setLoading(true);

      await PresentationServices.createPresentation(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
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
                  docFile,
                  tableFile,
                  setDocFile,
                  setTableFile,
                  resetDocRef,
                  resetTableRef,
                  selectedChart,
                  setSelectedChart,
                  hasCharts,
                  setHasCharts,
                  logoFiles,
                  setLogoFiles,
                  resetLogoRef,
                  accentColor,
                  setAccentColor,
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
          {currentStep === 2 ? (
            <Button
              onClick={creatingForm.handleSubmit(onSubmit)}
              disabled={!template}
              w={227}
              label="Создать презентацию"
            />
          ) : (
            <Button
              onClick={() => {
                setCurrentStep((prev) => prev + 1);
              }}
              disabled={
                currentStep === 0 ? !text && !docFile : !changeText || !length
              }
              w={147}
              label="Продолжить"
            />
          )}
        </footer>
      </div>
    </Fragment>
  );
};

export default CreatingPage;
