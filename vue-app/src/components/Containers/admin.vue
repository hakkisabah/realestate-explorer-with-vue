<template>
  <div class="col-md-6 m-auto">
    <h2 class="text-center">{{ userPayload.role }} area</h2>
    <form>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label for="username">Employee Id</label>
            <input type="text" class="form-control" readonly name="employeeId" id="employeeId"
                   :value="userPayload.employeeId">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="username">User Post Code</label>
            <input
                type="text"
                class="form-control"
                :class="{'is-invalid':$v.updated.userPostCode.$model.result ===false}"
                name="userPostCode"
                id="userPostCode"
                v-model="userPayload.userPostCode"
                v-on:keyup="checkForm('postCodeChecker',userPayload.userPostCode)"
                @blur="$v.updated.userPostCode.$touch()">
            <small v-if="!postCodeStatus">Post code loading..</small>
            <small v-else-if="updated.userPostCode !== '' && !$v.updated.userPostCode.check"
                   class="form-text text-danger">Address
              not find</small>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="username">User Name</label>
            <input type="text" class="form-control" readonly name="userName" id="userName"
                   :value="userPayload.userName">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="usermail">Email Address</label>
            <input type="text" class="form-control" readonly id="userMail"
                   :value="userPayload.userMail">
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="pass">Pass</label>
            <input
                type="password"
                class="form-control"
                :class="{'is-invalid':$v.updated.pass.$error}"
                name="pass"
                id="pass"
                v-model="updated.pass"
                @blur="$v.updated.pass.$touch()">
            <small v-if="!$v.updated.pass.alphaNum" class="form-text text-danger">Your pass must only alpha
              numeric</small>
            <small v-if="!$v.updated.pass.minLength" class="form-text text-danger">Your pass min length must
              {{ $v.updated.pass.$params.minLength.min }} character</small>
            <small v-if="!$v.updated.pass.maxLength" class="form-text text-danger">Your pass max length must
              {{ $v.updated.pass.$params.maxLength.max }} character</small>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="passConfirm">Pass Confirm</label>
            <input
                type="password"
                class="form-control"
                :class="{'is-invalid':$v.updated.passConfirm.$error}"
                name="passConfirm"
                id="passConfirm"
                v-model="updated.passConfirm"
                @blur="$v.updated.passConfirm.$touch()">
          </div>
          <small v-if="!$v.updated.passConfirm.sameAs" class="form-text text-danger">Your pass doest not
            match</small>
        </div>
        <input type="hidden" id="#selectedAvatar" name="selectedAvatar" value="">
      </div>

      <div class="row">
        <div class="col-12 col-sm-4 mt-3">
          <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="submit">Update</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import {minLength, maxLength, sameAs, alphaNum} from "vuelidate/lib/validators"

export default {
  name: "admin",
  props: {
    userPayload: {}
  },
  data() {
    return {
      updated: {
        pass: '',
        passConfirm: '',
        userPostCode: this.userPayload.userPostCode,
      },
      postCodeStatus: false
    }
  },
  validations: {
    updated: {
      userPostCode: {
        check(val, vm) {
          // if postcode api ok we validate this
          return vm.userPostCode.postcode && !vm.userPostCode.result !== false ? true : false
        }
      },
      pass: {
        alphaNum,
        minLength: minLength(4),
        maxLength: maxLength(20),
      },
      passConfirm: {
        sameAs: sameAs('pass')
      },
    }

  },
  methods: {
    checkForm(functionName, value) {
      let isPostCode = this.$store.dispatch(functionName, value)
      isPostCode.then(result => {
        this.postCodeStatus = true
        if (result.data.success) {
          this.updated.userPostCode = result.data.result.result
          return this.userPayload.userPostCode
        } else {
          if (result.data.token === false) {
            this.$store.dispatch('autoLogout')
            this.$router.push("/auth")
          } else {
            this.updated.userPostCode = result.data
          }
        }
      })
    },
    submit() {
      let updated = {
        userPostCode: this.updated.userPostCode.postcode.split(' ').join(''),
      }
      if (this.updated.pass) {
        updated['pass'] = this.updated.pass
      }
      let updatedUserInfo = this.$store.dispatch('updateUser', updated)
      if (updatedUserInfo.userPostCode) {
        this.userPayload = updatedUserInfo
      }

      // we clear pass fields
      this.updated.pass = ''
      this.updated.passConfirm = ''
    }
  },
  created() {
    // we manipulated userPostCode with updated data props and we need when every load check this
    this.checkForm('postCodeChecker', this.userPayload.userPostCode)
  },
  beforeCreate() {
    this.$emit('menuTrigger', true)
  }
};
</script>

<style scoped>

</style>
