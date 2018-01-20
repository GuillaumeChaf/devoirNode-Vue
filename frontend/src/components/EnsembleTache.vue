
<template>
  <div class='Taches'>
    <ul>
      <Tache  v-for='tache in taches' :id='tache.id' :title='tache.title' :message='tache.message'> </Tache>
    </ul>
  </div>
</template>

<script>
import Tache from './Tache.vue'
import axios from 'axios'

export default {

  name: 'EnsembleTache',

  data () {
    return {
      taches: []
    }
  },

  components: {
    Tache
  },

  created () {
    axios.get('http://localhost:3000/getTaches', { withCredentials: true })
    .then(response => {
      this.taches = response.data
    })
    .catch(response => {
      console.log('erreur lors de la requete')
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-weight: normal;
  display : block;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.Taches {
  display: flex;
  left: 0px;
  margin: 50px 15px;
}
</style>
