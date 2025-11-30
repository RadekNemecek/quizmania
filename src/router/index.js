import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'
import About from '../views/About.vue'
import Leaderboard from '../views/Leaderboard.vue'

const routes = [
    { path: '/', name: 'Home', component: Home }, 
    { path: '/play', name: 'Play', component: Play }, 
    { path: '/about', name: 'About', component: About }, 
    { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
