<template>
  <div class="about">
    <h2>Pravidla hry Quiz Mania</h2>
    <p>Vítejte ve hře Quiz Mania,
        kde otestujete své znalosti a rychlost myšlení!
    </p>
    <p>
        Jak hrát:
    </p>
    <ul class="number">
        <li>
            Hra vám postupně položí otázky, každá s výběrem ze 4 možností.
        </li>
        <li>
           Vyberte odpověď, kterou považujete za správnou.
        </li>
        <li>
            Za každou správnou odpověď získáte body.
        </li>
    </ul>
    <p>
        Bodování:
    </p>
    <ul class="dot">
        <li>
            Vaše skóre za otázku závisí na rychlosti odpovědi.
            Čím rychleji odpovíte, tím více bodů získáte!
        </li>
        <li>
            Body za jednu otázku se vypočítávají jako: základní body × koeficient rychlosti.
        </li>
    </ul>
    <p>
        Životy:
    </p>
    <ul class="dot">
        <li>
            Za každou špatnou odpověď ztratíte jeden život.
        </li>
        <li>
            Máte celkem 3 životy. Jakmile je všechny ztratíte, hra končí.
        </li>
    </ul>
    <p>
        Cílem hry je nasbírat co nejvíce bodů a ukázat, že jste opravdový mistr kvízů. Hodně štěstí! 😊
    </p>


  </div>
</template>


<style scoped>
.about {
    width: 100%;
}
h2 {
    text-align: left;

}

p {
    text-align: left;
    margin: 20px 0px;
    font-weight: 700;

}

.number {
    list-style-type: number ;
}

ul {
    margin-left: 20px;
}

</style>