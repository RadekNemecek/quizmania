import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'
import About from '../views/About.vue'

const routes = [
    { path: '/', name: 'Home', component: Home }, 
    { path: '/play', name: 'Play', component: Play }, 
    { path: '/about', name: 'About', component: About }, 
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
