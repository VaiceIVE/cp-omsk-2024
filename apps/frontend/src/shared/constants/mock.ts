import { ISlide, SlideType } from 'shared/models/ISlide';
import { SlideElementType } from 'shared/models/ISlideElement';

import image from 'shared/assets/image.png';
import { IPresentation } from 'shared/models/IPresentstion';

export const mockPres: IPresentation = {
  slides: [
    {
      id: 0,
      slideType: SlideType.Header,
      elements: [
        {
          id: 0,
          position: {
            x: 80,
            y: 616,
            z: 1,
          },
          elementType: SlideElementType.Text,
          typeography: {
            fontFamily: '',
            fontSize: 80,
            fontWeight: 700,
            color: '#1E1E1E',
            text: 'Длинное название в несколько длинных строки для хакатона 2024',
            width: 1018,
            lineHeight: 96,
          },
          image: null,
          chart: null,
          figure: null,
        },
        {
          id: 1,
          position: {
            x: 1198,
            y: 80,
            z: 1,
          },
          elementType: SlideElementType.Image,
          typeography: null,
          image: {
            width: 642,
            height: 920,
            url: image,
          },
          chart: null,
          figure: null,
        },
      ],
    },
  ],
  id: 0,
  templateId: 0,
};

export const mockSLide: ISlide = {
  id: 0,
  slideType: SlideType.BigNumbers,
  elements: [
    {
      id: 0,
      position: {
        x: 80,
        y: 616,
        z: 1,
      },
      elementType: SlideElementType.Text,
      typeography: {
        fontFamily: '',
        fontSize: 80,
        fontWeight: 700,
        color: '#1E1E1E',
        text: 'Длинное название в несколько длинных строки для хакатона 2024',
        width: 1018,
        lineHeight: 96,
      },
      image: null,
      chart: null,
      figure: null,
    },
    {
      id: 1,
      position: {
        x: 1198,
        y: 80,
        z: 1,
      },
      elementType: SlideElementType.Image,
      typeography: null,
      image: {
        width: 642,
        height: 920,
        url: image,
      },
      chart: null,
      figure: null,
    },
  ],
};
