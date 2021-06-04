<template>
<div class="container">
    <h2 class="headerText">Register</h2>
    <form @submit.prevent="submitForm">
        <div class="form-group row">
            <label for="Username" class="col-md-1 col-form-label">Username</label>
            <div class="col-sm-6">
              <input id="Username" class="form-control" type="text" v-model.trim="username"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="password" class="col-md-1 col-form-label">Password</label>
            <div class="col-sm-6">
              <input id="password" class="form-control" type="password" v-model.trim="password"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="dob" class="col-md-1 col-form-label">Date of Birth</label>
            <div class="col-sm-6">
              <input id="dob" class="form-control" type="date" v-model.trim="dob"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="email" class="col-md-1 col-form-label">Email</label>
            <div class="col-sm-6">
            <input id="email" class="form-control" type="email" v-model.trim="email"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="mobile" class="col-md-1 col-form-label">Mobile</label>
            <div class="col-sm-6">
                <select id="countrycode" name="countrycode" class="form-control" v-model.number="countrycode">
                    <option value=356>MT</option>
                    <option value=380>IT</option>
                    <option value=276>DE</option>
                    <option value=826>GB</option>
                    <option value=840>US</option>
                </select>
                <input id="mobile" class="form-control" type="tel" v-model.trim="mobile"/>
            </div>
        </div>
        <div class="form-group col-md-6">   
            <router-link class="task-link" :to="{name: 'LocalPokemon'}"><button type="button" id="back" class="btn btn-secondary">Back</button></router-link>
            <!--<div v-if="$v.$anyError" class="text-danger">Please fill in all fields correctly.</div>-->
            <button data-toggle="modal" data-target="#myModal" @click="submitForm" type="button" id="delete" class="btn btn-success">Yes</button> 
        </div>
  </form>
</div>
</template>

<script>
export default {
  //emits: ['set-data'],
  data() {
    return {
      id:  0,
      username:'',
      password:'',
      dob:'',
      email:'',
      countrycode:'',
      mobile:'',
      updateMode: false
    };
  },
  inject: ['GStore'],
  methods: 
  {
    async submitForm() 
    {
      try
      {
        this.GStore.flashMessage = 'User ' + this.username + ' registered'

        this.$router.push({
        name: 'Login',
        })
        //we will submit only if the form does not contain anything invalid
        console.log("Getting data");        
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Users/' + this.id + '.json',{
          method: 'PATCH',
          headers:
          {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
              id: this.id + 1 ,
              username: this.username,
              password:  this.password,
              dob: this.dob,
              email: this.email,
              contrycode: this.countrycode,
              mobile: this.mobile
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
      const uid = this.$route.params.id
      try {
        const response = await fetch('https://css2final-default-rtdb.europe-west1.firebasedatabase.app/Users.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        this.id = responseData.length
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
  margin-left: 22%;
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

#cpassword{
    position: relative;
    top: 15px;
}

#countrycode
{
    width: 35%;

    
}

#mobile
{
    position: relative;
    bottom:38px;
    width: 60%;
    left: 240px;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  text-align: center;
  align-content: center;
  margin-left: 14rem ;
}

#back
{
    position: relative;
    right: 100px;
}

#submit
{
    position: relative;
    left: 50px;
    bottom: 49px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>