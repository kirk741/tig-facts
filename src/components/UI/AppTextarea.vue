<template>
  <div class="textarea__container">
    <textarea v-model="model" :type="type" :class="['textarea', `textarea--${variant}`]" :placeholder="placeholder" />
    <span v-if="maxCount" class="textarea__count">{{ model?.length }} / {{ maxCount }}</span>
  </div>
  <span v-if="error" class="textarea__error">{{ error }}</span>
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
})
</script>

<style scoped>
.textarea__container {
  position: relative;
}

.textarea {
  border-radius: var(--radius-main);
  border: 1px solid var(--color-text);
  outline: none;
  background-color: transparent;
  padding: var(--gap-m) var(--gap-xl);
  color: var(--color-text);
  font-size: var(--font-size-normal);
  width: 100%;
  resize: vertical;
}

.textarea::placeholder {
  color: var(--color-muted);
}

.textarea:focus {
  border: 1px solid var(--color-primary);
}

.textarea__count {
  position: absolute;
  right: var(--gap-xl);
  bottom: 0;
  transform: translateY(30%);
  padding: var(--gap-s);
  background-color: var(--color-bg);
  font-size: var(--font-size-small);
}

.textarea--invalid {
  border: 1px solid var(--color-invalid);
}

.textarea__error {
  color: var(--color-invalid);
  font-size: var(--font-size-small);
  margin-left: var(--gap-xl);
}
</style>