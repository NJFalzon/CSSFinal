<template>
  <div v-if="!isAuth">
    <router-link class="task-link" :to="{name: 'Login'}">Log In</router-link>
  </div>
  <div v-if="isAuth">
    <router-link class="task-link" @click="logout" :to="{name: 'PokemonList'}">Log Out</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setAuth', false)
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.userIsAuthenticated
    }
  }
}
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.task-link {
  position: relative;
  padding-right: 20px;
  float: right;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .task-link {
    float: none;
    margin: auto;
  }

}
</style>