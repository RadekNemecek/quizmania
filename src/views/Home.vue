<template>
  <div class="home-container">
    
    <img src="/img/logo4.png" alt="QuizMania Logo" class="logo">

    <div class="glass-card">
        <h1>Otestuj se!</h1>
        <p>Více než 300 otázek z zeměpisu, historie, vědy a dalších oblastí.</p>
        
        <router-link to="/play" class="cta-button">
            HRÁT NYNÍ
        </router-link>

        <div v-if="highScore > 0" class="highscore-badge">
            🏆 Tvůj rekord: {{ highScore }} bodů
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const highScore = ref(0);

onMounted(() => {
    const storedScore = localStorage.getItem('quizHighScore');
    if (storedScore) {
        highScore.value = parseInt(storedScore);
    }
});
</script>

<style scoped>
.home-container {
    width: 100%;
    display: flex;
    flex-direction: column; 
    align-items: center; 
    animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo {
    max-height: 200px;
    width: auto;
    position: relative;
    z-index: 20;
    margin-bottom: -70px; /* Překrytí */
    filter: drop-shadow(0 15px 15px rgba(0,0,0,0.4));
    animation: float 6s ease-in-out infinite;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    
    /* Padding nahoře pro logo */
    padding-top: 100px; 
    padding-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
    
    position: relative;
    z-index: 1;
    
    width: 100%;
    max-width: 500px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 3.5rem;
    color: var(--accent);
    margin-bottom: 10px;
    text-shadow: 3px 3px 0px #000;
    line-height: 1.1;
    transform: rotate(-2deg);
}

p {
    font-size: 1.2rem;
    color: #e0fbfc;
    margin-bottom: 40px;
    line-height: 1.6;
    max-width: 80%;
}

.cta-button {
    display: inline-block;
    background: var(--danger);
    color: white;
    text-decoration: none;
    font-size: 1.8rem;
    font-weight: 900;
    padding: 20px 60px;
    border-radius: 50px;
    box-shadow: 0 8px 0 #9e5602;
    transition: all 0.1s;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
}

.cta-button::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shine 3s infinite;
}

.cta-button:active {
    transform: translateY(8px);
    box-shadow: 0 0 0 #9e5602;
}

.highscore-badge {
    background: rgba(0, 0, 0, 0.4);
    color: var(--accent);
    font-weight: bold;
    padding: 10px 25px;
    border-radius: 20px;
    border: 1px solid var(--accent);
    box-shadow: 0 0 15px rgba(255, 183, 3, 0.2);
}

@keyframes zoomIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes shine {
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
}
</style>