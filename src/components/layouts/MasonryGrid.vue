<template>
  <div ref="gridElement" class="masonry">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { RegularMasonryGrid } from '@masonry-grid/vanilla'

const props = defineProps(['posts']);
const gridElement = ref(null);
let masonryInstance = null;

const initMasonry = () => {
  if (gridElement.value) {
    masonryInstance = new RegularMasonryGrid(gridElement.value);
  }
}

watch(() => props.posts, async () => {
  await nextTick();
  initMasonry();
}, { deep: true });

onMounted(() => {
  initMasonry();
});
</script>

<style scoped>
.masonry {
  display: block;
  gap: 10px;
  column-gap: 10px;
  column-count: 3;
}

@media (max-width: 769px) {
  .masonry {
    column-count: 2;
  }
}

@media (max-width: 415px) {
  .masonry {
    column-count: 1;
  }
}

:deep(.card) {
  break-inside: avoid;
  margin-bottom: 10px;
  display: inline-block;
  width: 100%;
}
</style>