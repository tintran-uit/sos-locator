<template>
  <section class="hotline">
    <h2>Số điện thoại cứu hộ các tỉnh</h2>
    <div class="province-list">
      <div class="province">
        <h3>Gia Lai - Bình Định (cũ))</h3>
        <ul>
          <li>Cảnh sát PCCC: <a href="tel:114"><b>114</b></a></li>
          <li><a href="tel:0914907576">0914 907 576</a>: Cano khu vực Long Vân - Hùng Vương</li>
          <li><a href="tel:0867772726">086 777 2726</a>: anh Tâm Kỳ Co</li>
          <li><a href="tel:0345661088">0345 661 088</a>: anh Hiệp HDV</li>
          <li><a href="tel:0387234577">0387 234 577</a>: anh Đảo Nhơn Lý</li>
          <li><a href="tel:0868824090">0868 824 090</a>: anh Hoá Kỳ Co</li>
          <li><a href="tel:0945244771">0945 244 771</a>: Cứu hộ khu chợ Dinh</li>
          <li><a href="tel:0914159157">0914 159 157</a>: anh Tuấn khu vực Tuy Phước</li>
          <li><a href="tel:0914123203">0914 123 203</a>: anh Đây khu vực Tuy Phước</li>
          <li><a href="tel:0855505552">0855 505 552</a>: Đội anh Quyết Quảng Ngãi</li>
          <li><a href="tel:0983422222">0983 422 222</a>: anh Lượng (fb Lượng Vũ)</li>
          <li><a href="tel:0935093545">0935 093 545</a>: Quang UD</li>
          <li><a href="tel:0918390252">0918 390 252</a>: Đại Big Event</li>
        </ul>
      </div>
      <div class="province">
        <h3>Đắk Lắk - Phú Yên (cũ)</h3>
        <ul>
          <li>Đ/c Nguyễn Thị Anh Hoa (CAP Bình Kiến): <a href="tel:0901927199">0901 927 199</a>, <a href="tel:0941131177">0941 131 177</a></li>
          <li>Đ/c Đỗ Quốc Đại (CAP Đông Hòa): <a href="tel:0976975949">0976 975 949</a>, <a href="tel:0369074407">0369 074 407</a></li>
          <li>Đ/c Nguyễn Ngọc Văn (CAP Hòa Hiệp): <a href="tel:0913880034">0913 880 034</a></li>
          <li>Đ/c Đỗ Ngọc Quý (CAP Phú Yên): <a href="tel:0592955667">0592 955 667</a></li>
          <li>Đ/c Ngô Thị Hồng Thắm (CAP Sông Cầu): <a href="tel:0903936079">0903 936 079</a></li>
          <li>Đ/c Nguyễn Chí Thi (CAP Tuy Hòa): <a href="tel:0903570838">0903 570 838</a></li>
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
