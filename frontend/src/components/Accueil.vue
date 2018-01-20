
<template>
  <div class="Accueil">
    <div class="flexible">
      <h1> Bienvenue sur le site de <br> Guillaume Chafiol </h1>
      <h2> Le numéro un des sites de Todo list </h2>
      <router-link to="/create" tag="button">Ajouter une tache</router-link>
    </div>
    <EnsembleTache> </EnsembleTache>
  </div>
</template>

<script>
import EnsembleTache from './EnsembleTache.vue'

export default {
  name: 'Accueil',
  components: {
    EnsembleTache
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.flexible {
  position: absolute;
  left: 50%;
}
button{
  background-color: white;
  border : 0.5 solid grey;
}
</style>
