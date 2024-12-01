<template>
  <div class="play">
        <div class="info">
            <div class="score">
                
                Score: {{ score }}
                
            </div>
            <div class="life">
                ❤ {{ lives }} 
            </div>
        </div>

        <div v-if="loading">
            Načítání otázek...
        </div>

        <div v-else>
            <div class="question">
                <p>
                    {{ currentQuestion.question }}
                </p>
            </div>
        </div>

        <div class="answer">

            <div v-for="(option, index) in currentQuestion.options" 
                :key="index"
                class="choice"
                @click="checkAnswer(option)"
            >
                <p>{{ option }}</p>
            </div>

        </div>
    </div>
</template>





<script>
export default {
    name: "play",
    data() {
        return {
            score: 0,
            lives: 3,
            currentQuestionIndex: 0,
            question: "Které město je hlavním městem ČR?",
            options: [],
            loading: true,
        };
    },

    computed: {
        currentQuestion() {
            return this.question[this.currentQuestionIndex] || {};
        },
    },

    created() {
        this.loadQuestions();
    },

    methods: {
        async loadQuestions() {
            try {
                const response = await fetch("/data/questions.json");
                const data = await response.json();
                this.question = data.filter( (q) => q.difficulty === "easy" );
                
                if(this.question.length > 0) {
                    this.currentQuestionIndex = Math.floor(Math.random() * this.question.length);
                }

                this.loading = false;
            }
            catch (error) {
                console.error("chyba při načítání otázek: ", error);
                this.loading = false;
            }
        },

        checkAnswer(option) {
            const correctAnswer = this.currentQuestion.correctAnswer;
            const choices = document.querySelectorAll('.choice');

            // zmena barvy pozadi dle odpovedi
            choices.forEach(choice => {
                if (choice.textContent.trim() === option) {
                    if (option === correctAnswer) {
                        choice.classList.add('correct');
                        this.score += 100;
                    } else {
                        choice.classList.add('incorrect');
                        this.lives -= 1;
                    }
                    
                }
            });


            setTimeout(() => {
                if (this.lives === 0 ){
                    alert("Konec hry");
                    this.resetGame();
                }
                else {
                    this.nextQuestion();
                    this.clearChoices();
                }
            }, 1500);
        },    

        clearChoices() {
            const choices = document.querySelectorAll('.choice');
            choices.forEach(choice => {
                choice.classList.remove('correct', 'incorrect');
            });
        },

           

        nextQuestion() {
            if (this.currentQuestionIndex < this.question.length -1) {
                this.currentQuestionIndex += 1;
            }
            else {
                alert("Gratulace! Odpověďel jsi na všechny otázky!");
                this.resetGame();
            }
        },

        resetGame() {
            this.score = 0;
            this.lives = 3;
            this.currentQuestionIndex =0;
        }
    }
};

</script>














<style scoped>

.correct {
    background-color: green;
    color: white;
}

.incorrect {
    background-color: red;
    color: white;
}

.info {
    display: flex;
    justify-content: space-between;
}
.answer {
    position: fixed;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    bottom: 3rem;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
}

.choice {
    border: 1px solid #FFB703;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* .choice:hover {
    background-color: #00476b;
} */

.play {
    width: 100%;
}

.question {
    border: 1px solid #FFB703;
    border-radius: 20px;
    margin-top: 2rem;
}

h2 {
    color: #FFB703;
    text-align: left;
    margin-left: 20px;
}

p {
    text-align: center;
    margin: 20px;
    font-size: 1.7rem;
    font-weight: 600;

}

</style>