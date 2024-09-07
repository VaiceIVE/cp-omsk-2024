import classNames from 'classnames';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import Draggable from 'react-draggable';
import { ISlideElement } from 'shared/models/ISlideElement';

import styles from './TextElement.module.scss';

interface TextElementProps {
  element: ISlideElement;
  scale: number;
  isActive: boolean;
}

export const TextElement = ({ element, scale, isActive }: TextElementProps) => {
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
      <p
        onClick={() => {
          handleClick(element);
        }}
        className={classNames({ [styles.activeElement]: isActive })}
        style={{
          position: 'absolute',
          fontSize: `calc(${element.typeography?.fontSize}px * ${scale})`,
          fontWeight: element.typeography?.fontWeight,
          color: element.typeography?.color,
          width: `calc(${element.typeography?.width}px * ${scale})`,
          lineHeight: `calc(${element.typeography?.lineHeight}px * ${scale})`,
          zIndex: element.position.z,
          cursor: 'move',
        }}
      >
        {element.typeography?.text}
      </p>
    </Draggable>
  );
};
