import styles from './PresentationWorkspace.module.scss';
import { useEffect, useRef, useState } from 'react';

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
        style={{ height: `${leftHeight}px` }}
      >
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        >
          <p style={{ fontSize: '80px' }}>123</p>
        </div>
      </div>
      <div className={styles.controlls}>{/* Содержимое правой части */}</div>
    </div>
  );
};
