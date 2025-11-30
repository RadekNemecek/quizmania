<template>
    <header>
        <MainNavigation />
    </header>
    
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script setup>
import MainNavigation from './components/MainNavigation.vue';
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    padding: 15px 0;
    z-index: 1000;
    pointer-events: none;
}

header :deep(.main-navigation) {
    pointer-events: auto;
}

main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* ZVĚTŠÍME HORIZONT ODSATZENÍ */
    margin-top: 100px; 
    /* Přidáme padding dole, ať to není nalepené */
    padding-bottom: 20px;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Pojistka pro mobily - pokud je menu vysoké */
@media (max-width: 450px) {
    main {
        margin-top: 110px;
    }
}
</style>