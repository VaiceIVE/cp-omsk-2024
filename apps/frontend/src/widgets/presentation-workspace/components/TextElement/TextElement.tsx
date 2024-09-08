import classNames from 'classnames';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import Draggable from 'react-draggable';
import { ISlideElement } from 'shared/models/ISlideElement';

import styles from './TextElement.module.scss';
import { useEffect, useRef, useState } from 'react';

interface TextElementProps {
  element: ISlideElement;
  scale: number;
  isActive: boolean;
}

export const TextElement = ({ element, scale, isActive }: TextElementProps) => {
  const { handleStop, handleClick, currentSlideId, updateTypography } =
    usePresentationPage();
  const [text, setText] = useState(element.typeography?.text ?? '');

  const textareaRef = useRef<HTMLDivElement>(null);

  const clearString = (value: string | undefined) => {
    if (value) {
      return value
        .replace(/\\+/g, '')
        .replace(/^["[\]]+|["[\]]+$/g, '')
        .replace(/\\"/g, '"')
        .replace(/[\n\r]+/g, ' ')
        .trim();
    }

    return '';
  };

  useEffect(() => {
    if (textareaRef.current && !!textareaRef.current.firstElementChild) {
      textareaRef.current.style.height = '10px';

      textareaRef.current.style.height =
        textareaRef.current.firstElementChild.scrollHeight.toString() + 'px';
    }
  }, [text, scale, currentSlideId, element]);

  return (
    <Draggable
      position={{
        x: element.position.x * scale,
        y: element.position.y * scale,
      }}
      scale={scale}
      bounds={'parent'}
      onStop={(e, data) => handleStop(e, data, currentSlideId ?? 0, element.id)}
      disabled={!isActive}
    >
      <div
        ref={textareaRef}
        style={{
          position: 'absolute',
          zIndex: element.position.z,
          height: '10px',
        }}
      >
        <textarea
          onClick={() => {
            handleClick(element);
          }}
          className={classNames({ [styles.activeElement]: isActive })}
          style={{
            fontSize: `calc(${element.typeography?.fontSize}px * ${scale})`,
            fontWeight: element.typeography?.fontWeight,
            color: element.typeography?.color,
            width: `calc(${element.typeography?.width}px * ${scale})`,
            lineHeight: `calc(${element.typeography?.lineHeight}px * ${scale})`,
            resize: 'none',
            cursor: 'move',
            height: '100%',
          }}
          onChange={(e) => {
            setText(e.currentTarget.value);

            currentSlideId &&
              updateTypography(currentSlideId, 'text', e.currentTarget.value);
          }}
          value={clearString(element.typeography?.text)}
        />
      </div>
    </Draggable>
  );
};
