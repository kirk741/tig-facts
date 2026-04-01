<template>
  <div ref="gridElement" class="masonry">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RegularMasonryGrid } from '@masonry-grid/vanilla'

const gridElement = ref(null)

onMounted(() => {
  if (gridElement.value) {
    new RegularMasonryGrid(gridElement.value)
  }
})
</script>

<style scoped>
.masonry {
  display: grid;
  overflow: hidden;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 769px) {
  .masonry {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 415px) {
  .masonry {
    grid-template-columns: repeat(1, 1fr);
  }
}

:deep(.card) {
  aspect-ratio: var(--width) / var(--height);
}
</style>