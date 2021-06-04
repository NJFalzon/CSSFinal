<template>

  <div id="nav">

    <base-container title="Vuex" v-if="isAuth">
      <router-link :to="{name: 'ViewUser', params:{id: getUserID}}"><b>Welcome {{ initial() }} </b></router-link> |
      <router-link :to="{name: 'LocalPokemon'}">Community Pokemon</router-link> |
    </base-container>

    <router-link :to="{name: 'PokemonList'}">Pokemon</router-link>
    <base-container title="Auth">
      <auth-user></auth-user>
    </base-container>

  </div>

  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import AuthUser from './components/AuthUser.vue'

export default {
  components: {
    AuthUser
  },
  methods: {
    initial(){
      return this.getUsername.charAt(0).toUpperCase()
    }

  },
  computed: {
    isAuth () {
      return this.$store.getters.userIsAuthenticated
    },
    getUsername(){
      console.log(this.$store.getters.getUsername)
      return this.$store.getters.getUsername
    },
    getUserID(){
      return this.$store.getters.getId
    }
  }
}
</script>

<style>

#app {
  width:100%;
  margin:auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

body {
  background-image: url("https://i.imgur.com/YOcqTky.jpg"), linear-gradient(180deg, rgba(255,150,0,255) 0%, rgba(255,200,1,255) 100%);
  background-repeat: no-repeat;
  background-position: center, center;
  background-attachment: fixed;
  background-size: 100%
}

#nav {
  background-color: #2E7EBD;
  width: 100%;
  padding: 30px 0 30px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: white;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-leave-active {
  transition: opacity 1s ease-in;
}

.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.slide-fade-enter-from{
  transform: translateX(-50px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}

.slide-up-enter-from{
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 1s ease;
}
</style>
