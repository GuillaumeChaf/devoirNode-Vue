import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/components/Accueil'
import CreationTache from '@/components/CreationTache'
import DetailTache from '@/components/DetailTache'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/create',
      name: 'CreationTache',
      component: CreationTache
    },
    {
      path: '/create/:id/:title/:message',
      name: 'ModifierTache',
      component: CreationTache,
      props: true
    },
    {
      path: '/view/:title/:message',
      name: 'VisualisationTache',
      component: DetailTache,
      props: true
    }
  ]
})
