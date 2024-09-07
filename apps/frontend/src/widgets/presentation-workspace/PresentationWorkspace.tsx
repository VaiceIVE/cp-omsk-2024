import Draggable from 'react-draggable';
import styles from './PresentationWorkspace.module.scss';
import { useEffect, useRef, useState } from 'react';
import { mockSLide } from 'shared/constants/mock';

export const PresentationWorkspace = () => {
  const [leftHeight, setLeftHeight] = useState(0);
  const [scale, setScale] = useState(1);

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (slideRef.current) {
        const width = slideRef.current.offsetWidth;
        const height = (9 / 16) * width;
        setLeftHeight(height);
        setScale(height / 1080);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        ref={slideRef}
        className={styles.slide}
        style={{
          height: `${leftHeight}px`,
        }}
      >
        {mockSLide.elemnents.map((s) => (
          <Draggable
            position={{
              x: s.position.x * scale,
              y: s.position.y * scale,
            }}
            scale={scale}
            bounds={'parent'}
          >
            <p
              style={{
                fontSize: `calc(${s.typeography?.fontSize}px * ${scale})`,
                fontWeight: s.typeography?.fontWeight,
                color: s.typeography?.color,
                width: `calc(1018px * ${scale})`,
                lineHeight: `calc(96px * ${scale})`,
              }}
            >
              {s.typeography?.text}
            </p>
          </Draggable>
        ))}
      </div>
      <div className={styles.controlls}></div>
    </div>
  );
};
