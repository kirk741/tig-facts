<template>
  <form action="" class="form">
    <div :class="['form__header', `form__header--${variant}`]">
      <slot name="form-header"></slot>
    </div>

    <div class="form__fields">
      <slot name="form-fields"></slot>
    </div>

    <slot name="form-action"></slot>
  </form>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'normal'
  }
})
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xl);
}

.form__header {
  display: flex;
}

.form__header--centered {
  justify-content: center;
}

.form__fields {
  display: flex;
  flex-direction: column;
  gap: var(--gap-s);
}
</style>