<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 0;
}

.button-group :deep(button) {
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