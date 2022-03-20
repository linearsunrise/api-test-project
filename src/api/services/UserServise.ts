import IUser from "../interfaces/IUser";
import api from "../requests";
import ApiUrls from "../urls";

export default class UserService {
  static async loadUserById(id: number): Promise<IUser> {
    return api.get<IUser>(`${ApiUrls.USERS}/${id}`).then((res) => res.data);
  }
  static async loadUsers(): Promise<IUser[]> {
    return api.get<IUser[]>(ApiUrls.USERS).then((res) => res.data);
  }
}
