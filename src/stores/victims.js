import { defineStore } from 'pinia';
import { listenVictims } from '../services/firebase';

export const useVictimsStore = defineStore('victims', {
  state: () => ({ list: [], unsub: null }),
  actions: {
    start() {
      if (this.unsub) return;
      this.unsub = listenVictims((data) => { this.list = data; });
    },
    stop() { if (this.unsub) { this.unsub(); this.unsub = null; } }
  }
});
