<template>
  <div class="input__container">
    <input v-model="model" :type="type" :class="['input', `input--${variant}`]" :placeholder="placeholder" />
    <span v-if="maxCount" class="input__count">{{ model?.length }} / {{ maxCount }}</span>
  </div>
  <span v-if="error" class="input__error">{{ error }}</span>
</template>

<script setup>
const model = defineModel({
  default: ''
});

defineProps({
  type: {
    type: String,
    default: 'text'
  },
  variant: {
    type: String,
    default: 'normal'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  maxCount: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.input__container {
  position: relative;
}

.input {
  border-radius: var(--radius-main);
  border: 1px solid var(--color-text);
  outline: none;
  background-color: transparent;
  padding: var(--gap-m) var(--gap-xl);
  color: var(--color-text);
  font-size: var(--font-size-normal);
  width: 100%;
}

.input::placeholder {
  color: var(--color-muted);
}

.input:focus {
  border: 1px solid var(--color-primary);
}

.input__count {
  position: absolute;
  right: var(--gap-xl);
  bottom: 0;
  transform: translateY(50%);
  padding: var(--gap-s);
  background-color: var(--color-bg);
  font-size: var(--font-size-small);
}

.input--invalid {
  border: 1px solid var(--color-invalid);
}

.input__error {
  color: var(--color-invalid);
  font-size: var(--font-size-small);
  margin-left: var(--gap-xl);
}
</style>