import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Title.module.scss';

interface TitleProps {
  title: string | ReactNode;
  level?: number | string;
  color?: string;
  semibold?: boolean;
  medium?: boolean;
}

export const Title = ({
  title,
  level,
  color,
  semibold,
  medium,
}: TitleProps) => {
  let content: ReactElement = <div></div>;

  switch (level) {
    case 1:
      content = (
        <h1
          className={classNames(
            `${styles.title} ${styles.h1}`,
            color && styles[color],
            semibold && styles.semibold,
            medium && styles.medium
          )}
        >
          {title}
        </h1>
      );
      break;
    case 2:
      content = (
        <h2
          className={classNames(
            `${styles.title} ${styles.h2}`,
            color && styles[color],
            semibold && styles.semibold,
            medium && styles.medium
          )}
        >
          {title}
        </h2>
      );
      break;
    case 3:
      content = (
        <h3
          className={classNames(
            `${styles.title} ${styles.h3}`,
            color && styles[color],
            semibold && styles.semibold,
            medium && styles.medium
          )}
        >
          {title}
        </h3>
      );
      break;
    case 4:
      content = (
        <h4
          className={classNames(
            `${styles.title} ${styles.h4}`,
            color && styles[color],
            semibold && styles.semibold,
            medium && styles.medium
          )}
        >
          {title}
        </h4>
      );
      break;
    case 5:
      content = (
        <h5
          className={classNames(
            `${styles.title} ${styles.h5}`,
            color && styles[color],
            semibold && styles.semibold,
            medium && styles.medium
          )}
        >
          {title}
        </h5>
      );
      break;
    case 'title':
      content = (
        <h1
          className={classNames(
            `${styles.title} ${styles.main}`,
            color && styles[color],
            semibold && styles.semibold,
            medium && styles.medium
          )}
        >
          {title}
        </h1>
      );
      break;
  }

  return content;
};
