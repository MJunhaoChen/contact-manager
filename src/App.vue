<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add">New contact</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f7f8fa;
  font-family: 'Segoe UI', Arial, sans-serif;
  transition: background 0.3s, color 0.3s;
}

nav {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 2rem 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 0 0 16px 16px;
  align-items: center;
  transition: background 0.3s, color 0.3s;
}

nav a {
  text-decoration: none;
  color: #2d3748;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}

nav a.router-link-exact-active {
  background: #3182ce;
  color: #fff;
}

nav a:hover {
  background: #e2e8f0;
}

main {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  padding: 2rem 2.5rem;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
}
@media (max-width: 700px) {
  main {
    padding: 1rem 0.5rem;
  }
  nav {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
  }
}
</style>
