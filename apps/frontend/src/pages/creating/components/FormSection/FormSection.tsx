import { Stack } from '@mantine/core';

import styles from './FormSection.module.scss';
import { Children } from 'react';

export const FormSection = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Stack className={styles.root} gap={28} p={24}>
      {Children.map(children, (child) => child)}
    </Stack>
  );
};
