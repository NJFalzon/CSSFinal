<template>
  <div v-if="stat" class="container">
    <h1>{{Uppername()}}</h1>
    <div class="details">
      <p><b>HP:</b> {{stat.stats[0].base_stat}}</p>
      <p><b>Attack:</b> {{stat.stats[1].base_stat}}</p>
      <p><b>Defence:</b> {{stat.stats[2].base_stat}}</p>
      <p><b>SP Attack:</b> {{stat.stats[3].base_stat}}</p>
      <p><b>SP Defence:</b> {{stat.stats[4].base_stat}}</p>
      <p><b>Speed:</b> {{stat.stats[5].base_stat}}</p>
    </div>

    <router-view :stat="stat" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
  </router-view>
  </div>
</template>

<script>
import PokemonAPI from '@/services/PokemonAPI.js'
export default {
  props: ['name'],
  data () {
    return {
      stat: null
    }
  },
  created () {
    PokemonAPI.getStat(this.name)
      .then(response => {
        console.log(response.data)
        this.stat = response.data
      })
      .catch(error => {
        console.log('ERRORS' + error)
      })
  },
  methods: {
    Uppername () {
      return this.stat.species.name.toLowerCase()
    }
  }
}
</script>
<style scoped>
  .container{
    border: black 2px solid;
    max-width: 30rem;
    width:80%;
    margin:15px auto;
    padding:10px;
    color: black;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 10px rgb(82, 82, 82);
  }

  .details{
    text-align: left;
    width: 30%;
    margin: auto;
  }
</style>
