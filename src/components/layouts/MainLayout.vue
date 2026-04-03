<template>
  <div class="container">
    <AppLogo class="logo" />
    <div class="grid">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.container {
  padding: var(--gap-xl);
}

.logo {
  margin-bottom: var(--gap-xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(280px, calc(33% - var(--gap-m))), 1fr));
  gap: var(--gap-m);
  width: 100%;
}
</style>