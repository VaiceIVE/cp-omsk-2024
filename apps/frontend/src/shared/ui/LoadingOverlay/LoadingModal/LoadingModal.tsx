import { Grid, Loader, Stack } from '@mantine/core';

import styles from './LoadingModal.module.scss';

import loading from 'shared/assets/loading.svg';
import { Title } from 'shared/ui/Title';
import { Button } from 'shared/ui/Button';
import { NavLink } from 'react-router-dom';

interface LoadingModalProps {
  title?: string;
}

export const LoadingModal = ({
  title = 'Создаю презентацию...',
}: LoadingModalProps) => {
  return (
    <Grid w={'100%'} justify="center" gutter={24}>
      <Grid.Col span={4}>
        <Stack align="center" gap={24} className={styles.root} p={'44px 32px'}>
          <div>
            <img alt="Loading..." src={loading} />
          </div>

          <Loader type="dots" />

          <Stack ta={'center'} gap={8} align="center">
            <Title level={4} title={title} />
            <p className="text medium">
              Пиксель уже достал кисточки и начал рисовать слайды. Обычно это
              занимает не более 1 минуты
            </p>
          </Stack>

          <NavLink to={'/'}>
            <Button variant="outline" label="Ко всем презентациям" />
          </NavLink>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
