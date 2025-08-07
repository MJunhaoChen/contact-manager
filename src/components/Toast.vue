<template>
  <transition name="toast-fade">
    <div v-if="visible" class="toast">
      <div class="toast-messages">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  duration: { type: Number, default: 3000 }
})

const visible = ref(props.show)
let timer = null

watch(() => props.show, (val) => {
  visible.value = val
  if (val) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #fee2e2;
  color: #b91c1c;
  padding: 0.7rem 1.3rem 0.7rem 1.1rem;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  font-size: 0.95rem;
  z-index: 1000;
  min-width: 180px;
  max-width: 480px;
  text-align: left;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #fca5a5;
  word-break: break-word;
}
@media (max-width: 500px) {
  .toast {
    left: 0;
    right: 0;
    transform: none;
    max-width: 90vw;
    min-width: 0;
    padding: 0.5rem 0.7rem 0.5rem 0.6rem;
    font-size: 0.89rem;
    top: 16px;
    margin: 0 auto;
  }
}
.toast-messages ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.toast-messages li {
  margin: 0.1em 0 0.1em 0;
  padding: 0;
  font-size: 0.98em;
  line-height: 1.5;
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.4s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.4s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}
</style>
