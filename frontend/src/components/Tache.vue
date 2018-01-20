<template>
  <div>
    <li>
      <h1>{{ title }}</h1>
      <h2>{{ message }}</h2>
      <div class="buttons">
        <router-link :to="{name: 'VisualisationTache', params: {id:id, title:title, message:message}}" tag="button">voir</router-link>
        <router-link :to="{name: 'ModifierTache', params: {id:id, title:title, message:message}}" tag="button">modifier</router-link>
        <button v-on:click="deleted"> supprimer </button>
      </div>
    </li>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailTache',
  props:
    ['id', 'title', 'message'],
  methods: {
    deleted: function () {
      axios.post('http://localhost:3000/delete/' + this.id, 'data', { withCredentials: true })
      .then(response => {
        for (let i = 0; i < this.$parent.taches.length; i++) {
          if (this.$parent.taches[i].id === response.data) {
            this.$parent.taches.splice(i, 1)
            return
          }
        }
      })
      .catch(response => {
        console.log('erreur lors de la requete')
      })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
  word-wrap: break-word;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  width: 275px;
  background-color: #F36767;
  display: inline-block;
  margin: 10px 10px;
  padding: 5px 15px;
}
a {
  color: #42b983;
}
button{
  background-color: white;
  border : 0.5 solid grey;
}
</style>
