<template>
  <div class="home">
    <div class="header">
      <h2>Contacts</h2>
      <router-link to="/add" class="add-btn">Add Contact</router-link>
    </div>
    <div class="contact-list">
      <ContactCard v-for="c in store.contacts" :key="c.id" :contact="c" @delete="handleDelete" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useContactStore } from '../store/contacts'
import ContactCard from '../components/ContactCard.vue'

const store = useContactStore()

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
  margin-bottom: 2rem;
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
</style>
