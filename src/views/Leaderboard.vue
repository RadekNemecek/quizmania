<template>
  <div class="leaderboard-view">
    <div class="glass-card pop-in">
      <h2>🏆 Síň slávy 🏆</h2>
      <p class="subtitle">TOP 50 nejlepších hráčů</p>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Načítám výsledky...</p>
      </div>

      <div v-else-if="error" class="error-msg">
        Nepodařilo se načíst žebříček. 😕
      </div>

      <div v-else-if="scores.length === 0" class="empty-msg">
        Zatím tu nikdo není. Buď první!
      </div>

      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hráč</th>
              <th>Obtížnost</th>
              <th>Skóre</th>
              <th>Datum</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(entry, index) in scores" 
              :key="index"
              :class="getRowClass(index)"
            >
              <td class="rank">{{ index + 1 }}.</td>
              <td class="name">
                  {{ entry.name }} 
                  <span v-if="index === 0">👑</span>
              </td>
              
              <td>
                <span class="badge" :class="entry.difficulty ? entry.difficulty.toLowerCase() : 'unknown'">
                    {{ translateDifficulty(entry.difficulty) }}
                </span>
              </td>

              <td class="score">{{ entry.score }}</td>
              <td class="date">{{ entry.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <router-link to="/" class="btn-back" @click="playSound('click')">Zpět domů</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSound } from '@/composables/useSound';

// --- KONFIGURACE JSONBIN.IO ---
const BIN_ID = "692c12e5d0ea881f40093c98"; 
const API_KEY = "$2a$10$HQTH2FVO91KQ84jkInb3VunrI5sJYKr8lYHh8R1V5FoLN6OEMSUia"; 
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const scores = ref([]);
const loading = ref(true);
const error = ref(false);
const { playSound } = useSound();

onMounted(async () => {
    try {
        const req = await fetch(URL, {
            method: 'GET',
            headers: {
                'X-Master-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (!req.ok) throw new Error('Network response was not ok');
        
        const data = await req.json();
        scores.value = data.record.scores || [];
        
    } catch (e) {
        console.error(e);
        error.value = true;
    } finally {
        loading.value = false;
    }
});

const getRowClass = (index) => {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return '';
};

const translateDifficulty = (diff) => {
    if (!diff) return "-";
    const map = {
        'Easy': 'Začátečník',
        'Medium': 'Pokročilý',
        'Hard': 'Expert'
    };
    return map[diff] || diff; 
};
</script>

<style scoped>
.leaderboard-view {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 50px;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 25px;
    padding: 30px 20px;
    width: 100%;
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    text-align: center;
}

h2 {
    color: var(--accent);
    font-size: 2.2rem;
    text-transform: uppercase;
    text-shadow: 2px 2px 0 #000;
    margin-bottom: 5px;
}
.subtitle { color: #a8dadc; margin-bottom: 25px; }

/* Tabulka */
.table-container {
    max-height: 500px;
    overflow-y: auto;
    margin-bottom: 30px;
    border-radius: 10px;
    background: rgba(0,0,0,0.2);
}

table {
    width: 100%;
    border-collapse: collapse;
    color: #e0fbfc;
}

th {
    background: rgba(0,0,0,0.3);
    padding: 12px;
    position: sticky;
    top: 0;
    color: var(--accent);
    font-size: 0.9rem;
    text-transform: uppercase;
}

td {
    padding: 12px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.rank { font-weight: bold; color: #8d99ae; width: 40px; }
.name { text-align: left; font-weight: 600; }
.score { font-weight: bold; color: var(--success); text-align: right; }
.date { font-size: 0.8rem; color: #6c757d; text-align: right; }

/* Styly odznáčků */
.badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background: rgba(255,255,255,0.1);
}
.badge.easy { background: #2ecc71; box-shadow: 0 0 5px rgba(46, 204, 113, 0.4); }
.badge.medium { background: #f1c40f; color: #000; box-shadow: 0 0 5px rgba(241, 196, 15, 0.4); }
.badge.hard { background: #e74c3c; box-shadow: 0 0 5px rgba(231, 76, 60, 0.4); }
.badge.unknown { color: #a8dadc; font-style: italic; }

/* Barvy pro první 3 místa */
.gold td { color: #ffd700; background: rgba(255, 215, 0, 0.1); }
.silver td { color: #c0c0c0; background: rgba(192, 192, 192, 0.1); }
.bronze td { color: #cd7f32; background: rgba(205, 127, 50, 0.1); }

.btn-back {
    display: inline-block;
    padding: 12px 30px;
    background: rgba(255,255,255,0.1);
    color: #fff;
    text-decoration: none;
    border-radius: 30px;
    font-weight: bold;
    transition: all 0.2s;
}
.btn-back:hover { background: rgba(255,255,255,0.2); }

.loading-state, .error-msg, .empty-msg { padding: 40px 0; color: #a8dadc; font-size: 1.2rem; }
.spinner {
    width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1);
    border-top: 4px solid var(--accent); border-radius: 50%;
    margin: 0 auto 15px; animation: spin 1s linear infinite;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
</style>