<template>
  <div>{{ getUserInfo() }}</div>
</template>

<script>
export default {
  name: "userarea",
  methods: {
    getUserInfo(){
     let getted = this.$store.getters.getUserInfo
      if (getted){
        return getted
      }else{
        return 'Loading..'
      }
    }
  }
}
</script>
<style scoped>

</style>
