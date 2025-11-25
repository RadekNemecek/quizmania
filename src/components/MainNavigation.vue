<template>
     <nav class="main-navigation">
        <router-link to="/">Domů</router-link>
        <router-link to="/play">Hrát</router-link>
        <router-link to="/about">O hře</router-link>
    </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
    display: flex;
    /* Tmavší, poloprůhledné pozadí "panelu" */
    background: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(10px);
    
    /* Větší padding, aby se tam vešla "tlustá" tlačítka */
    padding: 8px; 
    border-radius: 60px;
    margin-bottom: 25px;
    gap: 10px;
    
    /* Jemný rámeček a stín celého panelu */
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

a {
    text-decoration: none;
    color: #fff; /* Bílá pro neaktivní */
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 40px;
    font-size: 0.95rem;
    text-align: center;
    position: relative;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    /* --- PLASTICKÝ EFEKT (Neaktivní stav) --- */
    /* Jemný gradient, aby to nebylo ploché */
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    /* Odstraníme dolní border, aby byl vidět stín */
    border-bottom: none; 
}

/* Hover efekt pro neaktivní tlačítka */
a:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
}

/* --- AKTIVNÍ STAV (To pravé 3D) --- */
a.router-link-active {
    color: #023047; /* Tmavé písmo na světlém pozadí */
    
    /* 1. Plastický gradient (žlutá -> oranžová) */
    background: linear-gradient(180deg, #FFB703 0%, #fb8500 100%);
    
    /* 2. "Tlustá" hrana dole (simuluje 3D) + Stín pod tlačítkem */
    box-shadow: 
        0 4px 0 #c45d00,      /* Tmavá hrana (fyzická tloušťka) */
        0 5px 10px rgba(0,0,0,0.3); /* Měkký stín vržený na panel */
        
    /* 3. Jemný odlesk na horní hraně */
    border-top: 1px solid rgba(255,255,255,0.5);
    
    /* Zvětšení */
    transform: scale(1.05) translateY(-2px);
}

/* Efekt stisknutí (Click) */
a:active {
    /* Posuneme tlačítko dolů, jako bychom ho zamáčkli */
    transform: scale(1.05) translateY(2px);
    
    /* Zmenšíme stín/hranu, protože je "zamačknutá" v panelu */
    box-shadow: 
        0 0 0 #c45d00, 
        0 0 0 rgba(0,0,0,0);
}
</style>