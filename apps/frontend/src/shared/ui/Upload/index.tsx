/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FileButton } from '@mantine/core';
import { Button, ButtonProps } from '../Button';

interface UploadProps extends ButtonProps {
  onChange?: React.Dispatch<React.SetStateAction<File | null>>;
  onChangeArray?: React.Dispatch<React.SetStateAction<File[]>>;
  resetRef?: React.ForwardedRef<() => void> | undefined;
  multiple?: boolean;
  accept?: string;
}

export const Upload = ({
  onChange,
  resetRef,
  multiple,
  onChangeArray,
  accept,
  ...buttonProps
}: UploadProps) => {
  if (multiple) {
    return (
      <FileButton
        resetRef={resetRef}
        onChange={
          onChangeArray
            ? (payload) => onChangeArray((prev) => [...prev, ...payload])
            : () => null
        }
        accept={accept}
        multiple
      >
        {(props) => <Button {...props} {...buttonProps} />}
      </FileButton>
    );
  }

  return (
    <FileButton resetRef={resetRef} onChange={onChange!} accept={accept}>
      {(props) => <Button {...props} {...buttonProps} />}
    </FileButton>
  );
};
