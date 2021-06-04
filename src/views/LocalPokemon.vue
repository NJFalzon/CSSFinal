<template>

  <div class="tasks">
  <div  class="card" style="width: 24rem;">
    <div class="card-header">
        <b>Local Pokemon</b>
    </div>
      <div v-if="results.length">
        <div v-for="res in results" :key="res.id">
          <li class="list-group-item">
            <router-link class="task-link" :to="{name: 'ViewLocal', params:{id: res.id}}">
              <b class="task-link">{{capName(res.name)}}</b>
            </router-link>
            <router-link class="task-link" :to="{name: 'DeletePoke', params:{id: res.id}}">
              <button type="button" id="deleteLocal" class="btn btn-danger">x</button>
            </router-link>
          </li>
        </div>
      </div>
      <router-link class="task-link" :to="{name: 'AddPoke'}"><button type="button" id="addlocal" class="btn btn-success">+</button></router-link>
    </div>
    
  </div>

</template>

<script>
export default
{
  data () {
    return {
      results: []
    }
  },

  methods:
  {
    // we can connect this to a button as well
    async getData () {
      console.log('Getting data')
      try {
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Pokemon.json', { method: 'GET' })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        console.log(responseData)
        const results = []
        for (const id in responseData) {
          results.push({
            id: id,
            name: responseData[id].name,
            hp: responseData[id].hp,
            attack: responseData[id].attack,
            spattack: responseData[id].spattack,
            defence: responseData[id].defence,
            spdefence: responseData[id].spdefence,
            speed: responseData[id].speed
          })
          this.results = results
        }
      } catch (error) {
        console.log(error)
      }
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
.tasks
{
  padding: 3%;
}
#deleteLocal{
  padding: 3px 10px;
  float: right;
  margin: -3px 0 0 0;
}

#addlocal{
  margin-top: 15px;
}
.card{
  border-radius: 20px;
  display: flex;
  padding: 2%;
  margin:auto;
  background-color: #2E7EBD;
  color: white;
}

.pagination{
  display: flex;
}

.pagination a{
  flex: 1;
  text-decoration: none;
  color: white
}

#prev{
  padding: 1%;
  text-align: left;
}

#next{
  padding: 1%;
  text-align: right;
}

.task-link{
  text-decoration:none;
  color: #0A1128;
}

.list-group-item:hover{
  transform:scale(1.01);
  box-shadow: 0 3px 12px 0;
  margin: 5px

}

.list-group-item
{
  background-size: 150%;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.473);
  background-position: 50% 35%;
}
</style>
