/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseButton, Input as MantineInput } from '@mantine/core';
import style from './Input.module.scss';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import classNames from 'classnames';

interface Props {
  field?: ControllerRenderProps<FieldValues, any>;
  value?: string;
  onChange?: ((...event: any[]) => void) | undefined;
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
  fullWidth?: boolean;
  defaultValue?: string;
}

export const Input = ({
  field,
  size,
  label,
  onFocus,
  type,
  allowClear,
  error,
  onChange,
  value,
  fullWidth,
  defaultValue,
  ...props
}: Props) => {
  return (
    <MantineInput.Wrapper {...props} className={style.input} label={label}>
      <MantineInput
        type={type}
        autoFocus={false}
        onFocus={onFocus}
        autoComplete="on"
        defaultValue={defaultValue}
        {...props}
        size={size}
        onChange={onChange ?? field?.onChange}
        value={field?.value ?? value ?? ''}
        className={classNames(style.input, {
          [style.error]: error,
          [style.full]: fullWidth,
        })}
        rightSectionPointerEvents="all"
        rightSection={
          allowClear ? (
            <CloseButton
              aria-label="Clear input"
              onClick={field ? () => field?.onChange('') : () => onChange?.('')}
              style={{
                display: field?.value ? undefined : 'none',
                marginRight: '24px',
              }}
            />
          ) : null
        }
      />
      {error ? <p className="text small error">{error}</p> : null}
    </MantineInput.Wrapper>
  );
};
