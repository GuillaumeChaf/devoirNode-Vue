<template>
  <div>
    <div class="DetailTache">
      <h1>{{ title }}</h1>
      <h2>{{ message }}</h2>
    </div>
    <router-link to="/" tag="button">retour au menu </router-link>
  </div>
</template>

<script>
export default {
  name: 'DetailTache',
  props:
    ['id', 'title', 'message']
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
},
.DetailTache {
  background-color: #FB8B40
}
</style>
