import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import Draggable from 'react-draggable';
import { ISlideElement } from 'shared/models/ISlideElement';
import classNames from 'classnames';

import styles from './FigureElement.module.scss';

interface FigureElementProps {
  element: ISlideElement;
  scale: number;
  isActive: boolean;
}

export const FigureElement = ({
  element,
  scale,
  isActive,
}: FigureElementProps) => {
  const { handleClick, handleStop, currentSlideId } = usePresentationPage();

  return (
    <Draggable
      position={{
        x: element.position.x * scale,
        y: element.position.y * scale,
      }}
      scale={scale}
      bounds={'parent'}
      disabled={!isActive}
      onStop={(e, data) => handleStop(e, data, currentSlideId ?? 0, element.id)}
    >
      <div
        onClick={() => {
          handleClick(element);
        }}
        className={classNames({ [styles.activeElement]: isActive })}
        style={{
          position: 'absolute',
          zIndex: element.position.z,
          width: `calc(${element.figure?.width}px * ${scale})`,
          height: `calc(${element.figure?.height}px * ${scale})`,
          backgroundColor: element.figure?.backgroundColor,
          borderRadius: `calc(${element.figure?.borderRadius}px * ${scale})`,
          cursor: 'move',
        }}
      ></div>
    </Draggable>
  );
};
