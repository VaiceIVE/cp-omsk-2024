/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styles from './PresentationPage.module.scss';
import { PresentationWorkspace } from 'widgets/presentation-workspace';

import template1 from 'shared/assets/templates/template1.png';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { PresentationPageContext } from './PresentationPageContext';
import { mockPres } from 'shared/constants/mock';
import { DraggableEvent } from 'react-draggable';
import { ISlideElement, SlideElementType } from 'shared/models/ISlideElement';
import { FormProvider, useForm } from 'react-hook-form';

const PresentationPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [leftHeight, setLeftHeight] = useState(0);
  const [presentation, setPresentation] = useState(mockPres);
  const [scale, setScale] = useState(1);

  const [activeElement, setActiveElement] = useState<ISlideElement | null>(
    null
  );

  const [isProportional, setIsProportional] = useState<boolean>(false);

  const slideRef = useRef<HTMLDivElement>(null);

  const presentationForm = useForm();

  const updateElementPosition = (
    slideId: number,
    elementId: number,
    newPosition: { x: number; y: number }
  ) => {
    setPresentation((prevPresentation) => ({
      ...prevPresentation,
      slides: prevPresentation.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              elements: slide.elements.map((element) =>
                element.id === elementId
                  ? {
                      ...element,
                      position: {
                        ...element.position,
                        x: newPosition.x,
                        y: newPosition.y,
                      },
                    }
                  : element
              ),
            }
          : slide
      ),
    }));
  };

  const updateSizeElement = (
    key: 'width' | 'height',
    value: number | string
  ) => {
    if (activeElement) {
      const updatedValue =
        typeof value === 'string' ? parseFloat(value) : value;
      let newWidth = activeElement.image?.width || 0;
      let newHeight = activeElement.image?.height || 0;

      if (key === 'width') {
        newWidth = updatedValue;
        if (isProportional && activeElement.image) {
          newHeight =
            (updatedValue / activeElement.image.width) *
            activeElement.image.height;
        }
      } else if (key === 'height') {
        newHeight = updatedValue;
        if (isProportional && activeElement.image) {
          newWidth =
            (updatedValue / activeElement.image.height) *
            activeElement.image.width;
        }
      }

      setPresentation((prevPresentation) => ({
        ...prevPresentation,
        slides: prevPresentation.slides.map((slide) => ({
          ...slide,
          elements: slide.elements.map((element) =>
            element.id === activeElement.id
              ? {
                  ...element,
                  image: {
                    ...element.image!,
                    width: newWidth,
                    height: newHeight,
                  },
                }
              : element
          ),
        })),
      }));
    }
  };

  const handleRegenerate = () => {
    if (activeElement?.elementType === SlideElementType.Image) {
      console.log();
    }
  };

  const handleDrag = (
    e: DraggableEvent,
    data: { x: number; y: number },
    slideId: number,
    elementId: number
  ): void => {
    const scaledPosition = {
      x: data.x / scale,
      y: data.y / scale,
    };

    updateElementPosition(slideId, elementId, scaledPosition);
  };

  const handleClick = (element: ISlideElement) => {
    setActiveElement(element);
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActiveElement(null);
    }
  };

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
    <section className={styles.root}>
      <FormProvider {...presentationForm}>
        <PresentationPageContext.Provider
          value={{
            currentSlide,
            setCurrentSlide,
            slideRef,
            leftHeight,
            scale,
            presentation,
            handleDrag,
            handleClick,
            activeElement,
            handleSlideClick,
            updateSizeElement,
            handleRegenerate,
            isProportional,
            setIsProportional,
          }}
        >
          <ul className={styles.slideList}>
            <li className={classNames(styles.slide, styles.active)}>
              <div className={styles.number}>1</div>
              <div className={styles.bg}></div>
              <img alt="cap" src={template1} className={styles.cap} />
            </li>
          </ul>
          <PresentationWorkspace />
        </PresentationPageContext.Provider>
      </FormProvider>
    </section>
  );
};

export default PresentationPage;
