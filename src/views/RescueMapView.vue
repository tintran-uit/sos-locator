<template>
  <section class="rescue">
    <h2>Bản đồ cứu hộ</h2>
    <div ref="mapEl" class="map"></div>
    <div class="list">
      <h3>Danh sách tín hiệu ({{ victims.length }})</h3>
      <p v-if="loading">Đang tải dữ liệu...</p>
      <p v-else-if="error" class="error">Lỗi: {{ error }}</p>
      <ul v-else>
        <li v-for="v in victims" :key="v.id">{{ v.name }} ({{ v.phone }}) - {{ formatLoc(v.location) }}</li>
        <li v-if="!victims.length" class="empty">Chưa có tín hiệu nào.</li>
      </ul>
      <button class="refresh" @click="loadVictimsOnce" :disabled="loading">{{ loading ? 'Đang tải...' : 'Tải lại' }}</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

const victims = ref([]);
const loading = ref(false);
const error = ref('');
const mapEl = ref(null);
let map; let markers = [];

function formatLoc(loc) { return loc && typeof loc.lat === 'number' && typeof loc.lng === 'number' ? `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}` : 'N/A'; }
function clearMarkers() { markers.forEach(m => m.setMap(null)); markers = []; }
function renderMarkers() {
  if (!map) return;
  clearMarkers();
  victims.value.forEach(v => {
    if (!v.location || typeof v.location.lat !== 'number' || typeof v.location.lng !== 'number') return;
    const marker = new google.maps.Marker({ position: v.location, map, title: `${v.name} (${v.phone})` });
    const infowindow = new google.maps.InfoWindow({ content: `<strong>${v.name}</strong><br/>${v.phone}<br/>${formatLoc(v.location)}` });
    marker.addListener('click', () => infowindow.open({ anchor: marker, map }));
    markers.push(marker);
  });
}
async function loadVictimsOnce() {
  loading.value = true; error.value='';
  try {
    const q = query(collection(db, 'victims'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    victims.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    error.value = e.message || 'Không tải được dữ liệu';
  } finally {
    loading.value = false;
    renderMarkers();
  }
}
onMounted(async () => {
  const loader = new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, version: 'weekly' });
  await loader.load();
  map = new google.maps.Map(mapEl.value, {
    center: { lat: 16.047079, lng: 108.20623 },
    zoom: 6,
    mapTypeControl: false,
    streetViewControl: false,
  });
  await loadVictimsOnce();
});
onBeforeUnmount(() => { clearMarkers(); });
</script>

<style scoped>
.rescue { display:grid; gap:1rem; }
.map { width:100%; height:420px; border:1px solid #ccc; border-radius:6px; }
.list { max-height:300px; overflow:auto; background:#f8f9fa; padding:0.75rem; border-radius:6px; }
button.refresh { margin-top:0.5rem; padding:0.4rem 0.8rem; background:#006494; color:#fff; border:none; border-radius:4px; cursor:pointer; }
button.refresh:disabled { opacity:0.6; cursor:not-allowed; }
ul { list-style:none; padding:0; margin:0; }
li { padding:0.35rem 0; border-bottom:1px solid #e0e0e0; font-size:0.9rem; }
li:last-child { border-bottom:none; }
.error { color:#c62828; font-size:0.85rem; }
.empty { color:#666; font-size:0.85rem; font-style:italic; }
</style>
