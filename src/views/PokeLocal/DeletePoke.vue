<template>
  <div class="container">
        <h2>Delete {{name}}</h2>
        <h4>Are You Sure?</h4>
        <router-link class="task-link" :to="{name: 'LocalPokemon'}"><button type="button" @click="deleteRecord" id="back" class="btn btn-danger">Yes</button></router-link>
        <router-link class="task-link" :to="{name: 'LocalPokemon'}"><button type="button" id="back" class="btn btn-secondary">No</button></router-link>

  </div>
 
</template>

<script>
export default {
  data() {
    return {
      id: '',
      name:0,
    };
  },
  methods: {     
    async deleteRecord() {
        const id = this.$route.params.id;
        try
        {
          this.$router.push({
          name: 'LocalPokemon',
          params: { id: 0}
          })
            return fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Pokemon/' + id + '.json',{
                method: 'DELETE'
            }).then(response => response.json)
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

        this.id = responseData.id
        this.name = responseData.name

      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getData();
  },
};

</script>

<style scoped>

#back
{
    position: relative;
    top: 30px;
}

#delete
{
    position: relative;
    top: 30px;
}

.container
{
    position: relative;
    top: 50px;
    display: inline-block;
    max-width: 30rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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
    padding: 10px;
    color: black;
}
</style>