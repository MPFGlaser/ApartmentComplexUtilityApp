import axios, { AxiosResponse } from 'axios';
import ApiService from './ApiService';
import { ILocation } from '../interfaces/location.interface';

class LocationService extends ApiService {
  private url = `${this.baseUrl}/location`;

  public async getLocations() {
    const response: AxiosResponse<ILocation[]> = await axios.get(this.url);

    return response.data;
  }

  public async getLocationById(id: string) {
    const response: AxiosResponse<ILocation> = await axios.get(
      `${this.url}/${id}`
    );

    return response.data;
  }

  public async getOwnLocation() {
    const response: AxiosResponse<ILocation> = await axios.get(
      `${this.url}/by-owner/me`
    );

    return response.data;
  }

  public async getLocationByOwnerId(ownerId: string) {
    const response: AxiosResponse<ILocation> = await axios.get(
      `${this.url}/by-owner/${ownerId}`
    );

    return response.data;
  }

  public async createLocation(location: ILocation) {
    const response = await axios.post(this.url, location);

    return response.data;
  }

  public async updateLocation(location: ILocation) {
    const response: AxiosResponse<ILocation> = await axios.put(
      `${this.url}/${location.id}`,
      location
    );

    return response.data;
  }

  public async deleteLocation(id: string) {
    const response = await axios.delete(`${this.url}/${id}`);

    return response.data;
  }
}

export default new LocationService();
