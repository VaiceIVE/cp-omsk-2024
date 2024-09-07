import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IPresentation } from 'shared/models/IPresentstion';

export default class RegenServices {
  static async regenText(
    slideId: number
  ): Promise<AxiosResponse<IPresentation>> {
    return $api.post(`/prediction`);
  }

  static async regenImage(
    slideId: number,
    imageStyle: string
  ): Promise<AxiosResponse<IPresentation>> {
    return $api.post(`/prediction`);
  }

  static async regenSlide(
    slideId: number,
    slideType: string
  ): Promise<AxiosResponse<IPresentation>> {
    return $api.post(`/prediction`);
  }
}
