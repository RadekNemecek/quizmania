<template>
  <div class="about-container">
    <div class="glass-card">
      <h2>Pravidla hry</h2>
      
      <p class="intro">
          Vítejte v <strong>Quiz Mania</strong>! Cíl je jednoduchý: Otestujte své znalosti a nahrajte co nejvyšší skóre.
      </p>

      <div class="section">
        <h3>Jak hrát</h3>
        <ul>
            <li>Čeká vás série otázek z různých oborů.</li>
            <li>Vždy vybíráte jednu správnou odpověď ze čtyř.</li>
            <li>Máte celkem <strong>3 životy</strong>.</li>
        </ul>
      </div>

      <div class="section">
        <h3>Bodování</h3>
        <ul>
            <li>Základem je správná odpověď.</li>
            <li>Rychlost rozhoduje – čím dříve odpovíte, tím více bodů získáte!</li>
            <li>Za chybu přicházíte o život.</li>
        </ul>
      </div>

      <p class="outro">
          Hodně štěstí a pevnou ruku při výběru!
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
    width: 100%;
    /* Jemná animace při načtení stránky */
    animation: fadeIn 0.5s ease-out;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    color: var(--text-light);
}

h2 {
    color: var(--accent);
    margin-bottom: 20px;
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
}

h3 {
    color: var(--primary);
    font-size: 1.3rem;
    margin-bottom: 10px;
    margin-top: 20px;
    border-bottom: 2px solid rgba(255,255,255,0.1);
    padding-bottom: 5px;
    display: inline-block;
}

p {
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 1.05rem;
}

.intro {
    font-weight: 500;
    text-align: center;
    margin-bottom: 30px;
    color: #dbe9ee;
}

.outro {
    text-align: center;
    margin-top: 30px;
    font-weight: bold;
    color: var(--accent);
}

ul {
    list-style: none;
    padding-left: 10px;
}

li {
    margin-bottom: 10px;
    position: relative;
    padding-left: 25px;
    color: #e0fbfc;
}

li::before {
    content: "•";
    color: var(--accent);
    font-weight: bold;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: -5px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>