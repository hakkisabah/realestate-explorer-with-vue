<template>
  <div class="col-md-6 m-auto">
    <p>employees</p>
    <p>{{ employees }}</p>
    <form>
      <div class="row">
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="employeeemail">Employee Email</label>
            <input
                type="text"
                class="form-control"
                :class="{'is-invalid':$v.userMail ===false}"
                name="userMail"
                id="userMail"
                v-model="userMail"
            />
            <small v-if="!$v.userMail.email" class="form-text text-danger">Mail not valid !</small>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 mt-3">
        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @click.prevent="submit">Create Employeer
          Id
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import {email} from "vuelidate/lib/validators"

export default {
  name: "employeeprocess",
  data() {
    return {
      userMail: null,
    }
  },
  validations: {
    userMail: {
      email
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('createEmployeeId', {userMail: this.userMail})
      this.userMail = ''
    },
  },
  computed: {
    employees() {
      let emp = this.$store.getters.getUserInfo
      if (emp.employees) {
        return emp.employees
      } else {
        return 'No have employees'
      }
    }
  },
}
</script>

<style scoped>

</style>