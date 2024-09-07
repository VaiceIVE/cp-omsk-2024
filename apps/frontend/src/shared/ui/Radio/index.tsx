import { Flex, Radio as MantineRadio, Stack } from '@mantine/core';

import styles from './Radio.module.scss';

interface RadioProps {
  label: string;
  value: string;
  type?: 'default' | 'block';
  text?: string;
}

export const Radio = ({ label, value, type = 'default', text }: RadioProps) => {
  if (type === 'default') {
    return null;
  }

  return (
    <MantineRadio.Card value={value} className={styles.radioBlock}>
      <Stack gap={16}>
        <MantineRadio.Indicator />

        <Stack gap={6}>
          <p className="text semibold">{label}</p>
          <p className="text medium secondary">{text}</p>
        </Stack>
      </Stack>
    </MantineRadio.Card>
  );
};
