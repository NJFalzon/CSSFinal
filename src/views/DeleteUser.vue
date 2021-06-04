<template>
  <div class="container">
    <h2>Are You Sure?</h2>
    <p>You want to delete</p>
    <router-link class="task-link" :to="{name: 'ViewUser'}"><button type="button" id="back" class="btn btn-secondary">No</button></router-link>
    <button data-toggle="modal" data-target="#myModal" @click="deleteRecord" type="button" id="delete" class="btn btn-danger">Yes</button> 
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      dob:'',
      email:'',
      mobile:'',
      countrycode:'',
      username:'',
      deleteMode: true
    };
  },
  inject: ['GStore'],
  methods: {    
    UpperCase()
    {
       return this.username.toUpperCase()
    },
    countryCodePlus()
    {
      return "+" + this.countrycode
    }, 
    async deleteRecord() {
        const id = this.$route.params.id;
        try
        {
          this.GStore.flashMessage = this.username + ' was deleted'
          this.$store.dispatch('setAuth', false)
          this.$router.push({
            name: 'ViewUser'
          })

          // the above line of code is optional. id will get populated by default
            return fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Users/' + id + '.json',{
                method: 'DELETE'
            }).then(response => response.json)
        }
        catch(error)
        {
            console.log(error);
        }      
    },  
    async getData() {
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
        this.dob = responseData.dob
        this.email = responseData.email
        this.mobile = responseData.mobile
        this.countrycode = responseData.countrycode
        this.username = responseData.username
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getData();
  },
};

</script>

<style scoped>

button{
  width: 70px;
  margin: auto;
  margin: 10px;
}

.container
{
  margin: 20px 0;
  display: inline-block;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.8);
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

p
{
  color: black;
}
</style>