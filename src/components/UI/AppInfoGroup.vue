<template>
  <div class="post__meta">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  fullName: {
    type: String,
    default: ''
  },
  blogName: {
    type: String,
    default: ''
  },
  dateTime: {
    type: String,
    default: ''
  },
});
</script>

<style scoped>
.post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-s);
}

.post__meta :deep(span) {
  text-wrap: nowrap;
}
</style>