<template>
     <nav class="main-navigation">
        <ul>
            <li> <router-link to="/">Domů</router-link></li>
            <li> <router-link to="/play">Hrát</router-link></li>
            <li> <router-link to="/about">O hře</router-link></li>
        </ul>

    </nav>
</template>


<style scoped>
    nav {
        border: 2px solid #219EBC;
        padding: 10px 25px;
        margin: 15px 0px;
        border-radius: 20px;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ul {
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }

    a {
        color: #FFB703;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.2rem;
    }

    li {
        list-style-type: none;
    }



        


</style>