<template>
  <div class="post">
    <v-card width="640">
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text
        ><router-link :to="userLink()">
          {{ user.name }}</router-link
        ></v-card-text
      >
      <v-card-text>{{ post.body }}</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import IPost from "@/api/interfaces/IPost";
import IUser from "@/api/interfaces/IUser";
import PostService from "@/api/services/PostService";
import UserService from "@/api/services/UserServise";
import Vue from "vue";
interface Data {
  post: IPost;
  user: IUser;
}

export default Vue.extend({
  name: "PostView",
  data(): Data {
    return {
      post: {} as IPost,
      user: {} as IUser,
    };
  },
  computed: {
    postId(): number | null {
      return +this.$route.params.postId || null;
    },
  },
  async created() {
    await this.loadPost();
    await this.loadUser();
  },
  methods: {
    async loadPost() {
      if (this.postId) {
        this.post = await PostService.loadPost(this.postId);
      }
    },
    async loadUser() {
      if (this.post.userId) {
        this.user = await UserService.loadUserById(this.post.userId);
      }
    },
    userLink() {
      return this.user ? `/users/${this.user.id}` : "/users/";
    },
  },
});
</script>

<style lang="scss" scoped>
.post {
  width: 640px;
  height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
}
</style>
