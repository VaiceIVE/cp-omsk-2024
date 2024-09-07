import { SlideType } from 'shared/models/ISlide';
import { SlideElementType } from 'shared/models/ISlideElement';

import image from 'shared/assets/image.png';
import { IPresentation } from 'shared/models/IPresentstion';

export const mockPres: IPresentation = {
  slides: [
    {
      id: 0,
      slideType: SlideType.Header,
      context: '',
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
            fontFamily: 'Manrope',
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
        {
          id: 2,
          position: {
            x: 686.67,
            y: 314,
            z: 0,
          },
          typeography: null,
          image: null,

          chart: null,
          elementType: SlideElementType.Figure,
          figure: {
            width: 546.67,
            height: 627,
            backgroundColor: '#F8F8F8',
            borderRadius: 24,
          },
        },
      ],
    },
    {
      id: 1,
      context: '',
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
            fontFamily: 'Manrope',
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
            x: 686.67,
            y: 314,
            z: 0,
          },
          typeography: null,
          image: null,

          chart: null,
          elementType: SlideElementType.Figure,
          figure: {
            width: 546.67,
            height: 627,
            backgroundColor: '#F8F8F8',
            borderRadius: 24,
          },
        },
      ],
    },
  ],
  id: 0,
  templateId: 0,
};
