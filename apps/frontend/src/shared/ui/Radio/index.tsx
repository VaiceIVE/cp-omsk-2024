import { Radio as MantineRadio, Stack } from '@mantine/core';

import styles from './Radio.module.scss';

interface RadioProps {
  label?: string;
  value: string;
  type?: 'default' | 'block';
  text?: string;
  image?: string;
  height?: string;
}

export const Radio = ({
  label,
  value,
  type = 'default',
  text,
  image,
  height,
}: RadioProps) => {
  if (type === 'default') {
    return null;
  }

  return (
    <MantineRadio.Card
      style={height ? { height: `${height}px` } : undefined}
      value={value}
      className={styles.radioBlock}
    >
      <Stack gap={16}>
        <MantineRadio.Indicator />

        {!!image && (
          <>
            <img src={image} className={styles.image} alt={image} />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 2,
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // черный с 30% прозрачностью
              }}
            />
          </>
        )}

        {!!label && (
          <Stack gap={6}>
            <p className="text semibold">{label}</p>
            <p className="text medium secondary">{text}</p>
          </Stack>
        )}
      </Stack>
    </MantineRadio.Card>
  );
};
