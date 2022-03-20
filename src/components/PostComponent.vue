<template>
  <v-card elevation="2">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text>
      <router-link :to="userLink()">{{
        author ? author.name : "Нет автора"
      }}</router-link>
    </v-card-text>
    <v-card-text>{{ post.body }}</v-card-text>
    <v-card-actions>
      <v-btn elevation="0" @click="postLink()">Open post</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import IPost from "@/api/interfaces/IPost";
import IUser from "@/api/interfaces/IUser";
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "PostComponent",
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true,
    },
    author: {
      type: Object as PropType<IUser>,
      required: false,
    },
  },
  methods: {
    postLink() {
      this.$router.push(`posts/${this.post.id}`);
    },
    userLink() {
      return this.author ? `users/${this.post.userId}` : "users/";
    },
  },
});
</script>
