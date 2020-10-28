<template>
  <div>
    <admin @menuTrigger="triggerMenuPermission($event)" v-if="data.role === 'admin'" :userPayload="data"/>
    <user v-if="data.role === 'user'" :userPayload="data"/>
    <div v-if="data === false">Loading..</div>
  </div>
</template>

<script>
import admin from "./admin";
import user from "./user";
export default {
  name: "userarea",
  components: {
    admin,
    user
  },
  methods:{
    triggerMenuPermission(e){
    this.$emit('permissionForMenu',e)
    }
  },
  computed: {
    data() {
      let user = this.$store.getters.getUserInfo
      if (user.role) {
        return user
      } else {
        return false
      }
    }
  },
}
</script>
<style scoped>

</style>
