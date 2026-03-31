<template>
  <div class="btn-group">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped>
.btn-group {
  display: flex;
  gap: 0;
}

.btn-group :deep(button) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  height: 48px;
  width: 48px;
}
</style>