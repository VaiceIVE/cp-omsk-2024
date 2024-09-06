import { ISlide } from './ISlide';

export interface IPresentation {
  slides: ISlide[];
  id: number;
  templateId: number;
}
