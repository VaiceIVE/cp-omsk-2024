import { AxiosResponse } from 'axios';
import $api from 'shared/api';
import { IPresentation } from 'shared/models/IPresentstion';

export default class PresentationServices {
  static async createPresentation(
    text: string,
    changeText: string,
    template: string,
    length: number,
    selectedChart: string,
    docFile: File | null,
    tableFile: File | null
  ): Promise<AxiosResponse<{ id: number }>> {
    const formData = new FormData();

    docFile && formData.append('docFile', docFile);
    tableFile && formData.append('tableFile', tableFile);

    formData.append('text', text);
    formData.append('changeText', changeText);
    formData.append('template', template);
    formData.append('selectedChart', selectedChart);
    formData.append('length', length.toString());

    return $api.post(`/presentation`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async getPresentation(
    id: number
  ): Promise<AxiosResponse<IPresentation>> {
    return $api.get(`/presentation/${id}`);
  }

  static async getPresentations(): Promise<AxiosResponse<IPresentation[]>> {
    return $api.get(`/presentation`);
  }

  static async savePresentation(
    presentation: IPresentation
  ): Promise<AxiosResponse<string>> {
    return $api.post(`/presentation`, { presentation });
  }

  static async exportPresentation(id: number): Promise<AxiosResponse<string>> {
    return $api.get(`/presentation/${id}/export`, {
      responseType: 'blob',
    });
  }
}
