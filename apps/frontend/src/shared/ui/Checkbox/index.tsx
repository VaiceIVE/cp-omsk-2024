import { Checkbox as MantineCheckbox } from '@mantine/core';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';

interface CheckboxProps {
  value: string;
  label: string;
  className?: string;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
  checked?: boolean;
}

export const Checkbox = ({
  value,
  label,
  className,
  onChange,
  checked,
}: CheckboxProps) => {
  return (
    <MantineCheckbox
      className={classNames(styles.root, className)}
      label={label}
      onChange={(e) => onChange?.(e.currentTarget.checked)}
      value={value}
      checked={checked}
    />
  );
};
