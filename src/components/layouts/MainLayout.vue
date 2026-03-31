<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap-xl);
}
</style>