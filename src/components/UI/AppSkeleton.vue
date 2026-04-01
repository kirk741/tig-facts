<template>
  <div class="skeleton__card">
  </div>
</template>

<style scoped>
.skeleton__card {
  border-radius: var(--radius-main);
  padding: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton__card {
  background: linear-gradient(90deg, #252525 25%, #333 50%, #252525 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>