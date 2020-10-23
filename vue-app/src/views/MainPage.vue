<template>

</template>

<script>
import {ref} from 'vue'

export default {
  name: "MainPage",
  setup() {
    let sideToggle = ref(false);
    function toggleSide() {
      sideToggle.value = sideToggle.value === true ? false : true
    }
    return {
      sideToggle,
      toggleSide
    }
  }

}
</script>

<style scoped>

</style>
