<template>
     <div v-if="difficultyBox" class="before-start">
        <h2>Nová hra</h2>
        <p>
            Vyber obtížnost
        </p>
        <div class="difficulty">
            <div class="child">
                <label for="">Dítě</label>
            </div>
            <div class="adult">
                <label for="">Dospělý</label>
            </div>
            <div class="scientist">
                <label for="">Vědátor</label>
            </div>
        </div>
        <button>Start</button>
    </div>


  <div v-if="play" class="play">
        <div class="info">
            <div class="score">
                
                Score: {{ score }}
                
            </div>
            <div class="life">
                <!-- ❤ {{ lives }}  -->
                <span v-for="n in lives" :key="n" class="heart">❤</span>
            </div>
        </div>

        <div class="timer-bar-container">
            <div class="timer-bar" :style="{ width: timerWidth + '%' }">

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
            lives: 5,
            currentQuestionIndex: 0,
            question: [],
            options: [],
            loading: true,
            timer: 1000,
            interval: null,
            baseScore: 100,
            play: true,
            difficultyBox: false,
        };
    },

    computed: {
        currentQuestion() {
            return this.question[this.currentQuestionIndex] || {};
        },

        timerWidth() {
            return (this.timer / 10) * 100;
        }
    },

    created() {
        this.loadQuestions();
    },

    methods: {
        // async loadQuestions() {
        //     try {
        //         const response = await fetch("/data/questions.json");
        //         const data = await response.json();
        //         this.question = data.filter( (q) => q.difficulty === "medium" );
                
        //         if(this.question.length > 0) {
        //             this.currentQuestionIndex = Math.floor(Math.random() * this.question.length);
        //         }

        //         this.loading = false;
        //         this.startTimer();
        //     }
        //     catch (error) {
        //         console.error("chyba při načítání otázek: ", error);
        //         this.loading = false;
        //     }
        // },




        async loadQuestions() {
            try {
                const response = await fetch("/data/questions.json");
                const data = await response.json();
                this.question = data.filter((q) => q.difficulty === "medium");
                
                if (this.question.length > 0) {
                    // Zamíchej otázky
                    this.question.sort(() => Math.random() - 0.5);
                    this.currentQuestionIndex = 0; // Vždy začni od první otázky
                }

                this.loading = false;
                this.startTimer();
            } catch (error) {
                console.error("Chyba při načítání otázek: ", error);
                this.loading = false;
            }
        },


        startTimer() {
            // zastavi predchozi intervat, pokud nejaky bezi
            if(this.interval) {
                clearInterval(this.interval);
            }
            // Nastavi novy interval
            this.interval = setInterval(() => {
                if(this.timer > 0) {
                    this.timer -= 1;
                } else {
                    clearInterval(this.interval);
                    this.timerExpired();
                }
            }, 1000);
        },

        timerExpired() {
            // minus 1 zivot
            this.lives -=1;
            if (this.lives === 0) {
                alert("Konec hry, ztratili jste všechny životy!");
                this.resetGame();
            } else {
                this.clearChoices();
                this.nextQuestion();
            }
        },

        checkAnswer(option) {
            clearInterval(this.interval); // Okamžitě zastav timer

            const correctAnswer = this.currentQuestion.correctAnswer;
            const choices = document.querySelectorAll('.choice');

            // zmena barvy pozadi dle odpovedi
            choices.forEach(choice => {
                if (choice.textContent.trim() === option) {
                    if (option === correctAnswer) {
                        choice.classList.add('correct');
                        const timeMultiplier = this.timer;
                        this.score += this.baseScore * timeMultiplier;
                    } else {
                        choice.classList.add('incorrect');
                        this.lives -= 1;
                    }
                    
                }
            });

            // Přechod na další otázku po 1,5 sekundy
            setTimeout(() => {
                if (this.lives === 0 ){
                    alert("Konec hry");
                    this.resetGame();
                    this.clearChoices();
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
                this.timer = 10;
                this.startTimer();
            }
            else {
                alert("Gratulace! Odpověďel jsi na všechny otázky!");
                this.resetGame();
            }
        },


        // nextQuestion() {
        //     if (this.question.length > 0) {
        //         // Vyberte náhodný index
        //         const randomIndex = Math.floor(Math.random() * this.question.length);
        //         // Nastavte aktuální otázku
        //         this.currentQuestionIndex = randomIndex;
        //         // Odstraňte otázku z pole, aby se neopakovala
        //         this.question.splice(randomIndex, 1);
        //         // Resetujte časovač
        //         this.timer = 10;
        //         this.startTimer();
        //     } else {
        //         alert("Gratulace! Odpověděl jsi na všechny otázky!");
        //         this.resetGame();
        //     }
        // },


        resetGame() {
            clearInterval(this.interval);
            this.score = 0;
            this.lives = 3;
            this.currentQuestionIndex = 0;
            this.timer = 10;
            this.startTimer();
            this.loadQuestions();
        }
    }
};

</script>



<style scoped>

.timer-bar-container {
    width: 100%;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 20px;
}

.timer-bar {
    height: 100%;
    background-color: #4caf50; /* Zelená barva */
    transition: width 1s linear; /* Plynulé změny šířky */
}

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

.difficulty {
    display: flex;
    gap: 10px;
}

.child, .adult, .scientist {
    text-align: center;
    border: 1px solid;
    border-radius: 10px;
    margin: 25px 0px;
    padding: 10px;
    width: 3.3rem;
}

button {
    border: 1px solid #219EBC;;
    border-radius: 10px;
    padding: 5px 15px;
    background: transparent;
    color: #219EBC;
    font-size: 1.2rem;
    
}

</style>