<template>
    <header>
        <!-- <img src="../public/img/kindpng_button.png" alt="logo">
        <h1>Mania</h1> -->
        <MainNavigation />
        
    </header>


   <router-view />

</template>

<script>
    import MainNavigation from './components/MainNavigation.vue';

    export default {
        components: {
            MainNavigation
        }
    }

</script>

<style scoped>

    header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    h1 {
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFB703;
        
    }

    img {
        height: 60px;
        width: auto;
        margin-right: 20px;
        text-align: center;
    }

</style>