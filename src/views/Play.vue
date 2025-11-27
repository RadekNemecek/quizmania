<template>
  <div class="play-container">
    <DifficultyBox
      v-if="DifficultyModal"
      :counts="difficultyCounts"
      @loadQuestions="loadQuestions"
    />

    <div v-if="play" class="game-board">
      <div class="hud">
        <div class="score-pill">{{ score }} bodů</div>
        <div class="lives">
          <span v-for="n in lives" :key="n" class="heart">❤️</span>
        </div>
      </div>

      <div class="timer-wrapper">
        <div
          class="timer-fill"
          :style="{ width: timerWidth + '%', backgroundColor: timerColor }"
        ></div>
      </div>

      <transition name="slide-fade" mode="out-in">
        <div :key="currentQuestionIndex" class="question-container">
          <div class="question-card">
            <p v-if="!loading">{{ currentQuestion.question }}</p>
            <p v-else>Načítám...</p>
          </div>

          <div class="answers-stack" :class="{ locked: isAnswered }">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="btn-answer"
              @click="checkAnswer(option, $event)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="gameOver || gameWon" class="result-overlay">
      <div class="result-content">
        <h1>{{ gameWon ? "VÍTĚZSTVÍ! 🏆" : "💀 KONEC HRY 💀" }}</h1>

        <div class="final-score">{{ score }}</div>
        <p>bodů</p>

        <div v-if="isNewRecord" class="new-record-msg">🌟 NOVÝ REKORD! 🌟</div>

        <button class="btn-restart" @click="resetGame">HRÁT ZNOVU</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DifficultyBox from "@/components/DifficultyBox.vue";

const score = ref(0);
const lives = ref(3);
const currentQuestionIndex = ref(0);
const question = ref([]);
const allQuestions = ref([]);
const difficultyCounts = ref({ easy: 0, medium: 0, hard: 0 });

const loading = ref(true);
const play = ref(false);
const DifficultyModal = ref(true);
const isAnswered = ref(false);
const gameOver = ref(false);
const gameWon = ref(false);
const isNewRecord = ref(false);

const timer = ref(15);
const maxTime = 15;
let interval = null;
const baseScore = 100;

const currentQuestion = computed(
  () => question.value[currentQuestionIndex.value] || {}
);

const timerWidth = computed(() => (timer.value / maxTime) * 100);

const timerColor = computed(() => {
  if (timer.value < 5) return "var(--error)";
  return "var(--success)";
});

// --- Načtení dat hned po startu ---
onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.BASE_URL + "data/questions.json");
    const data = await res.json();
    allQuestions.value = data;

    difficultyCounts.value = {
      easy: data.filter((q) => q.difficulty === "easy").length,
      medium: data.filter((q) => q.difficulty === "medium").length,
      hard: data.filter((q) => q.difficulty === "hard").length,
    };

    loading.value = false;
  } catch (e) {
    console.error("Chyba při načítání JSON:", e);
  }
});

// --- POMOCNÁ FUNKCE: Fisher-Yates Shuffle (Kvalitní míchání) ---
const shuffleArray = (array) => {
  // Vytvoříme kopii pole, abychom neměnili originál
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const loadQuestions = (level) => {
  // Vyfiltrujeme otázky podle obtížnosti
  const filtered = allQuestions.value.filter(
    (q) => q.difficulty === level.toLowerCase()
  );

  // Pořádně je zamícháme (Fisher-Yates)
  const shuffled = shuffleArray(filtered);

  // Hra bude trvat tak dlouho, dokud jsou otázky nebo životy.
  question.value = shuffled;

  // Míchání pořadí odpovědí u každé otázky
  question.value.forEach((q) => {
    if (q.options) {
      q.options = shuffleArray(q.options);
    }
  });

  if (question.value.length) {
    play.value = true;
    DifficultyModal.value = false;
    startTimer();
  }
};

const startTimer = () => {
  if (interval) clearInterval(interval);
  timer.value = maxTime;

  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
      handleLifeLoss();
    }
  }, 1000);
};

