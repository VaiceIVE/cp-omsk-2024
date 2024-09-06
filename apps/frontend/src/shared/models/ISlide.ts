import { ISlideElement } from './ISlideElemnt';

export interface ISlide {
  id: number;
  slideType: SlideType;
  elemnents: ISlideElement[];
}

export enum SlideType {
  Header = 'HEADER',
  BigNumbers = 'BIG_NUMBERS',
  Ending = 'ENDING',
  Chart = 'CHART',
  OneText = 'ONE_TEXT',
  TwoText = 'TWO_TEXT',
  ThreeText = 'THREE_TEXT',
}
