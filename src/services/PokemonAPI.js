import axios from 'axios'

const options = axios.create({
  method: 'GET',
  baseURL: 'https://pokemon-go1.p.rapidapi.com/',
  headers: {
    'x-rapidapi-key': '251f6156a7msh21dd682eca4c9d3p1fec9ajsn28cc8b81a899',
    'x-rapidapi-host': 'pokemon-go1.p.rapidapi.com'
  }
})

const stats = axios.create({
  method: 'GET',
  baseURL: 'https://testpokemon.p.rapidapi.com/pokemon/',
  headers: {
    'x-rapidapi-key': '251f6156a7msh21dd682eca4c9d3p1fec9ajsn28cc8b81a899',
    'x-rapidapi-host': 'testpokemon.p.rapidapi.com'
  }
})

export default {
  getTasks () {
    return options.get('pokemon_names.json')
  },
  getStat (title) {
    return stats.get(title)
  }
}
