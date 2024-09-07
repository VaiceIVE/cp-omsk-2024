import React from 'react';
import { DraggableEvent } from 'react-draggable';
import { IPresentation } from 'shared/models/IPresentstion';
import { ISlideElement } from 'shared/models/ISlideElement';

export interface IPresentationPageContext {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  slideRef: React.RefObject<HTMLDivElement>;
  leftHeight: number;
  scale: number;
  presentation: IPresentation;
  handleDrag: (
    e: DraggableEvent,
    data: { x: number; y: number },
    slideId: number,
    elementId: number
  ) => void;
  handleClick: (element: ISlideElement) => void;
  activeElement: ISlideElement | null;
  handleSlideClick: (e: React.MouseEvent) => void;
  updateSizeElement: (key: 'width' | 'height', value: number | string) => void;
  handleRegenerate: () => void;
  isProportional: boolean;
  setIsProportional: React.Dispatch<React.SetStateAction<boolean>>;
  updateColorElement: (hex: string) => void;
  updateTypography: (
    key: 'fontSize' | 'fontWeight' | 'fontFamily',
    value: string | number
  ) => void;
}

export const PresentationPageContext =
  React.createContext<IPresentationPageContext | null>(null);
