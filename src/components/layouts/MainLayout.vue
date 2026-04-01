<template>
  <div class="container">
    <MasonryGrid>
      <slot></slot>
    </MasonryGrid>
  </div>
</template>

<script setup>
</script>

<style>
.container {
  padding: var(--gap-xl);
}
</style>