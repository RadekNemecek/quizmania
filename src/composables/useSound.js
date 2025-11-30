import { ref } from 'vue';

// Globální stav (mimo funkci), aby byl sdílený mezi všemi komponentami
const isMuted = ref(false);

export function useSound() {
    
    const playSound = (soundName) => {
        if (isMuted.value) return;

        const audio = new Audio(`${import.meta.env.BASE_URL}sounds/${soundName}.wav`);
        audio.volume = 0.5; // 50% hlasitost
        
        audio.play().catch(e => {
            console.warn("Audio blocked:", e);
        });
    };

    const toggleMute = () => {
        isMuted.value = !isMuted.value;
    };

    return {
        isMuted,
        playSound,
        toggleMute
    };
}