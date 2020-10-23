<template>
  <div class="form-signin col-md-4 m-auto mt-5">
    <form action="/login" method="post" accept-charset="utf-8" @submit.prevent="onSubmit">
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input type="text" v-model="authForm.userName" class="form-control" placeholder="Username" required="required">
      </div>
      <div class="form-group">
        <input type="password" v-model="authForm.pass" class="form-control" placeholder="Password" required="required">
      </div>
      <div class="form-group">
        <button type="submit" class="mt-3 text-center btn btn-primary btn-block">Log in</button>
      </div>
    </form>
    <p class="mt-5 mb-3 text-center"><a href="#">Create an Account</a></p>
  </div>
</template>

<script>

export default {
  name: "Auth",
  data(){
    return{
      authForm:{
        userName: null,
        pass:null
      },
      isUser:false
    }
  },
  methods:{
    onSubmit(){
      this.$store.dispatch('login',{...this.authForm})
      .then(r=>{
        if (r !== false){
          this.$router.push("/")
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
