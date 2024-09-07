import { Stack } from '@mantine/core';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import { useEffect, useState } from 'react';
import { ColorInput } from 'widgets/color-input';

export const ColorChange = () => {
  const { activeElement, updateColorElement, currentSlideId } =
    usePresentationPage();

  const [color, setColor] = useState('');

  useEffect(() => {
    if (activeElement) {
      setColor(
        activeElement.figure?.backgroundColor ??
          activeElement.typeography?.color ??
          ''
      );
    }
  }, [activeElement]);

  return (
    <Stack gap={16}>
      <ColorInput
        swatchesPerRow={14}
        fullWidth
        value={color}
        onChange={(value: string) => {
          setColor(value);
          updateColorElement(currentSlideId, value);
        }}
      />
    </Stack>
  );
};
