import { ColorPicker } from '@mantine/core';
import { Fragment } from 'react';
import { Input } from 'shared/ui/Input';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  swatchesPerRow?: number;
}

export const ColorInput = ({
  value,
  onChange,
  fullWidth,
  swatchesPerRow = 7,
}: ColorInputProps) => {
  return (
    <Fragment>
      <Input
        value={value}
        onChange={onChange}
        label="HEX код"
        placeholder="HEX"
        fullWidth={fullWidth}
      />

      <ColorPicker
        value={value}
        onChangeEnd={onChange}
        fullWidth={fullWidth}
        swatchesPerRow={swatchesPerRow}
        format="hex"
        swatches={[
          '#2e2e2e',
          '#868e96',
          '#fa5252',
          '#e64980',
          '#be4bdb',
          '#7950f2',
          '#4c6ef5',
          '#228be6',
          '#15aabf',
          '#12b886',
          '#40c057',
          '#82c91e',
          '#fab005',
          '#fd7e14',
        ]}
      />
    </Fragment>
  );
};
