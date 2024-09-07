import { ISlide, SlideType } from 'shared/models/ISlide';
import { SlideElementType } from 'shared/models/ISlideElemnt';

export const mockSLide: ISlide = {
  id: 0,
  slideType: SlideType.BigNumbers,
  elemnents: [
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
      },
      image: null,
      chart: null,
      figure: null,
    },
  ],
};
