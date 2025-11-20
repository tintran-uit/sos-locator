<template>
  <section class="report">
    <h2>Gửi vị trí cứu nạn</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <label>Tên hoặc thông tin liên lạc
        <input v-model="name" required placeholder="Ví dụ: 2 người lớn tuổi - Thôn Bình Lâm, Tuy Phước" />
      </label>
      <label>Số điện thoại
        <input v-model="phone" required pattern="[0-9+ ]{6,}" placeholder="090..." />
      </label>
      <div class="loc-block">
        <button type="button" @click="capture" :disabled="loadingLoc">{{ loadingLoc ? 'Đang lấy GPS...' : 'Lấy vị trí hiện tại' }}</button>
        <p v-if="lat != null">Vĩ độ: {{ lat.toFixed(6) }}, Kinh độ: {{ lng.toFixed(6) }}</p>
        <p v-else class="hint">Chưa có vị trí</p>
      </div>
  <div v-if="error && (error.includes('vị trí') || error.toLowerCase().includes('geolocation') || error.toLowerCase().includes('denied'))" class="manual-address">
    <label>
      <p v-if="error" class="error">Lấy định vị GPS thất bại - Hãy nhập địa chỉ thay thế:</p>
      <input
        v-model="manualAddress"
        placeholder="Nhập địa chỉ, địa danh, mô tả vị trí..."
        @input="onAddressInput"
        @focus="onAddressInput"
        autocomplete="off"
      />
    </label>
    <ul v-if="suggestions.length" class="autocomplete-suggestions">
      <li v-for="(s, i) in suggestions" :key="i" @click="selectSuggestion(s)">
        {{ s.description }}
      </li>
    </ul>
  </div>
  <button type="submit" :disabled="submitting || (!manualAddress && lat == null)">{{ submitting ? 'Đang gửi...' : 'Gửi tín hiệu' }}</button>
    </form>
    <!-- <p v-if="error" class="error">Lỗi: {{ error }}</p> -->
    <p v-if="success" class="success">Đã gửi thành công! Hãy giữ an toàn. Trong thời gian chờ đợi hãy cố gắng liên lạc thêm các đội cứu hộ gần nhất để được giúp nhanh chóng hơn!</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentPosition } from '../services/location';
import { submitVictim } from '../services/firebase';

const name = ref('');
const phone = ref('');
const lat = ref(null);
const lng = ref(null);

const loadingLoc = ref(false);
const submitting = ref(false);
const error = ref('');
const success = ref(false);
const manualAddress = ref('');
const suggestions = ref([]);
let autocompleteService = null;

async function capture() {
  error.value = ''; success.value = false; loadingLoc.value = true;
  try {
    const pos = await getCurrentPosition();
    lat.value = pos.lat; lng.value = pos.lng;
  } catch (e) { error.value = e.message || 'Không lấy được vị trí'; }
  finally { loadingLoc.value = false; }
}

async function geocodeAddress(address) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  } else {
    throw new Error('Không tìm được vị trí từ địa chỉ.');
  }
}

function loadGooglePlacesScript() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }
    const scriptId = 'google-places-script';
    if (document.getElementById(scriptId)) {
      document.getElementById(scriptId).addEventListener('load', resolve);
      return;
    }
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Không tải được Google Places API'));
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  // Chỉ cần khởi tạo khi người dùng phải nhập địa chỉ (đã có lỗi GPS)
  if (error.value && (error.value.toLowerCase().includes('geolocation') || error.value.toLowerCase().includes('denied'))) {
    try {
      await loadGooglePlacesScript();
      if (window.google?.maps?.places) {
        autocompleteService = new window.google.maps.places.AutocompleteService();
      }
    } catch (e) {
      // Không chặn luồng nếu lỗi tải script
      console.warn(e);
    }
  }
});

async function onAddressInput() {
  if (!manualAddress.value) {
    suggestions.value = [];
    return;
  }
  if (!autocompleteService) {
    try {
      await loadGooglePlacesScript();
      autocompleteService = new window.google.maps.places.AutocompleteService();
    } catch (e) {
      return; // Không có service thì bỏ qua
    }
  }
  autocompleteService.getPlacePredictions({
    input: manualAddress.value,
    componentRestrictions: { country: 'vn' },
    types: ['geocode']
  }, (predictions, status) => {
    if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      suggestions.value = [];
      return;
    }
    suggestions.value = predictions;
  });
}

function selectSuggestion(s) {
  manualAddress.value = s.description;
  suggestions.value = [];
}

async function handleSubmit() {
  error.value=''; success.value=false; submitting.value=true;
  try {
    let submitLat = lat.value, submitLng = lng.value;
    if (lat.value == null && manualAddress.value) {
      // Nếu không có GPS, thử geocode địa chỉ
      try {
        const geo = await geocodeAddress(manualAddress.value.trim());
        submitLat = geo.lat; submitLng = geo.lng;
      } catch (e) {
        // Nếu geocode lỗi, vẫn cho submit với address text, lat/lng null
        submitLat = null; submitLng = null;
      }
    }
    // Nếu có GPS hoặc có manualAddress (dù không geocode được), vẫn cho submit
    if ((submitLat == null || submitLng == null) && !manualAddress.value) throw new Error('Bạn cần nhập địa chỉ hợp lệ hoặc lấy vị trí GPS');
    await submitVictim({
      name: name.value.trim(),
      phone: phone.value.trim(),
      address: manualAddress.value.trim(),
      lat: submitLat,
      lng: submitLng
    });
    success.value=true;
    manualAddress.value = '';
  } catch (e) { error.value = e.message || 'Gửi thất bại'; }
  finally { submitting.value=false; }
}
</script>

<style scoped>
.report { max-width:480px; }
.form { display:flex; flex-direction:column; gap:0.75rem; }
input { width:100%; padding:0.5rem; border:1px solid #ccc; border-radius:4px; }
button { padding:0.6rem 1rem; background:#006494; color:#fff; border:none; border-radius:4px; cursor:pointer; }
button:disabled { opacity:0.6; cursor:not-allowed; }
.error { color:#c62828; margin-top:1rem; }
.success { color:#2e7d32; margin-top:1rem; font-weight:600; }
.loc-block { display:flex; flex-direction:column; gap:0.25rem; }
.hint { font-size:0.85rem; color:#666; }
.manual-address { position:relative; }
.autocomplete-suggestions { list-style:none; margin:0.25rem 0 0; padding:0; background:#fff; border:1px solid #ccc; border-radius:4px; max-height:180px; overflow-y:auto; box-shadow:0 2px 6px rgba(0,0,0,0.15); }
.autocomplete-suggestions li { padding:0.5rem 0.75rem; cursor:pointer; font-size:0.9rem; }
.autocomplete-suggestions li:hover { background:#f0f4f8; }
</style>
