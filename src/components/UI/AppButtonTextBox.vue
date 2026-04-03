<template>
  <div class="button-text-box">
    <slot></slot>
  </div>
</template>

<style scoped>
.button-text-box {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--gap-xs);
  align-items: center;
  justify-content: center;
  transition: color .3s;
  min-width: 48px;
}

.button-text-box:hover {
  color: var(--color-primary);
}

.button-text-box:deep(button) {
  height: 24px;
  width: 24px;
}
</style>