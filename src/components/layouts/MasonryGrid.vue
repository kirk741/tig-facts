<template>
  <div ref="gridElement" class="masonry-container">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { RegularMasonryGrid } from '@masonry-grid/vanilla'

const props = defineProps({
  config: {
    type: Array,
    default: () => [3, 2, 1]
  }
});

const gridElement = ref(null);

const init = async () => {
  await nextTick();
  if (gridElement.value) {
    new RegularMasonryGrid(gridElement.value);
  }
}
onMounted(init);
</script>

<style scoped>
.masonry-container {
  display: block;
  width: 100%;
  column-gap: 16px;
  column-count: v-bind('props.config[0]');
}

@media (max-width: 1200px) {
  .masonry-container {
    column-count: v-bind('props.config[1]');
  }
}

@media (max-width: 930px) {
  .masonry-container {
    column-count: v-bind('props.config[2]');
  }
}

@media (max-width: 420px) {
  .masonry-container {
    column-count: 1;
  }
}

:deep(.card),
:deep(> *) {
  break-inside: avoid;
  margin-bottom: 16px;
  display: inline-block;
  width: 100%;
}
</style>