import styles from './PresentationWorkspace.module.scss';
import { SlideElementType } from 'shared/models/ISlideElement';
import { TextElement } from './components/TextElement';
import { ImageElement } from './components/ImageElement';
import { FigureElement } from './components/FigureElement';
import { usePresentationPage } from 'pages/presentation/usePresentationPage';
import { ElementControlls } from './components/ElementControlls';
import classNames from 'classnames';

const Element = {
  [SlideElementType.Text]: TextElement,
  [SlideElementType.Image]: ImageElement,
  [SlideElementType.Figure]: FigureElement,
  [SlideElementType.Heading]: TextElement,
  [SlideElementType.Numeric]: TextElement,
  [SlideElementType.Icon]: ImageElement,
};

export const PresentationWorkspace = () => {
  const {
    slideRef,
    leftHeight,
    scale,
    presentation,
    activeElement,
    handleSlideClick,
    currentSlide,
  } = usePresentationPage();

  const slides = presentation?.slides[currentSlide];

  return (
    <div className={styles.wrapper}>
      <div
        ref={slideRef}
        className={classNames(styles.slide, {
          [styles.activeSlide]: !activeElement,
        })}
        style={{
          height: `${leftHeight}px`,
        }}
        onClick={handleSlideClick}
      >
        {slides?.elements.map((e) => {
          const ElementByType = Element[e.elementType];

          const isActive = e.id === activeElement?.id;

          return (
            <ElementByType
              key={e.id}
              isActive={isActive}
              element={e}
              scale={scale}
            />
          );
        })}
      </div>
      <div className={styles.controlls}>
        <ElementControlls />
      </div>
    </div>
  );
};
