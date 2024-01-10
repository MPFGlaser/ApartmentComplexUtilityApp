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

  public async requestAccountDeletion() {
    const response = await axios.delete(`${this.url}/delete-my-data`);

    return response.data;
  }
}

export default new UserService();
