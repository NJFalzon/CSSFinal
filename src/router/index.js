import { createRouter, createWebHistory } from 'vue-router'
import LocalPokemon from '@/views/LocalPokemon.vue'
import ViewLocal from '@/views/PokeLocal/ViewLocal.vue'
import UpdateInfo from '@/views/PokeLocal/UpdateInfo.vue'
import AddPoke from '@/views/PokeLocal/AddPoke.vue'
import DeletePoke from '@/views/PokeLocal/DeletePoke.vue'
import NotFoundComponent from '@/views/NotFoundComponent.vue'

import StatLayout from '@/views/stats/StatLayout.vue'
import PokemonList from '@/views/PokemonList.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import ViewUser from '@/views/ViewUser.vue'
import UpdateUser from '@/views/UpdateUser.vue'
import DeleteUser from '@/views/DeleteUser.vue'

const routes = [
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/addpoke',
    name: 'AddPoke',
    component: AddPoke
  },
  {
    path: '/localpokemon',
    name: 'LocalPokemon',
    component: LocalPokemon
  },
  {
    path: '/updateinfo/:id',
    name: 'UpdateInfo',
    component: UpdateInfo
  },
  {
    path: '/viewlocal/:id',
    name: 'ViewLocal',
    component: ViewLocal
  },
  {
    path: '/delPoke/:id',
    name: 'DeletePoke',
    component: DeletePoke
  },
  {
    path: '/viewuser/:id',
    name: 'ViewUser',
    component: ViewUser
  },
  {
    path: '/updateuser/:id',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/deleteuser/:id',
    name: 'DeleteUser',
    component: DeleteUser
  },
  {
    path: '/',
    name: 'PokemonList',
    component: PokemonList,
  },
  {
    path: '/stat/:name',
    name: 'StatLayout',
    props: true,
    component: StatLayout
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
