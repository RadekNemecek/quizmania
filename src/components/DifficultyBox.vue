<template>
    
    <div class="before-start">
        <h2>Nová hra</h2>
        <div class="difficulty-box">
            <div
                v-for="level in difficulties"
                :key="level"
                class="difficulty"
                :class="{selected: level === selectedDifficulty}"
                @click="selectDifficulty(level)"
            >
                {{ level }}

            </div>
        </div>
        <button @click="notifyLoadQuestions">Start</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                difficulties: ['Easy', 'Medium', 'Hard'],
                selectedDifficulty: null,
            };
        },

        methods: {
            selectDifficulty(level) {
            this.selectedDifficulty = level;
            },

            notifyLoadQuestions() {
                this.$emit('loadQuestions');
            },

        }
    }

</script>

<style scoped>

.before-start {
    border-radius: 20px;
    border: 2px solid #219EBC;
    
    padding: 20px;
    position: absolute;
    top: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: auto;

}

.difficulty-box {
    display: flex;
    gap: 1rem;
}

.difficulty {
    gap: 10px;
    text-align: center;
    border: 1px solid;
    border-radius: 10px;
    margin-bottom: 2rem;
    padding: 10px;
    width: auto;
    font-size: 1.5rem;
}

.difficulty.selected {
background-color: #007bff;
color: white;
border-color: #0056b3;
}

button {
    border: 1px solid #219EBC;
    border-radius: 10px;
    padding: 5px 25px;
    background: transparent;
    color: #219EBC;
    font-size: 1.5rem;
    font-weight: 600;
}
 
h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

</style>

