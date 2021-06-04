<template>
  <div class="tasks">
  <div class="card" style="width: 24rem;">
    <div class="card-header"> <b>List of Pokemon</b> </div>
    <transition-group tag="ul" appear name="slide-up" class="list-group list-group-flush">
      <PokemonCard v-for="task in tasks" :key="task.name" :task="task"/>
    </transition-group>
    </div>
  </div>

</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import PokemonAPI from '@/services/PokemonAPI.js'

export default {
  name: 'PokemonList',
  data () {
    return {
      tasks: null,
      lessTasks: null,
      totalTasks: 0
    }
  },

  created () {
    PokemonAPI.getTasks()
      .then(response => {
        this.tasks = response.data
        this.totalTasks = Object.keys(this.tasks).length
      })
      .catch(error => {
        console.log('ERRRORS' + error)
      })
  },

  components: {
    PokemonCard
  }
}
</script>

<style scoped>

.card{
  margin:auto;
}
.card-header{
  font-size:2em
}
</style>
