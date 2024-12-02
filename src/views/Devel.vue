<template>
    <div class="before-start">
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
</template>

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