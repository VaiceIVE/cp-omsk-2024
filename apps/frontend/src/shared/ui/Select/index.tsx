import { Select as MantineSelect } from '@mantine/core';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import style from './Select.module.scss';

interface Props {
  data: { label: string; value: string }[];
  field: ControllerRenderProps<FieldValues, any>;
  custom?: boolean;
  label?: string;
  placeholder?: string;
  w?: number;
  defaultValue?: string;
  searchable?: boolean;
  disabled?: boolean;
  limit?: number;
  allowDeselect?: boolean;
  onChange?: (value: string | null) => void;
}

export const Select = ({
  field,
  allowDeselect = false,
  onChange,
  ...props
}: Props) => {
  return (
    <MantineSelect
      allowDeselect={allowDeselect}
      value={field?.value ? field?.value : null}
      onChange={onChange ?? field.onChange}
      {...props}
      className={style.select}
    />
  );
};
