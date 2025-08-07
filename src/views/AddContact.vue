<template>
  <div class="add-contact">
    <Toast :show="showToast" :key="toastKey">
      <ul v-if="toastMessages.length">
        <li v-for="msg in toastMessages" :key="msg">{{ msg }}</li>
      </ul>
    </Toast>
    <h2>Add New Contact</h2>
    <form @submit.prevent="addContact">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="text" autocomplete="off" />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input id="phone" v-model="form.phone" type="text" autocomplete="off" />
      </div>

      <div class="actions">
        <button type="submit" class="save">Add</button>
        <button type="button" class="cancel" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '../store/contacts'
import * as yup from 'yup'
import Toast from '../components/Toast.vue'

const router = useRouter()
const store = useContactStore()

const form = ref({
  name: '',
  email: '',
  phone: ''
})

const showToast = ref(false)
const toastMessages = ref([])
const toastKey = ref(0)

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Enter a valid email address'
    ),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^06\d{8}$/, 'Dutch mobile: must start with 06 and be 10 digits (numbers only)')
})

async function addContact() {
  try {
    await schema.validate(form.value, { abortEarly: false })
    toastMessages.value = []
    showToast.value = false

    const id = Date.now().toString()
    store.addContact({ id, ...form.value })

    router.push('/')
  } catch (err) {
    if (err.inner) {
      toastMessages.value = err.inner.map(e => e.message)
      showToast.value = false
      toastKey.value++
      // nextTick not strictly needed, but ensures reactivity
      setTimeout(() => { showToast.value = true }, 0)
    }
  }
}

function cancel() {
  router.push('/')
}
</script>

<style scoped>
.add-contact {
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
