<template>
  <section class="hotline">
    <h2>Số điện thoại cứu hộ các tỉnh</h2>
    <div class="province-list">
      <div class="province">
        <h3>Gia Lai - Bình Định (cũ))</h3>
        <ul>
          <li>Cảnh sát PCCC: <b>114</b></li>
          <li>0914 907 576: Cano khu vực Long Vân - Hùng Vương</li>
          <li>086 777 2726: anh Tâm Kỳ Co</li>
          <li>0345 661 088: anh Hiệp HDV</li>
          <li>0387 234 577: anh Đảo Nhơn Lý</li>
          <li>0868 824 090: anh Hoá Kỳ Co</li>
          <li>0945 244 771: Cứu hộ khu chợ Dinh</li>
          <li>0914 159 157: anh Tuấn khu vực Tuy Phước</li>
          <li>0914 123 203: anh Đây khu vực Tuy Phước</li>
          <li>0855 505 552: Đội anh Quyết Quảng Ngãi</li>
          <li>0983 422 222: anh Lượng (fb Lượng Vũ)</li>
          <li>0935 093 545: Quang UD</li>
          <li>0918 390 252: Đại Big Event</li>
        </ul>
      </div>
      <!-- Thêm các tỉnh khác tương tự nếu cần -->
    </div>
    <p class="note">* Gọi 114 để gặp cứu hộ cứu nạn toàn quốc. Gọi 115 để gặp cấp cứu y tế.</p>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hotline { max-width: 600px; margin: 0 auto; }
.province-list { display: flex; flex-direction: column; gap: 1.2rem; }
.province h3 { margin: 0 0 0.2em 0; color: #006494; font-size: 1.1em; }
.province ul { margin: 0; padding-left: 1.2em; }
.province li { font-size: 1em; margin-bottom: 0.15em; }
.note { margin-top: 1.5em; color: #666; font-size: 0.95em; }
</style>
