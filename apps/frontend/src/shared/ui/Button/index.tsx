import { ComponentProps, ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { Loader, Button as MantineButton } from '@mantine/core';

export interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
  icon?: ReactNode;
  isIconLeft?: boolean;
  w?: number;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'accent';
  fullWidth?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  reverse?: boolean;
}

export const Button = ({
  label,
  icon,
  isIconLeft,
  w,
  className,
  onClick,
  disabled,
  variant,
  fullWidth,
  isLoading,
  isActive,
  reverse,
}: ButtonProps) => {
  return (
    <MantineButton
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        styles.button,
        {
          [styles.full]: fullWidth,
          [styles.disabled]: disabled,
          [styles.active]: isActive,
        },
        className && className,
        variant && styles[variant]
      )}
      style={
        icon && !label
          ? { width: `${w}px`, padding: '18px 16px' }
          : { width: `${w}px` }
      }
    >
      {!icon ? (
        label
      ) : (
        <div
          className={classNames(styles['button-wrapper'], {
            [styles.reverse]: isIconLeft,
            [styles.solo]: !label,
            [styles.loading]: isLoading,
            [styles.reverse]: reverse,
          })}
        >
          <div className={styles.label}>{label}</div>
          <div className={styles.icon}>{icon}</div>
          {isLoading ? (
            <Loader className={styles.loader} color="white" type="dots" />
          ) : null}
        </div>
      )}
    </MantineButton>
  );
};