const handleLifeLoss = () => {
  lives.value--;
  if (lives.value === 0) {
    endGame();
  } else {
    nextQuestion();
  }
};

const checkAnswer = (option, event) => {
  if (isAnswered.value) return;
  isAnswered.value = true;
  clearInterval(interval);

  const btn = event.target;
  const isCorrect = option === currentQuestion.value.correctAnswer;

  if (isCorrect) {
    btn.classList.add("correct");
    score.value += baseScore + timer.value * 5;
  } else {
    btn.classList.add("incorrect");
    const allBtns = document.querySelectorAll(".btn-answer");
    allBtns.forEach((b) => {
      if (b.textContent.trim() === currentQuestion.value.correctAnswer) {
        b.classList.add("correct-hint");
      }
    });
    lives.value--;
  }

  setTimeout(() => {
    if (lives.value === 0) {
      endGame();
    } else if (currentQuestionIndex.value >= question.value.length - 1) {
      gameWon.value = true;
      endGame();
    } else {
      nextQuestion();
    }
  }, 1500);
};

const nextQuestion = () => {
  currentQuestionIndex.value++;
  isAnswered.value = false;
  document.querySelectorAll(".btn-answer").forEach((b) => {
    b.classList.remove("correct", "incorrect", "correct-hint");
  });
  startTimer();
};

const endGame = () => {
  clearInterval(interval);
  gameOver.value = lives.value === 0;
  saveHighScore();
};

const saveHighScore = () => {
  const storedScore = localStorage.getItem("quizHighScore") || 0;
  if (score.value > parseInt(storedScore)) {
    localStorage.setItem("quizHighScore", score.value);
    isNewRecord.value = true;
  }
};

const resetGame = () => {
  score.value = 0;
  lives.value = 3;
  currentQuestionIndex.value = 0;
  play.value = false;
  gameOver.value = false;
  gameWon.value = false;
  isNewRecord.value = false;
  DifficultyModal.value = true;
  isAnswered.value = false;
};
</script>

<style scoped>
.play-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.score-pill {
  background: rgba(0, 0, 0, 0.3);
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  color: var(--accent);
}
.lives {
  font-size: 1.5rem;
  letter-spacing: 5px;
}

.progress-text {
  text-align: center;
  color: #a8dadc;
  font-size: 0.9rem;
  margin-bottom: 10px;
  font-weight: bold;
}

/* Timer */
.timer-wrapper {
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.timer-fill {
  height: 100%;
  transition: width 1s linear, background-color 0.5s;
}

/* Otázka */
.question-card {
  background: #fff;
  color: #023047;
  padding: 30px 20px;
  border-radius: 20px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
}

/* Odpovědi */
.answers-stack {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.answers-stack.locked {
  pointer-events: none;
}

.btn-answer {
  padding: 18px;
  background: var(--primary);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 15px;
  box-shadow: 0 4px 0 #126e82;
  text-align: left;
  transition: transform 0.1s;
}

.btn-answer:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 #126e82;
}

/* Stavy odpovědí */
.btn-answer.correct {
  background: var(--success);
  box-shadow: 0 4px 0 #27ae60;
  animation: pop 0.3s ease;
}
.btn-answer.incorrect {
  background: var(--error);
  box-shadow: 0 4px 0 #c0392b;
  animation: shake 0.4s ease;
}
.btn-answer.correct-hint {
  border: 2px solid var(--success);
  background: rgba(46, 204, 113, 0.2);
}

/* Výsledek */
.result-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 48, 71, 0.95);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}
.result-content {
  text-align: center;
}
.result-content h1 {
  color: var(--accent);
  margin-bottom: 20px;
  font-size: 2.5rem;
}
.final-score {
  font-size: 5rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.new-record-msg {
  color: var(--success);
  font-weight: bold;
  font-size: 1.5rem;
  margin: 10px 0;
  animation: pop 1s infinite;
}
.btn-restart {
  margin-top: 30px;
  background: var(--accent);
  color: #023047;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.2rem;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  transform: translateX(50px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
