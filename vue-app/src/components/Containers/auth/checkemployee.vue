<template>
  <div>
    <div v-show="!employeeOk" class="form-signin col-md-4 m-auto mt-5">
      <form>
        <h2 class="text-center">Check my id</h2>
        <div class="form-group">
          <input type="text" v-model="employeer.employeeId" class="form-control" placeholder="Enter your employeer Id"
                 required="required">
        </div>
        <div class="form-group">
          <button type="submit" class="mt-3 text-center btn btn-primary btn-block" @click.prevent="checkEmployeer">Start
            registiration
          </button>
        </div>
      </form>
      <p class="mt-5 mb-3 text-center"><a @click.prevent="returnLogin" href="">return to login</a></p>
    </div>
    <register v-show="employeeOk" :registerOkwithIncludedId="employeer"/>
  </div>
</template>

<script>
import register from "./register";

export default {
  name: "checkemployee",
  components: {
    register
  },
  data() {
    return {
      employeer: {
        employeeId: this.$route.params.id,
        userMail: null
      },
      isRoute: false,
      employeeOk: false
    }
  },
  methods: {
    returnLogin() {
      this.$emit('isReturnToLogin', true)
    },
    async checkEmployeer() {
      this.employeeOk = true
      // let isEmployeer = await this.$store.dispatch('register', {employeeId:this.employeer.employeeId})
      // if (isEmployeer){
      //   this.employeer.userMail = isEmployeer.userMail
      //   this.employeeOk = true
      // }else{
      //   alert('Your id not found, enter correct id')
      //   this.employeer.userMail = null
      // }
    }
  }
}
</script>

<style scoped>

</style>