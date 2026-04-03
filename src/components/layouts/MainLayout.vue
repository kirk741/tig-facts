<template>
  <div class="container">
    <AppLogo class="logo" />
    <div class="grid">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
.container {
  padding: var(--gap-xl);
}

.logo {
  margin-bottom: var(--gap-xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap-m);
}
</style>