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

        <div v-if="isNewRecord" class="new-record-msg">
          🌟 NOVÝ OSOBNÍ REKORD! 🌟
        </div>

        <div class="leaderboard-section">
          <div v-if="!scoreSaved && !isSubmitting">
            <input
              v-model="nickname"
              type="text"
              placeholder="Tvoje přezdívka"
              maxlength="15"
              class="input-nickname"
            />
            <button
              class="btn-save"
              @click="submitScore"
              :disabled="!nickname || nickname.length < 2"
            >
              ULOŽIT DO ŽEBŘÍČKU
            </button>
          </div>

          <div v-else-if="isSubmitting" class="status-msg">⏳ Ukládám...</div>

          <div v-else class="status-msg success">
            ✅ Uloženo!
            <br />
            <router-link to="/leaderboard" class="link-to-leaderboard"
              >Zobrazit žebříček</router-link
            >
          </div>
        </div>
        <button class="btn-restart" @click="resetGame">HRÁT ZNOVU</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DifficultyBox from "@/components/DifficultyBox.vue";
import { useSound } from "@/composables/useSound"; 

// --- KONFIGURACE JSONBIN.IO ---
const BIN_ID = "692c12e5d0ea881f40093c98";
const API_KEY = "$2a$10$HQTH2FVO91KQ84jkInb3VunrI5sJYKr8lYHh8R1V5FoLN6OEMSUia";
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Použití globálního zvuku
const { playSound } = useSound();

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

const nickname = ref("");
const scoreSaved = ref(false);
const isSubmitting = ref(false);
const currentDifficulty = ref("");

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

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const loadQuestions = (level) => {
  playSound("click");
  currentDifficulty.value = level;

  const filtered = allQuestions.value.filter(
    (q) => q.difficulty === level.toLowerCase()
  );
  const shuffled = shuffleArray(filtered);
  question.value = shuffled;
  question.value.forEach((q) => {
    if (q.options) q.options = shuffleArray(q.options);
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
    playSound("wrong");
    endGame();
  } else {
    playSound("wrong");
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
    playSound("correct");
    btn.classList.add("correct");
    score.value += baseScore + timer.value * 5;
  } else {
    playSound("wrong");
    btn.classList.add("incorrect");
    lives.value--;
    document.querySelectorAll(".btn-answer").forEach((b) => {
      if (b.textContent.trim() === currentQuestion.value.correctAnswer) {
        b.classList.add("correct-hint");
      }
    });
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

  if (gameWon.value) {
    playSound("win");
  } else {
    playSound("gameover");
  }

  const storedScore = localStorage.getItem("quizHighScore") || 0;
  if (score.value > parseInt(storedScore)) {
    localStorage.setItem("quizHighScore", score.value);
    isNewRecord.value = true;
    // if (gameWon.value) confetti();
  }
};

const submitScore = async () => {
  if (!nickname.value) return;
  playSound("click");
  isSubmitting.value = true;

  try {
    const getReq = await fetch(URL, {
      headers: { "X-Master-Key": API_KEY },
    });
    const getData = await getReq.json();

    let currentScores = getData.record.scores || [];

    currentScores.push({
      name: nickname.value,
      score: score.value,
      difficulty: currentDifficulty.value,
      date: new Date().toLocaleDateString("cs-CZ"),
    });

    currentScores.sort((a, b) => b.score - a.score);
    const top50 = currentScores.slice(0, 50);

    await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ scores: top50 }),
    });

    scoreSaved.value = true;
    playSound("correct");
  } catch (e) {
    console.error("Chyba ukládání:", e);
    alert("Chyba připojení k žebříčku.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetGame = () => {
  playSound("click");
  score.value = 0;
  lives.value = 3;
  currentQuestionIndex.value = 0;
  play.value = false;
  gameOver.value = false;
  gameWon.value = false;
  isNewRecord.value = false;
  DifficultyModal.value = true;
  isAnswered.value = false;

  nickname.value = "";
  scoreSaved.value = false;
  isSubmitting.value = false;
  currentDifficulty.value = "";
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
  width: 90%;
  max-width: 400px;
}
.result-content h1 {
  color: var(--accent);
  margin-bottom: 10px;
  font-size: 2rem;
}
.final-score {
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.new-record-msg {
  color: var(--success);
  font-weight: bold;
  margin: 10px 0;
  animation: pop 1s infinite;
}

.leaderboard-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.input-nickname {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 10px;
  font-family: inherit;
}
.input-nickname:focus {
  outline: 3px solid var(--accent);
}

.btn-save {
  background: var(--success);
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 0 #1e8449;
}
.btn-save:disabled {
  background: #95a5a6;
  box-shadow: none;
  cursor: not-allowed;
}

.status-msg {
  font-weight: bold;
  font-size: 1.1rem;
  color: #a8dadc;
}
.status-msg.success {
  color: var(--success);
}
.link-to-leaderboard {
  color: var(--accent);
  text-decoration: underline;
  display: block;
  margin-top: 5px;
}

.btn-restart {
  margin-top: 10px;
  background: var(--accent);
  color: #023047;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 900;
  font-size: 1.2rem;
}

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
