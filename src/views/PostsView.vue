<template>
  <div class="home">
    <div class="home__filter">
      <v-card elevation="0">
        <v-card-title>Filter</v-card-title>
        <v-card-actions>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Users
              </v-btn>
              <v-card-text @click="clearFilter">
                {{ filter.name ? "×" : "" }} {{ filter.name }}
              </v-card-text>
            </template>
            <v-list>
              <v-list-item v-for="(item, idx) in users" :key="idx">
                <v-list-item-title @click="applyFilter(item)">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </div>
    <div class="home__posts-container">
      <PostComponent
        v-for="(post, idx) in posts"
        class="home__post"
        :key="idx"
        :post="post"
        :author="getAuthor(post)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import IPost from "@/api/interfaces/IPost";
import IUser from "@/api/interfaces/IUser";
import PostService from "@/api/services/PostService";
import UserService from "@/api/services/UserServise";
import PostComponent from "@/components/PostComponent.vue";
import Vue from "vue";

interface Data {
  posts: IPost[];
  users: IUser[];
  filter: {
    userId: number | null;
    name: string;
  };
}

export default Vue.extend({
  name: "PostsView",
  components: {
    PostComponent,
  },
  data(): Data {
    return {
      posts: [],
      users: [],
      filter: {
        userId: null,
        name: "",
      },
    };
  },
  async created() {
    await this.loadPosts();
    await this.loadUsers();
  },
  methods: {
    async loadPosts() {
      this.posts = [];
      this.posts = await PostService.loadPosts(this.filter.userId || undefined);
    },
    async loadUsers() {
      this.users = [];
      this.users = await UserService.loadUsers();
    },
    applyFilter(user: IUser) {
      this.filter.userId = user.id;
      this.filter.name = user.name;
      this.loadPosts();
    },
    clearFilter() {
      this.filter = {
        userId: null,
        name: "",
      };
      this.loadPosts();
    },
    getAuthor(post: IPost): IUser | undefined {
      return this.users.find((user) => +user.id === +post.userId);
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;

  &__posts-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 12px;
  }
  &__filter {
    padding-left: 12px;
    min-width: 340px;
    max-width: 340px;
  }

  &__post:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
