<template>
<div class="container">
  <h2 class="headerText">Update Pokemon Info</h2>
    <form @submit.prevent="submitForm">

      <label for="name">Name:</label>
      <input id="name" number="text" v-model.trim="name"/>

      <label for="hp">HP:</label>
      <input id="name"  number="text" v-model.number="hp"/>

      <label for="attack">Attack:</label>
      <input id="attack" type="number" v-model.number="attack"/>

      <label for="spattack">Special Attack:</label>
      <input id="spattack" type="number" v-model.number="spattack"/>

      <label for="defence">Defence:</label>
      <input id="defence" type="number" v-model.number="defence"/>
      
      <label for="spdefence" >Special Defence:</label>
      <input id="spdefence" type="number" v-model.number="spdefence"/>

      <label for="speed">Speed</label>
      <input id="speed" type="number" v-model.number="speed"/>

      <router-link class="task-link" :to="{name: 'ViewLocal', params:{id: id}}"><button type="button" id="back" class="btn btn-secondary">Back</button></router-link>
      <button data-toggle="modal" data-target="#myModal" @click="submitForm" type="button" id="delete" class="btn btn-danger">Yes</button> 

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:  0,
      name:'',
      hp:'',
      spattack:'',
      attack:'',
      defence:'',
      spdefence:'',
      speed:'',
    };
  },
  inject: ['GStore'],
  methods: 
  {
    async submitForm() 
    {
      const id = this.$route.params.id;
      try
      {
        this.GStore.flashMessage = 'Anime ' + this.name + ' was updated'

        this.$router.push({
        name: 'LocalPokemon',
        // the above line of code is optional. id will get populated by default
        })
        //we will submit only if the form does not contain anything invalid
        console.log("Getting data");        
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
    async getData() {
      console.log("Getting data");
      const id = this.$route.params.id;
      try {
          const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Pokemon/' + id + '.json', {
          method: 'GET'
          })
          const responseData = await response.json();
          if (!response.ok) {
          console.log("Something went wrong")
          }
          this.id = responseData.id - 1;
          this.name = responseData.name;
          this.hp = responseData.hp;
          this.attack = responseData.attack;
          this.spattack = responseData.spattack;
          this.defence = responseData.defence;
          this.spdefence = responseData.spdefence;
          this.speed = responseData.speed;
      } catch (error) {
          console.log(error);
      }
    }
  },
  //lifecycle hook which is called before component is shown on the screen but all data is available
  created(){
      //console.log("Yo yo" + this.$route.params.memberId);
      if(typeof this.$route.params.id !== 'undefined')
      {
          console.log("Hey" + this.$route.params.id);
          //console.log(this.$route);
          const animId = this.$route.params.id;
          this.updateMode = true;
          //if no id user will add a member. If there is an id user will update so we need to populate form with data
          if(animId!=='')
          {
              this.getData();
          }
      }
  }

};
</script>

<!--The style block with the scoped attribute will overwrite the global 
styles and will effect this component only. -->
<style scoped>

.container
{
    padding-top: 20px;
}

.headerText
{
    padding: 10px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
}

form {
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 50px;
  background-color: #ffffff;
  margin: auto;
}


label {
    float: left;
    clear: left;
    width: 30%;
    font-weight: bolder;
    color: black;
    text-align: left;
}

input{
  float: right;
  clear: right;
  width: 70%;
  color: black; 
}

label, input{
  padding: 10px, 0;
}
.form-control
{
    position: relative;
    left: 135px;
}


button {
  margin: 10px auto;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  text-align: center;
  align-content: center;
}



button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>