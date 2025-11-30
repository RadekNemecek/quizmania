<template>
     <nav class="main-navigation">
         
         <router-link to="/" @click="playSound('click')">Domů</router-link>
         <router-link to="/play" @click="playSound('click')">Hrát</router-link>
         <router-link to="/leaderboard" @click="playSound('click')">Žebříček</router-link>
         <router-link to="/about" @click="playSound('click')">O hře</router-link>
         <button class="nav-btn mute-btn" @click="toggleMute" :title="isMuted ? 'Zapnout zvuk' : 'Vypnout zvuk'">
             {{ isMuted ? '🔇' : '🔊' }}
         </button>
    </nav>
</template>

<script setup>
import { useSound } from '@/composables/useSound';

const { playSound, toggleMute, isMuted } = useSound();
</script>

<style scoped>
nav {
    display: flex;
    background: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(10px);
    padding: 8px; 
    border-radius: 60px;
    margin-bottom: 25px;
    gap: 10px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    flex-wrap: wrap; 
    justify-content: center;
    align-items: center;
}

a {
    text-decoration: none;
    color: #fff; 
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 40px;
    font-size: 0.95rem;
    text-align: center;
    position: relative;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    border-bottom: none; 
}

a:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
}

a.router-link-active {
    color: #023047; 
    background: linear-gradient(180deg, #FFB703 0%, #fb8500 100%);
    box-shadow: 
        0 4px 0 #c45d00,
        0 5px 10px rgba(0,0,0,0.3);

    border-top: 1px solid rgba(255,255,255,0.5);
    transform: scale(1.05) translateY(-2px);
}

a:active {
    transform: scale(1.05) translateY(2px);
    box-shadow: 
        0 0 0 #c45d00, 
        0 0 0 rgba(0,0,0,0);
}

/* Styl pro mute tlačítko */
.mute-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    transition: background 0.2s;
}

.mute-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>