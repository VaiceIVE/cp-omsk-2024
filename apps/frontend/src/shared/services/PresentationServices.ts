import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IPresentation } from 'shared/models/IPresentstion';

export default class PresentationServices {
  static async createPresentation(
    slideId: number
  ): Promise<AxiosResponse<string>> {
    return $api.post(`/prediction`);
  }

  static async getPresentation(
    id: number
  ): Promise<AxiosResponse<IPresentation>> {
    return $api.get(`/prediction`);
  }

  static async savePresentation(id: number): Promise<AxiosResponse<string>> {
    return $api.get(`/prediction`);
  }

  static async exportPresentation(id: number): Promise<AxiosResponse<string>> {
    return $api.get(`/prediction`);
  }
}
