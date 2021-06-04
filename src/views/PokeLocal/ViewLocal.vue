<template>
  <div class="container">
    <h2>{{capName(name)}}</h2>

      <div class="text"><b> HP: </b> {{hp}}</div>
      <div class="text"><b> Attack: </b> {{attack}}</div>
      <div class="text"><b> Special Attack: </b> {{spattack}}</div>
      <div class="text"><b> Defence: </b>{{defence}}</div>
      <div class="text"><b> Special Defence: </b> {{spdefence}}</div>
      <div class="text"><b> Speed: </b>{{speed}}</div>

    <router-link class="task-link" :to="{name: 'UpdateInfo', params:{id: id}}"><button type="button" id="update" class="btn btn-primary">Edit</button></router-link>
    <router-link class="task-link" :to="{name: 'LocalPokemon'}"><button type="button" id="back" class="btn btn-secondary">Back</button></router-link>

  </div>
</template>

<script>
export default {
  data () {
    return {
      
      id: 0,
      name:'',
      hp: '',
      attack: '',
      spattack: '',
      defence: '',
      spdefence: '',
      speed: ''

    }
  },
  methods: { 

    async getData () {
      console.log('Getting data')
      const id = this.$route.params.id
      try {
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Pokemon/' + id + '.json', {
          method: 'GET'
        })

        const responseData = await response.json()

        if (!response.ok) {
          console.log('Something went wrong')
        }

        console.log(responseData)
        this.id = responseData.id-1
        this.name = responseData.name
        this.hp = responseData.hp
        this.attack = responseData.attack
        this.spattack = responseData.spattack
        this.defence = responseData.defence
        this.spdefence = responseData.spdefence
        this.speed = responseData.speed

      } 

      catch (error) { console.log(error) }

    },

    capName(name){
      return name.charAt(0).toUpperCase() + name.substring(1)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

#back, #update
{
    position: relative;
    top: 30px;
}

.container
{
  margin: 20px;
  display: inline-block;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0, 0, 0);
  padding: 50px;
  background-color: #ffffff;
  text-align: center;
}

h2
{
  color: black;
}

.text
{
  margin: auto;
  padding: 10px 0 10px 10px;
  color: black;
  text-align: left;
  width: 50%;
  border-left: 3px solid rgb(66, 66, 66);
}

</style>
