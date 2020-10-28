<template>
  <div >
    <h2>Loaded the following users IDs</h2>
    <ul>
      <li v-for="user in users.data" :key="user.id">
        <code>{{ user.first_name }} {{ user.last_name }}</code>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "userlist",
  props: {
    users: Object
  }
};
</script>

<style scoped>
</style>
