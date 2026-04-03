<template>
  <div class="input-container">
    <input v-model="model" :type="currentType" :class="['input', error ? 'input--invalid' : `input--${variant}`]"
      :placeholder="placeholder" :required="required" />

    <span v-if="maxCount" class="input__count">{{ model?.trim().length }} / {{ maxCount }}</span>

    <span class="input__icon" v-if="type === 'password'">
      <IconEyeOpen v-if="currentType === 'password'" @click="currentType = 'text'" />
      <IconEyeHide v-else @click="currentType = 'password'" />
    </span>

    <span v-if="error" class="input__error">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const model = defineModel();

const props = defineProps({
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

const currentType = ref(props.type);
</script>

<style scoped>
.input-container {
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
  padding: 0 var(--gap-s);
  background-color: var(--color-card);
  font-size: var(--font-size-small);
}

.input--invalid {
  border: 1px solid var(--color-invalid);
}

.input__error {
  position: absolute;
  bottom: 0;
  left: var(--gap-xl);
  transform: translateY(100%);
  color: var(--color-invalid);
  font-size: var(--font-size-small);
}

.input__icon {
  position: absolute;
  right: var(--gap-m);
  top: 15px;
  cursor: pointer;
}
</style>