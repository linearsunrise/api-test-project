import IPost from "../interfaces/IPost";
import api from "../requests";
import ApiUrls from "../urls";

export default class PostService {
  static async loadPosts(userId?: number): Promise<IPost[]> {
    return api
      .get<IPost[]>(ApiUrls.POSTS, {
        params: {
          userId: userId && userId.toString(),
        },
      })
      .then((res) => res.data);
  }
  static async loadPost(postId?: number): Promise<IPost> {
    return api.get<IPost>(`${ApiUrls.POSTS}/${postId}`).then((res) => res.data);
  }
}
