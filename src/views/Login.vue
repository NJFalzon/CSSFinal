<template>
  <div class="form">
    <p class="index">Login Detail</p> <input id="details" type="text" v-model.trim="details" placeholder="Email/Phone Number" />
    <p class="index">Password</p> <input id="details" type="password" v-model.trim="passWord" placeholder="Password"/>

    <button class="btn btn-success" @click="login()">Login</button>
    <router-link :to="{name: 'Register'}"><button class="btn btn-primary">Register</button></router-link>
  </div>

</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      details:'',
      passWord: '',
      users: [] 
    }
  },
  inject: ['GStore'],
  methods: {
    login() {
      for(const user in this.users)
      {
         if((this.details == this.users[user].email || this.details == this.users[user].mobile) && this.passWord == this.users[user].password)
         {
            this.$store.dispatch('setAuth', true)
            this.$store.dispatch('setUsername', this.users[user].username)
            this.$store.dispatch('setId', this.users[user].id)
            this.GStore.flashMessage = 'Login Success!'
            this.$router.push({
              name: 'LocalPokemon'
            })
            break;
         }
         else
         {
            this.GStore.flashMessage = 'Incorrect Login Details!!!!'
         }
      }   
    },
    async getLogin() {
     console.log('Getting data')
      try {
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Users.json', { method: 'GET' })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        const users = []
        for (const user in responseData) {
          users.push({
            id: responseData[user].id-1,
            username: responseData[user].username,
            mobile: responseData[user].mobile,
            email:responseData[user].email,
            password: responseData[user].password,
          })
          this.users = users
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getLogin()
  }
}
</script>

<style scoped>
  .form{
    padding: 20px;
    border-radius: 20px;
    background-color: white;
    max-width: 30rem;
    width: 80%;
    margin: 20px auto;
  }
  #details{
    width: 70%;
    float: right;
    clear: right;
  }
  .index{
    float: left;
    clear: left;
    width: 25%;
    margin-top: 3px;
  }

  .btn{
    margin: 10px auto;
  }
</style>
