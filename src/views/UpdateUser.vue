<template>
<div class="container">
  <h2 class="headerText">Update Info</h2>
  <form @submit.prevent="submitForm">

    <label for="Username" class="col-md-1 col-form-label">Username</label>
    <input id="Username" class="form-control" type="text" v-model.trim="username"/>

    <label for="password" class="col-md-1 col-form-label">Password</label>
    <input id="password" class="form-control" type="password" v-model.trim="password"/>

    <label for="dob" class="col-md-1 col-form-label">Date of Birth</label>
    <input id="dob" class="form-control" type="date" v-model.trim="dob"/>

    <label for="email" class="col-md-1 col-form-label">Email</label>
    <input id="email" class="form-control" type="email" v-model.trim="email"/>

    <label for="mobile" class="col-md-1 col-form-label">Mobile</label>
    <input id="mobile" class="form-control" type="tel" v-model.trim="mobile"/>
    <select id="countrycode" name="countrycode" class="form-control" v-model.number="countrycode">
        <option value=356>MT</option>
        <option value=380>IT</option>
        <option value=276>DE</option>
        <option value=826>GB</option>
        <option value=840>US</option>
    </select>
    

  <button data-toggle="modal" data-target="#myModal" @click="submitForm" type="button" id="delete" class="btn btn-success">Yes</button> 
  <router-link class="task-link" :to="{name: 'ViewUser'}"><button type="button" id="back" class="btn btn-secondary">Back</button></router-link>
  </form>
</div>
</template>

<script>
export default {
  //emits: ['set-data'],
  data() {
    return {
      id:  0,
      dob:'',
      email:'',
      mobile:'',
      countrycode:'',
      username:'',
      password: '',
      updateMode: false

    };
  },
  methods: 
  {
    async submitForm() 
    {
      try
      {

        this.$router.push({
        name: 'ViewUser'
        })     
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Users/' + this.id + '.json',{
          method: 'PATCH',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              id: this.id + 1 ,
              dob: this.dob,
              email:  this.email,
              mobile: this.mobile,
              contrycode: this.countrycode,
              password: this.password,
              username: this.username
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
      this.$store.dispatch('setUsername', this.username)
    },
    async getData() {
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
        this.username = responseData.username,
        this.password = responseData.password
      } catch (error) {
        console.log(error)
      }
    }
  },
  created(){
      if(typeof this.$route.params.id !== 'undefined')
      {
          const userId = this.$route.params.id;
          this.updateMode = true;
          if(userId!=='')
          {
              this.getData();
          }
      }
  }

};
</script>

<style scoped>

.container
{
    padding-top: 20px;
}

h2
{
    padding: 10px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
}

form {
  display: inline-block;
  max-width: 40rem;
  width: 90%;
  border-radius: 12px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.616);
  padding: 50px;
  background-color: #ffffff;
}

input{
  width: 80%;
  float: right;
  clear: right;
}

label {
    float: left;
    clear: left;
    font-weight: bolder;
    width: 10%;
    color: black; 
}

#cpassword{
    top: 15px;
}

#countrycode
{
  position: relative;
  float: right;
  clear: none;
  width: 20%;
}

#mobile
{
  float: right;
  width: 60%;
  clear: none;
}

button {
  margin: 0 10px;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  text-align: center;
  align-content: center;
}

@media only screen and (max-width: 600px) {
  label{
    width: 100%;
    margin: auto;
    float: none;
  }

  input{
    float: none;
    margin: auto;
  }

  #mobile{
    width: 70%;
    float: right;
    clear: none;
  }

  #countrycode{
    float: left;
    width: 30%;
    clear: none;
  }
}

</style>