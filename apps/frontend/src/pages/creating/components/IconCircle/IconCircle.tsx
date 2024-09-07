import { Icon, IconProps } from '@tabler/icons-react';
import styles from './IconCircle.module.scss';
import { ReactSVG } from 'react-svg';

export const IconCircle = ({
  Icon,
  size,
  width,
  src,
}: {
  Icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  size: number;
  width: number;
  src?: string;
}) => {
  return (
    <div
      style={{
        minWidth: `${width.toString()}px`,
        height: `${width.toString()}px`,
      }}
      className={styles.root}
    >
      {!!Icon && <Icon size={size} />}
      {!!src && (
        <ReactSVG
          src={src}
          style={{
            minWidth: `${size.toString()}px`,
            height: `${size.toString()}px`,
          }}
        />
      )}
    </div>
  );
};
