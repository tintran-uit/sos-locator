<template>
  <div class="layout">
    <header>
      <h1>SOS Locator</h1>
      <nav>
        <RouterLink to="/report">Gửi tín hiệu cứu nạn</RouterLink>
        <RouterLink to="/rescue">Bản đồ cứu hộ</RouterLink>
        <RouterLink to="/hotline">Số điện thoại cứu hộ</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout { font-family: system-ui, sans-serif; }
header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #13293d;
  color: #fff;
}
header h1 {
  font-size: 1.3rem;
  margin: 0 0 0.2em 0;
  letter-spacing: 0.02em;
}
nav {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  width: 100%;
  scrollbar-width: none;
}
nav::-webkit-scrollbar { display: none; }
nav a {
  color: #fff;
  background: rgba(255,255,255,0.08);
  border-radius: 5px;
  padding: 0.5em 1.1em;
  font-size: 1.05em;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s;
}
nav a.router-link-active {
  font-weight: 600;
  background: #006494;
  text-decoration: underline;
}
main { padding: 1.25rem; }
@media (max-width: 600px) {
  header {
    padding: 0.7rem 0.5rem 0.7rem 0.7rem;
    gap: 0.3rem;
  }
  header h1 {
    font-size: 1.05rem;
  }
  nav a {
    font-size: 0.98em;
    padding: 0.45em 0.8em;
  }
  main { padding: 0.7rem 0.2rem; }
}
</style>
