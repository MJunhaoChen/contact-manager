<template>
  <div class="home">
    <div class="header">
      <h2>Contacts</h2>
      <router-link to="/add" class="add-btn">Add Contact</router-link>
    </div>
    <input
      v-model="search"
      type="text"
      class="search-input"
      placeholder="Search by name, email, or phone..."
    />
    <div class="contact-list">
      <ContactCard v-for="c in filteredContacts" :key="c.id" :contact="c" @delete="handleDelete" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContactStore } from '../store/contacts'
import ContactCard from '../components/ContactCard.vue'

const store = useContactStore()
const search = ref('')

const filteredContacts = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return store.contacts
  return store.contacts.filter(c =>
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
