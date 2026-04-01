<template>
  <div class="container">
    <AppLogo class="logo" />
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

.logo {
  margin-bottom: var(--gap-xl);
}
</style>