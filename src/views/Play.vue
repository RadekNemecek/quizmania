<template>
  <div class="play">
    <div class="info">
        <div class="score">
            <span>Score: 1496</span>
            
        </div>
        <div class="life">
            <span>❤ ❤ ❤</span>
        </div>
    </div>
    <div class="question">
        <p>
            Který kontinent je domovem pro nejvíce druhů savců?
        </p>
    </div>
    <div class="answer">
        <div class="choice choice-1">
            <p>
                Afrika
            </p>
        </div>
        <div class="choice choice-2">
            <p>
                Asie
            </p>
        </div>
        <div class="choice choice-3">
            <p>
                Severní Amerika
            </p>
        </div>
        <div class="choice choice-4">
            <p>
                Jižní Amerika
            </p>
        </div>
    </div>
  </div>
</template>

<style scoped>
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

}

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