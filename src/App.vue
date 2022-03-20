<template>
  <v-app>
    <v-app-bar app color="#222" dark
      ><nav>
        <router-link to="/posts">Posts</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </v-app-bar>

    <v-main class="app-main">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
