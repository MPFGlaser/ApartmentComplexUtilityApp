import axios from 'axios';
import ApiService from './ApiService';

class UserService extends ApiService {
  private url = `${this.baseUrl}/user`;

  public async getDisplayNameByUid(uid: string) {
    if (uid === 'anonymous') {
      return 'Anonymous';
    }

    const response = await axios.get(`${this.url}/${uid}/display-name`);

    return response.data.name;
  }
}

export default new UserService();
