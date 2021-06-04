<template>
  <div class="container">
        <h2><b>{{UpperCase()}}</b></h2>
        <div class="text"><b>Date of Birth:</b> {{dob}}</div>
        <div class="text"><b>Email: </b>{{email}}</div>
        <div class="text"><b>Mobile: </b>{{countryCodePlus()}} {{mobile}}</div>
        
        <router-link class="task-link" :to="{name: 'PokemonList'}"><button type="button" id="back" class="btn btn-secondary">Back</button></router-link>
        <router-link :to="{name: 'UpdateUser', params:{id: id}}"><button type="button" id="update" class="btn btn-primary">Update</button></router-link>
        <router-link :to="{name: 'DeleteUser', params:{id: id}}"><button type="button" id="delete" class="btn btn-danger">Delete</button></router-link>

  </div>
</template>

<script>
export default {
  data () {
    return {
      id:  0,
      username:'',
      dob:'',
      email:'',
      countrycode:'',
      mobile:'',
    }
  },
  methods: {     
    UpperCase()
    {
      return this.username.toUpperCase()
    },
    countryCodePlus()
    {
      return "+" + this.countrycode
    },
    async getData () {
      console.log('Getting data')
      const id = this.$route.params.id
      try {
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Users/' + id + '.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        console.log(responseData)
        this.id = responseData.id - 1 
        this.dob = responseData.dob
        this.email = responseData.email
        this.mobile = responseData.mobile
        this.countrycode = responseData.contrycode
        this.username = responseData.username
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted () {
    this.getData()
  }
  
}
</script>

<style scoped>

button{
  margin: 5px 3px;
}

.container
{
    position: relative;
    top: 50px;
    display: inline-block;
    max-width: 40rem;
    width: 90%;
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
