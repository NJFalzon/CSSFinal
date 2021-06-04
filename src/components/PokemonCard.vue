<template>
      <ul class="list-group list-group-flush">
        <router-link class="task-link" :to="{name: 'StatLayout', params:{name: task.id}}">
        <li class="list-group-item"><b>{{maxtitle()}}</b> </li>
        </router-link>
       </ul>
</template>

<script>
export default {
  name: 'Pokemon Card',

  props: {
    task: Object
  },

  methods:{
    maxtitle(){
      return this.task.name.toUpperCase()
    }
  }

}
</script>

<style scoped>

.task-link{
  text-decoration:none;
  color: #2c3e50
}

.list-group-item:hover{
  transform:scale(1.01);
  box-shadow: 0 3px 12px 0;
  margin: 5px

}
</style>
