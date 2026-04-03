<template>
  <div class="post__info">
    <slot></slot>
  </div>
</template>

<style scoped>
.post__info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-s);
}

.post__info :deep(span) {
  text-wrap: nowrap;
}
</style>