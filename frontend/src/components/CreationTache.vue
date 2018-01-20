<template>
  <div class="creation">
    <form>
      titre de la tâche :<br>
      <input v-model="title" type="text" name="title"><br>
      descripton :<br>
      <input v-model="message" type="text" name="message" ><br>
      <input type="submit" value="Valider" v-on:click="create">
    </form>
    <router-link to="/" tag="button">retour au menu </router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  name: 'DetailTache',
  props:
    ['id', 'title', 'message'],
  data () {
    return {
      action: ''
    }
  },
  created () {
    if (this.id !== undefined) {
      this.action = 'modifiaction'
    } else {
      this.action = 'creation'
    }
  },
  methods: {
    create: function (event) {
      if (this.title !== undefined && this.message !== undefined && this.title.length !== 0 && this.message.length !== 0) {
        var checkNotOnlySpacesTitle = this.title.replace(/\s/g, '').length
        var checkNotOnlySpacesMessage = this.message.replace(/\s/g, '').length
        if (checkNotOnlySpacesTitle && checkNotOnlySpacesMessage) {
          if (this.action === 'creation') {
            axios.post('http://localhost:3000/add/' + this.title + '/' + this.message, '', { withCredentials: true })
            this.$router.push('/')
          } else if (this.action === 'modifiaction') {
            axios.post('http://localhost:3000/update/' + this.id + '/' + this.title + '/' + this.message, '', { withCredentials: true })
            this.$router.push('/')
          }
        } else {
          alert('le titre ou le message ne peut pas contenir que des espaces')
        }
      } else {
        alert('un des champs titre ou description est vide, veuillez les remplir pour créer la tâche')
      }
    }
  }
}
</script>

<style scoped>
.creation{
  border: 2px solid black;
  background-color : #D1D5D5;
}
input{
  margin: 5px;
}
</style>
