<template>
  <section class="report">
    <h2>Gửi vị trí cứu nạn</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <label>Họ tên
        <input v-model="name" required placeholder="Ví dụ: Nguyễn Văn A" />
      </label>
      <label>Số điện thoại
        <input v-model="phone" required pattern="[0-9+ ]{6,}" placeholder="090..." />
      </label>
      <div class="loc-block">
        <button type="button" @click="capture" :disabled="loadingLoc">{{ loadingLoc ? 'Đang lấy GPS...' : 'Lấy vị trí hiện tại' }}</button>
        <p v-if="lat != null">Vĩ độ: {{ lat.toFixed(6) }}, Kinh độ: {{ lng.toFixed(6) }}</p>
        <p v-else class="hint">Chưa có vị trí</p>
      </div>
      <button type="submit" :disabled="submitting || lat == null">{{ submitting ? 'Đang gửi...' : 'Gửi tín hiệu' }}</button>
    </form>
    <p v-if="error" class="error">Lỗi: {{ error }}</p>
    <p v-if="success" class="success">Đã gửi thành công! Hãy giữ an toàn và chờ đội cứu hộ.</p>
  </section>
</template>

<script setup>
import { ref } from 'vue';
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

async function capture() {
  error.value = ''; success.value = false; loadingLoc.value = true;
  try {
    const pos = await getCurrentPosition();
    lat.value = pos.lat; lng.value = pos.lng;
  } catch (e) { error.value = e.message || 'Không lấy được vị trí'; }
  finally { loadingLoc.value = false; }
}

async function handleSubmit() {
  error.value=''; success.value=false; submitting.value=true;
  try {
    await submitVictim({ name: name.value.trim(), phone: phone.value.trim(), lat: lat.value, lng: lng.value });
    success.value=true;
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
</style>
