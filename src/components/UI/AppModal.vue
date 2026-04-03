<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: var(--gap-s);
}

.modal-content {
  border-radius: var(--radius-main);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.modal-content::-webkit-scrollbar {
  display: none;
}
</style>