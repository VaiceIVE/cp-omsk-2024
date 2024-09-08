/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { PresentationPageContext } from './PresentationPageContext';
import { mockPres } from 'shared/constants/mock';
import { DraggableEvent } from 'react-draggable';
import { ISlideElement, SlideElementType } from 'shared/models/ISlideElement';
import { PresentationWorkspace } from 'widgets/presentation-workspace';
import FileDownload from 'js-file-download';

import template1 from 'shared/assets/templates/template1.png';
import template2 from 'shared/assets/templates/template2.png';
import template3 from 'shared/assets/templates/template3.png';

import styles from './PresentationPage.module.scss';
import { Navigate, useParams } from 'react-router-dom';
import { HOME_ROUTE } from 'shared/constants/const';
import RegenServices from 'shared/services/RegenServices';
import PresentationServices from 'shared/services/PresentationServices';
import { IPresentation } from 'shared/models/IPresentstion';
import { Header } from 'widgets/header';

const templates: Record<number, string> = {
  0: template1,
  1: template2,
  2: template3,
};

const PresentationPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [leftHeight, setLeftHeight] = useState(0);
  const [presentation, setPresentation] = useState<IPresentation | null>(null);
  const [scale, setScale] = useState(1);

  const [loading, setLoading] = useState(false);

  const [activeElement, setActiveElement] = useState<ISlideElement | null>(
    null
  );

  const [isProportional, setIsProportional] = useState<boolean>(false);

  const slideRef = useRef<HTMLDivElement>(null);

  const presentationForm = useForm();

  const currentSlideId = presentation?.slides[currentSlide].id;

  const { id } = useParams();

  const getPresentation = async (id: string) => {
    try {
      setLoading(true);

      //const response = await PresentationServices.getPresentation(+id);
      const response = { data: mockPres };

      if (response.data) {
        setPresentation(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onExport = async () => {
    if (presentation) {
      try {
        setLoading(true);
        const response = await PresentationServices.exportPresentation(
          presentation.id
        );

        if (response.data) {
          FileDownload(response.data, 'Report.xlsx');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSave = async () => {
    if (presentation) {
      try {
        setLoading(true);
        await PresentationServices.savePresentation(presentation);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateElementPosition = (
    slideId: number,
    elementId: number,
    newPosition: { x: number; y: number }
  ) => {
    setPresentation((prevPresentation) => {
      if (!prevPresentation) return null;

      return {
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
      };
    });
  };

  const updateSizeElement = (
    slideId: number,
    key: 'width' | 'height',
    value: number | string
  ) => {
    if (activeElement) {
      const updatedValue =
        typeof value === 'string' ? parseFloat(value) : value;

      let newWidth =
        activeElement.image?.width || activeElement.figure?.width || 0;
      let newHeight =
        activeElement.image?.height || activeElement.figure?.height || 0;

      if (key === 'width') {
        newWidth = updatedValue;
        if (isProportional) {
          if (activeElement.image) {
            newHeight =
              (updatedValue / activeElement.image.width) *
              activeElement.image.height;
          } else if (activeElement.figure) {
            newHeight =
              (updatedValue / activeElement.figure.width) *
              activeElement.figure.height;
          }
        }
      } else if (key === 'height') {
        newHeight = updatedValue;
        if (isProportional) {
          if (activeElement.image) {
            newWidth =
              (updatedValue / activeElement.image.height) *
              activeElement.image.width;
          } else if (activeElement.figure) {
            newWidth =
              (updatedValue / activeElement.figure.height) *
              activeElement.figure.width;
          }
        }
      }

      setPresentation((prevPresentation) => {
        if (!prevPresentation) return null;

        return {
          ...prevPresentation,
          slides: prevPresentation.slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  elements: slide.elements.map((element) =>
                    element.id === activeElement.id
                      ? {
                          ...element,
                          image: activeElement.image
                            ? {
                                ...element.image!,
                                width: newWidth,
                                height: newHeight,
                              }
                            : element.image,
                          figure: activeElement.figure
                            ? {
                                ...element.figure!,
                                width: newWidth,
                                height: newHeight,
                              }
                            : element.figure,
                        }
                      : element
                  ),
                }
              : slide
          ),
        };
      });

      if (key === 'width') {
        presentationForm.setValue('height', newHeight);
      } else {
        presentationForm.setValue('width', newWidth);
      }
    }
  };

  const updateColorElement = (slideId: number, hex: string) => {
    if (activeElement) {
      setPresentation((prevPresentation) => {
        if (!prevPresentation) return null;

        return {
          ...prevPresentation,
          slides: prevPresentation.slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  elements: slide.elements.map((element) =>
                    element.id === activeElement.id
                      ? {
                          ...element,
                          typeography: activeElement.typeography
                            ? {
                                ...element.typeography!,
                                color: hex,
                              }
                            : element.typeography,
                          figure: activeElement.figure
                            ? {
                                ...element.figure!,
                                backgroundColor: hex,
                              }
                            : element.figure,
                        }
                      : element
                  ),
                }
              : slide
          ),
        };
      });
    }
  };

  const updateTypography = (
    slideId: number,
    key: 'fontSize' | 'fontWeight' | 'fontFamily' | 'text',
    value: string | number
  ) => {
    if (activeElement && activeElement.typeography) {
      setPresentation((prevPresentation) => {
        if (!prevPresentation) return null;

        return {
          ...prevPresentation,
          slides: prevPresentation.slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  elements: slide.elements.map((element) =>
                    element.id === activeElement.id
                      ? {
                          ...element,
                          typeography: {
                            ...element.typeography!,
                            [key]: value,
                          },
                        }
                      : element
                  ),
                }
              : slide
          ),
        };
      });
    }
  };

  const updateBorderRadius = (slideId: number, value: string) => {
    if (activeElement && activeElement.figure) {
      setPresentation((prevPresentation) => {
        if (!prevPresentation) return null;

        return {
          ...prevPresentation,
          slides: prevPresentation.slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  elements: slide.elements.map((element) =>
                    element.id === activeElement.id
                      ? {
                          ...element,
                          figure: {
                            ...element.figure!,
                            borderRadius: +value,
                          },
                        }
                      : element
                  ),
                }
              : slide
          ),
        };
      });
    }
  };

  const handleRegenerate = async () => {
    if (!currentSlideId) return;

    if (!activeElement) {
      const slideType = presentationForm.getValues('slideType');

      await RegenServices.regenSlide(currentSlideId, slideType);
    } else if (activeElement?.elementType === SlideElementType.Image) {
      const imageStyle = presentationForm.getValues('style');

      await RegenServices.regenImage(currentSlideId, imageStyle);
    } else {
      await RegenServices.regenText(currentSlideId);
    }
  };

  const handleStop = (
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
    setActiveElement(null);
    setIsProportional(false);
  }, [currentSlide]);

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

  useEffect(() => {
    if (id) {
      getPresentation(id);
    }
  }, [id]);

  if (!id) return <Navigate replace to={HOME_ROUTE} />;

  return (
    <section className={styles.root}>
      <Header loading={loading} onExport={onExport} onSave={onSave} />
      <FormProvider {...presentationForm}>
        <PresentationPageContext.Provider
          value={{
            currentSlide,
            setCurrentSlide,
            slideRef,
            leftHeight,
            scale,
            presentation,
            handleStop,
            handleClick,
            activeElement,
            handleSlideClick,
            updateSizeElement,
            handleRegenerate,
            isProportional,
            setIsProportional,
            updateColorElement,
            updateTypography,
            currentSlideId,
            updateBorderRadius,
          }}
        >
          <ul className={styles.slideList}>
            {presentation?.slides.map((s, index) => (
              <li
                key={s.id}
                className={classNames(styles.slide, {
                  [styles.active]: index === currentSlide,
                })}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              >
                <div className={styles.number}>{index + 1}</div>
                <div className={styles.bg}></div>
                <img
                  alt="cap"
                  src={templates[presentation.templateId]}
                  className={styles.cap}
                />
              </li>
            ))}
          </ul>
          <PresentationWorkspace />
        </PresentationPageContext.Provider>
      </FormProvider>
    </section>
  );
};

export default PresentationPage;
