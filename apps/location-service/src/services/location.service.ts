import { ILocation } from '../interfaces/location.interface';
import { Location } from '../models/Location.model';

class LocationService {
  public async getLocations() {
    return Location.findAll();
  }

  public async getLocationById(id: string) {
    return Location.findByPk(id);
  }

  public async getLocationByOwner(ownerId: string) {
    return Location.findOne({ where: { owner: ownerId } });
  }

  public async createLocation(location: ILocation) {
    const createLocation = await Location.create({
      owner: location.owner,
      name: location.name,
    });
    return createLocation;
  }

  public async updateLocation(id: string, location: ILocation) {
    const updateLocation = await Location.update(
      {
        name: location.name,
      },
      { where: { id } }
    );
    return updateLocation;
  }

  public async deleteLocation(id: string) {
    const deleteLocation = await Location.destroy({ where: { id } });
    return deleteLocation;
  }
}

export default new LocationService();
