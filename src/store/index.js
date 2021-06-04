import { createStore } from 'vuex'

const loggedInModule = {
  state () {
    return {
      isloggedIn: 0,
      username: '',
      userId: 0
    }
  },
  mutations: {
    setAuth (state, payload) {
      console.log('In mutation setting isLoggedIn to' + payload)
      state.isLoggedIn = payload
    },
    setUsername(state,payload){
      state.username = payload
    },
    setId(state,payload){
      state.userId = payload
    }
  },
  actions: {
    setAuth (context, payload) {
      console.log(payload)
      context.commit('setAuth', payload)
    },
    setUsername (context, payload) {
      console.log(payload)
      context.commit('setUsername', payload)
    },
    setId (context, payload) {
      console.log(payload)
      context.commit('setId', payload)
    }
  },
  getters: {
    userIsAuthenticated (state) {
      return state.isLoggedIn
    },
    getUsername (state) {
      return state.username
    },
    getId (state) {
      return state.userId
    }
  }
}

const counterModule = {
  state () {
    return {
      counter: 0
    }
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    increase (state, value) {
      state.counter = state.counter + value
    }
  },
  actions: {
    increment (context) {
      setTimeout(function () { context.commit('increment') }, 2000)
    },
    increase (context, value) {
      context.commit('increase', value)
    }
  },
  getters: {
    finalCounter (state) {
      return state.counter
    }
  }
}
export default createStore({
  modules: {
    counter: counterModule,
    loggedIn: loggedInModule
  }
})
