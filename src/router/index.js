import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'
import About from '../views/About.vue'

const routes = [
    { path: '/', name: 'Home', component: Home }, // Výchozí cesta
    { path: '/play', name: 'Play', component: Play }, // Stránka Hra
    { path: '/about', name: 'About', component: About }, // Stránka O hře
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
