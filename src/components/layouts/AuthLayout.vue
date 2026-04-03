<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  max-width: 500px;
  min-width: 320px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap-xl);
}
</style>