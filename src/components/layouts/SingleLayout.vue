<template>
  <div class="container">
    <AppLogo class="logo" />
    <div class="content">
      <div class="form">
        <slot name="form"></slot>
      </div>
      <div class="cards">
        <div class="grid">
          <slot name="cards"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  padding: var(--gap-xl);
}

.content {
  display: flex;
  gap: var(--gap-m);
  align-items: flex-start;
}

.form {
  width: 320px;
  flex-shrink: 0;
}

.cards {
  flex-grow: 1;
  width: 100%;
}

.logo {
  margin-bottom: var(--gap-xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap-m);
}

@media (max-width: 660px) {
  .form {
    width: 100%;
  }

  .content {
    flex-direction: column;
    padding-bottom: var(--gap-xl);
  }
}
</style>