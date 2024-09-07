import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Textarea as MantineTextarea } from '@mantine/core';
import style from './Textarea.module.scss';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<FieldValues, any>;
  w?: number | string;
  size?: string;
  h?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  type?: string;
  allowClear?: boolean;
  error?: string;
}

export const Textarea = ({
  field,
  size,
  onFocus,
  type,
  allowClear,
  error,
  ...props
}: Props) => {
  return (
    <MantineTextarea
      onChange={field?.onChange}
      value={field?.value}
      className={style.root}
      {...props}
    />
  );
};
