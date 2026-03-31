<template>
  <button :class="['button', `button--${variant}`]">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.button {
  width: 100%;
  padding: var(--gap-m) var(--gap-xl);
  color: inherit;
  border-radius: var(--radius-main);
  border: 1px solid transparent;
  font-size: var(--font-size-normal);
  transition: background-color, .2s, color, .2s, border, .2s;
}

.button--primary {
  background-color: var(--color-primary);
  border: 1px solid transparent;
}

.button--primary:hover {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.button--muted {
  background-color: var(--color-muted);
}

.button--muted:hover {
  background-color: var(--color-muted);
  border: 1px solid transparent;
}

.button--unbordered {
  background-color: transparent;
  border: none;
}

.button--unbordered:hover {
  background-color: transparent;
  border: none;
  color: var(--color-primary);
}
</style>