import { ISlideElement } from './ISlideElement';

export interface ISlide {
  id: number;
  slideType: SlideType;
  elements: ISlideElement[];
  context: string;
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