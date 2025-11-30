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
    padding: 5px; /* Zmenšeno z 8px */
    border-radius: 60px;
    margin-bottom: 25px;
    gap: 5px; /* Zmenšeno z 10px */
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    flex-wrap: nowrap; /* Zabrání zalomení na nový řádek */
    justify-content: center;
    align-items: center;
    overflow-x: auto; /* Kdyby to jo nevyšlo, půjde posouvat do boku */
}

a {
    text-decoration: none;
    color: #fff; 
    font-weight: 700;
    padding: 8px 15px; /* Zmenšeno padding */
    border-radius: 40px;
    font-size: 0.9rem; /* Trochu menší písmo */
    text-align: center;
    position: relative;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    border-bottom: none; 
    white-space: nowrap; /* Text se nebude lámat */
}

a:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
}

a.router-link-active {
    color: #023047; 
    background: linear-gradient(180deg, #FFB703 0%, #fb8500 100%);
    box-shadow: 0 4px 0 #c45d00, 0 5px 10px rgba(0,0,0,0.3);
    border-top: 1px solid rgba(255,255,255,0.5);
    transform: scale(1.05) translateY(-2px);
}

/* Styl pro mute tlačítko */
.mute-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    width: 35px; /* Zmenšeno */
    height: 35px; /* Zmenšeno */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    flex-shrink: 0; /* Tlačítko se nebude mačkat */
}

/* --- RESPONZIVITA PRO MOBILY --- */
@media (max-width: 450px) {
    nav {
        padding: 4px;
        gap: 5px;
    }
    a {
        padding: 6px 10px;
        font-size: 0.85rem; /* Menší písmo na mobilu */
    }
    .mute-btn {
        width: 30px;
        height: 30px;
        font-size: 0.9rem;
    }
}
</style>