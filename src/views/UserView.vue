<template>
  <div class="user">
    <v-card width="640">
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-text>id: {{ user.id }}</v-card-text>
      <v-card-text>username: {{ user.username }}</v-card-text>
      <v-card-text>email: {{ user.email }}</v-card-text>
      <v-card-text>phone: {{ user.phone }}</v-card-text>
      <v-card-text v-if="user.address"> address: {{ address() }} </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import IUser from "@/api/interfaces/IUser";
import UserService from "@/api/services/UserServise";
import Vue from "vue";
interface Data {
  user: IUser;
}

export default Vue.extend({
  name: "UserView",
  data(): Data {
    return {
      user: {} as IUser,
    };
  },
  computed: {
    userId(): number | null {
      return +this.$route.params.userId || null;
    },
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      if (this.userId) {
        this.user = await UserService.loadUserById(this.userId);
      }
    },
    address() {
      return [
        this.user.address.city,
        this.user.address.street,
        this.user.address.suite,
      ].join(", ");
    },
  },
});
</script>

<style lang="scss" scoped>
.user {
  width: 640px;
  height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
}
</style>
