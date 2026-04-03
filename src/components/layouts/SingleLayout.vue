<template>
  <div class="container">
    <AppLogo class="logo" />
    <div class="content">
      <div class="form">
        <slot name="form"></slot>
      </div>
      <div class="cards">
        <MasonryGrid :config="[2, 2, 1]">
          <slot name="cards"></slot>
        </MasonryGrid>
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