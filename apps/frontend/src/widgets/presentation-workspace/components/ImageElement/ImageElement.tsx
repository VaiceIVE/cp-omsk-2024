import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import Draggable from 'react-draggable';
import { ISlideElement } from 'shared/models/ISlideElement';

import styles from './ImageElement.module.scss';
import classNames from 'classnames';

interface ImageElementProps {
  element: ISlideElement;
  scale: number;
  isActive: boolean;
}

export const ImageElement = ({
  element,
  scale,
  isActive,
}: ImageElementProps) => {
  const { handleDrag, handleClick } = usePresentationPage();

  return (
    <Draggable
      position={{
        x: element.position.x * scale,
        y: element.position.y * scale,
      }}
      scale={scale}
      bounds={'parent'}
      onStop={(e, data) => handleDrag(e, data, 0, element.id)}
      disabled={!isActive}
    >
      <div
        onClick={() => {
          handleClick(element);
        }}
        style={{
          width: 'fit-content',
          position: 'absolute',
          zIndex: element.position.z,
          cursor: 'move',
        }}
        className={classNames({ [styles.activeElement]: isActive })}
      >
        <div className={styles.imageWrapper}>
          <div className={styles.cap}></div>
          <img
            src={element.image?.url}
            alt="te"
            style={{
              width: `calc(${element.image?.width}px * ${scale})`,
              height: `calc(${element.image?.height}px * ${scale})`,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </Draggable>
  );
};
