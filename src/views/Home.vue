<template>
  <div class="home">
    <div class="header">
      <h2>Contacts</h2>
      <router-link to="/add" class="add-btn">Add Contact</router-link>
    </div>
    <div class="tabs">
      <button :class="{ active: tab === 'all' }" @click="tab = 'all'">All</button>
      <button :class="{ active: tab === 'favorites' }" @click="tab = 'favorites'">Favorites</button>
    </div>
    <input
      v-model="search"
      type="text"
      class="search-input"
      placeholder="Search by name, email, or phone..."
    />
    <div class="contact-list">
      <ContactCard
        v-for="c in filteredContacts"
        :key="c.id"
        :contact="c"
        @delete="handleDelete"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContactStore } from '../store/contacts'
import ContactCard from '../components/ContactCard.vue'

const store = useContactStore()
const search = ref('')
const tab = ref('all')

const filteredContacts = computed(() => {
  const q = search.value.trim().toLowerCase()
  let list = store.contacts
  if (tab.value === 'favorites') {
    list = list.filter(c => c.favorite)
  }
  if (!q) return list
  return list.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    String(c.phone).toLowerCase().includes(q)
  )
})

onMounted(() => {
  store.init()
})

function handleDelete(id) {
  store.deleteContact(id)
}
function handleToggleFavorite(id) {
  store.toggleFavorite(id)
}
</script>

<style scoped>
.home {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
h2 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
}
.add-btn {
  background: #3182ce;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #225ea8;
}
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tabs button {
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tabs button.active {
  background: #3182ce;
  color: #fff;
}
.contact-list {
  margin-top: 1rem;
}
.search-input {
  width: calc(100% - 30px);
  max-width: 570px;
  padding: 0.6rem 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7fafc;
  outline: none;
  transition: border 0.2s;
  display: block;
}
.search-input:focus {
  border: 1.5px solid #3182ce;
}
</style>
