<template>
  <div>
    register : {{register}}
    <p>prop : {{registerOkwithIncludedId}}</p>
    <form>
      <h2 class="text-center">Register</h2>
      <div class="form-group">
        <input type="text" :value="this.registerOkwithIncludedId.employeeId" class="form-control" placeholder="Your id" required="required" disabled>
      </div>
      <div class="form-group">
        <input type="email" :value="this.registerOkwithIncludedId.userMail" class="form-control" placeholder="Your mail address" required="required" disabled>
      </div>
      <div class="form-group">
        <input type="text" v-model="register.userName" class="form-control" placeholder="Username" required="required">
      </div>
      <div class="form-group">
        <input type="password" v-model="register.pass" class="form-control" placeholder="Password" required="required">
      </div>
      <div class="form-group">
        <input type="password" v-model="register.passConfirm" class="form-control" placeholder="Password" required="required">
      </div>
      <div class="form-group">
        <button type="submit" class="mt-3 text-center btn btn-primary btn-block" @click.prevent="registerUser">Log in
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "register",
  props: {
    registerOkwithIncludedId: {}
  },
  data() {
    return {
      register:{
        userName:null,
        pass:null,
        passConfirm:null,
      }
    }
  },
  methods:{
    async registerUser(){
        let isRegistered = await this.$store.dispatch('register', this.register)
        if (isRegistered){
          alert('Register successful')
          location.reload()
        }else{
          alert('Register problem')
        }
    }
  },
}
</script>

<style scoped>

</style>