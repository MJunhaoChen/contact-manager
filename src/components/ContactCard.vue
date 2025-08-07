<template>
  <div class="card">
    <div class="card-header">
      <h3>{{ contact.name }}</h3>
      <div class="actions">
        <button class="favorite" @click="onToggleFavorite" :aria-label="contact.favorite ? 'Unfavorite' : 'Favorite'">
          <span v-if="contact.favorite">★</span>
          <span v-else>☆</span>
        </button>
        <router-link :to="`/edit/${contact.id}`" class="edit">Edit</router-link>
        <button class="delete" @click="onDelete">Delete</button>
      </div>
    </div>
    <div class="card-body">
      <p class="email">{{ contact.email }}</p>
      <p class="phone">{{ contact.phone }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['contact'])
const emit = defineEmits(['delete', 'toggle-favorite'])

function onDelete() {
  emit('delete', props.contact.id)
}
function onToggleFavorite() {
  emit('toggle-favorite', props.contact.id)
}
</script>

<style scoped>
.card {
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s, background 0.3s, color 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: 0 4px 24px rgba(49, 130, 206, 0.10);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.favorite {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #f6ad55;
  cursor: pointer;
  padding: 0 0.2rem;
  transition: color 0.2s;
  line-height: 1;
}
.favorite:hover {
  color: #ed8936;
}

.edit {
  background: #3182ce;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.2s;
}

.edit:hover {
  background: #225ea8;
}

.delete {
  background: #e53e3e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}

.delete:hover {
  background: #b91c1c;
}

.card-body {
  margin-top: 0.5rem;
}

.email,
.phone {
  color: #4a5568;
  font-size: 1rem;
  margin: 0.1rem 0;
}
</style>
