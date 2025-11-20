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
      <div class="province">
        <h3>Khánh Hòa</h3>
        <ul>
          <li><b>1. ĐẦU MỐI CHÍNH (ƯU TIÊN GỌI)</b></li>
          <li>• <a href="tel:0905151131">0905 151 131</a> – anh Đạo, Cán bộ P. Tây Nha Trang</li>
          <li>• <a href="tel:0967993996">0967 993 996</a> – anh Trường, Đội cứu hộ</li>
          <li style="margin-top:0.5em"><b>2. CANO / THUYỀN PHAO HỖ TRỢ (NHIỀU SỐ KHÁC NHAU)</b></li>
          <li>• <a href="tel:0915421218">0915 421 218</a> – Lái cano, thuyền phao hỗ trợ miễn phí</li>
          <li>• <a href="tel:0962818174">0962 818 174</a> – Anh Khải, cano</li>
          <li>• <a href="tel:0971140115">0971 140 115</a> – Chị Kim Anh, cano</li>
          <li style="margin-top:0.5em"><b>3. CỨU HỘ – CHÍNH QUYỀN KHU VỰC TÂY NHA TRANG</b></li>
          <li>• <a href="tel:0898393039">0898 393 039</a> – Anh Thuận, Ủy ban Tây Nha Trang</li>
          <li>• <a href="tel:0905243263">0905 243 263</a> – Anh Tuyên, Chỉ huy trưởng Tây Nha Trang</li>
          <li>• <a href="tel:0905112888">0905 112 888</a> – Anh Đạt (Vĩnh Hiệp)</li>
          <li style="margin-top:0.5em"><b>4. ĐẦU MỐI KHÁC</b></li>
          <li>• <a href="tel:0836882269">0836 882 269</a> – Bé Nguyên</li>
          <li>• <a href="tel:0972800044">0972 800 044</a> – Anh Hiệp, đội cứu hộ PCTT</li>
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
