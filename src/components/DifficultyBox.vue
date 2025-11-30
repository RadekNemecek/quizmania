<template>
    <div class="difficulty-view">
        <div class="glass-card pop-in">
            <h2>Nová hra</h2>
            <p>Na jakou úroveň si troufáš?</p>
            
            <div class="difficulty-options">
                <div
                    v-for="level in difficulties"
                    :key="level"
                    class="btn-difficulty"
                    :class="{selected: level === selectedDifficulty}"
                    @click="selectLevel(level)"
                >
                    <span class="level-name">{{ translateLevel(level) }}</span>
                    
                    <span class="count-badge" v-if="counts[level.toLowerCase()]">
                        {{ counts[level.toLowerCase()] }}
                    </span>
                </div>
            </div>
            
            <button 
                class="btn-start"
                @click="notifyLoadQuestions" 
                :disabled="!selectedDifficulty"
            >
                START HRY
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSound } from '@/composables/useSound';

const props = defineProps(['counts']);
const emit = defineEmits(['loadQuestions']);
const { playSound } = useSound();

const difficulties = ['Easy', 'Medium', 'Hard'];
const selectedDifficulty = ref(null);

const selectLevel = (level) => {
    selectedDifficulty.value = level;
    playSound('click');
};

const notifyLoadQuestions = () => {
    if (selectedDifficulty.value) {
        playSound('click');
        emit('loadQuestions', selectedDifficulty.value);
    }
};

const translateLevel = (level) => {
    const map = { 'Easy': 'Začátečník', 'Medium': 'Pokročilý', 'Hard': 'Expert' };
    return map[level] || level;
};
</script>

<style scoped>
.difficulty-view {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 10px;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    padding: 40px 30px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}

h2 { 
    color: var(--accent); 
    margin-bottom: 15px; 
    font-size: 2rem; 
    text-transform: uppercase; 
    letter-spacing: 1px;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

p { 
    color: #a8dadc; 
    margin-bottom: 30px; 
    font-size: 1.1rem;
}

.difficulty-options {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
}

.btn-difficulty {
    background: rgba(0, 0, 0, 0.2);
    border: 2px solid transparent;
    color: var(--text-light);
    padding: 15px 20px;
    border-radius: 15px;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-difficulty:hover {
    background: rgba(255, 255, 255, 0.1);
}

.btn-difficulty.selected {
    background: var(--primary);
    color: #fff;
    border-color: rgba(255,255,255,0.5);
    box-shadow: 0 0 15px var(--primary);
    transform: scale(1.02);
}

.count-badge {
    background: rgba(255,255,255,0.2);
    font-size: 0.9rem;
    padding: 4px 10px;
    border-radius: 12px;
    color: #e0fbfc;
}

.btn-difficulty.selected .count-badge {
    background: rgba(0,0,0,0.2);
    color: var(--accent);
}

.btn-start {
    width: 100%;
    padding: 18px;
    border-radius: 50px;
    background: var(--accent);
    color: #023047;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    box-shadow: 0 5px 0 #fb8500;
    margin-top: 10px;
    transition: all 0.1s;
}

.btn-start:active {
    box-shadow: 0 2px 0 #fb8500;
    transform: translateY(3px);
}

.btn-start:disabled {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
    transform: none;
}

.pop-in {
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
}
</style>