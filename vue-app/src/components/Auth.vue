<template>
  <div>
  <div v-show="isUser" class="form-signin col-md-4 m-auto mt-5">
    <form>
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input type="text" v-model="authForm.userName" class="form-control" placeholder="Username" required="required">
      </div>
      <div class="form-group">
        <input type="password" v-model="authForm.pass" class="form-control" placeholder="Password" required="required">
      </div>
      <div class="form-group">
        <button type="submit" class="mt-3 text-center btn btn-primary btn-block" @click.prevent="onSubmit">Log in</button>
      </div>
    </form>
    <p class="mt-5 mb-3 text-center"><a @click.prevent="isUser = false" href="" >Create an Account</a></p>
  </div>
  <checkemployee @isReturnToLogin="isUser = $event" v-show="!isUser" />
  </div>
</template>

<script>
import checkemployee from "./Containers/auth/checkemployee";
export default {
  name: "Auth",
  components:{
    checkemployee
  },
  data(){
    return{
      authForm:{
        userName: null,
        pass:null
      },
      isUser:true,
    }
  },
  methods:{
    onSubmit(){
      this.$store.dispatch('login',{...this.authForm})
      .then(r=>{
        if (r !== false){
          this.$router.push("/userarea")
        }else{
          alert('wrong login info')
        }
      }).catch(()=>{
        this.$router.push("/auth")
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 340px;
  margin: 50px auto;
  font-size: 15px;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control, .btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>
