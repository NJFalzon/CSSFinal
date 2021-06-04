<template>
<div class="container">
    <h2 class="headerText">Add Custom Pokemon</h2>
    <form @submit.prevent="submitForm">
        <div class="form-group row">
            <label for="name" class="col-md-1 col-form-label">Name</label>
            <div class="col-sm-6">
              <input id="name" class="form-control" type="text" v-model.trim="name"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="hp" class="col-md-1 col-form-label">HP</label>
            <div class="col-sm-6">
              <input id="hp" class="form-control" type="number" v-model.number="hp"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="attack" class="col-md-1 col-form-label">Attack</label>
            <div class="col-sm-6">
              <input id="attack" class="form-control" type="number" v-model.number="attack"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="spattack" class="col-md-1 col-form-label">Special Attack</label>
            <div class="col-sm-6">
                <input id="spattack" class="form-control" type="number" v-model.number="spattack"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="defence" class="col-md-1 col-form-label">Defence</label>
            <div class="col-sm-6">
              <input id="defence" class="form-control" type="number" v-model.number="defence"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="spdefence" class="col-md-1 col-form-label">Special Defences</label>
            <div class="col-sm-6">
              <input id="spdefence" class="form-control" type="number" v-model.number="spdefence"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="speed" class="col-md-1 col-form-label">Speed</label>
            <div class="col-sm-6">
              <input id="speed" class="form-control" type="number" v-model.number="speed"/>
            </div>
        </div>
          <router-link class="task-link" :to="{name: 'LocalPokemon'}"><button type="button" id="back" class="btn btn-secondary">Back</button></router-link>
          <button data-toggle="modal" data-target="#myModal" @click="submitForm" type="button" id="delete" class="btn btn-success">Done</button> 
  </form>
</div>
</template>

<script>
export default {
  //emits: ['set-data'],
  data() {
    return {
      id:  0,
      name:'',
      hp:0,
      attack:0,
      spattack:0,
      defence:0,
      spdefence:0,
      speed:0
    };
  },
  methods: 
  {
    async submitForm() 
    {
      try
      {
        this.$router.push({
        name: 'LocalPokemon'
        })     
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Pokemon/' + this.id + '.json',{
          method: 'PATCH',
          headers:
          {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
              id: this.id + 1 ,
              name: this.name,
              hp: this.hp,
              attack:  this.attack,
              spattack: this.spattack,
              defence: this.defence,
              spdefence: this.spdefence,
              speed: this.speed

          })
        })
        if(!response.ok){
        console.log("Something went wrong");
        }
      }
      catch(error)
      {
          console.log(error);
      }
    },
    async getData () {
      console.log('Getting data')
      const id = this.$route.params.id
      try {
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Pokemon.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        console.log(responseData)
        this.id = responseData.length
        console(this.id)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

.container
{
    padding-top: 20px;
}


.text-danger
{
    position: relative;
    padding: 10px;
    left: 190px;
}

.headerText
{
    padding: 10px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
}

form {
  display: inline-block;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 50px;
  background-color: #ffffff;
}


label {
    float: left;
    font-weight: bolder;
    width: 500px;
    color: black; 
}

.form-control
{
    position: relative;
    left: 135px;
}

button {
  font: inherit;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  text-align: center;
  align-content: center;
  margin: auto;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>