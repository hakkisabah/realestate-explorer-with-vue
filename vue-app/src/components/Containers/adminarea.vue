<template>
  <div v-if="error">{{ error }}</div>
  <AsyncUser v-else :users="users" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import Loading from "../Infos/Loading.vue";
import useUsers from "../../modules/users";
const AsyncUser = defineAsyncComponent({
  loader: () => import("./userlist.vue" /* webpackChunkName: "userlist" */),
  loadingComponent: Loading,
  delay: 200,
  suspensible: false
});
export default {
  name: "adminarea",
  async setup() {
    const { users, error, load } = useUsers();
    await load();
    return { users, error };
  },
  components: {
    AsyncUser
  }
};
</script>

<style scoped>

</style>
