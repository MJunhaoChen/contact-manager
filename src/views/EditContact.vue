<template>
  <div class="edit-contact">
    <h2>Edit Contact</h2>
    <form @submit.prevent="saveContact">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="contact.name" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="contact.email" type="email" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input id="phone" v-model="contact.phone" type="tel" required />
      </div>
      <div class="actions">
        <button type="submit" class="save">Save</button>
        <button type="button" class="cancel" @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactStore } from '../store/contacts'

const route = useRoute()
const router = useRouter()
const store = useContactStore()
const contact = ref({ name: '', email: '', phone: '' })

onMounted(() => {
  const id = route.params.id
  const found = store.contacts.find(c => c.id === id)
  if (found) {
    contact.value = { ...found }
  } else {
    router.replace('/')
  }
})

function saveContact() {
  store.updateContact({ ...contact.value })
  router.push('/')
}

function cancelEdit() {
  router.push('/')
}
</script>

<style scoped>
.edit-contact {
  max-width: 400px;
  margin: 0 auto;
}
h2 {
  margin-bottom: 1.5rem;
  color: #2d3748;
  font-size: 1.6rem;
  font-weight: 600;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
label {
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
}
input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7fafc;
  outline: none;
  transition: border 0.2s;
}
input:focus {
  border: 1.5px solid #3182ce;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.save {
  background: #3182ce;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.save:hover {
  background: #225ea8;
}
.cancel {
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel:hover {
  background: #cbd5e1;
}
</style>
