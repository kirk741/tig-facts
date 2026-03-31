<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue';

const input = ref('');
const inputError = ref('');
const MAX_LEN = 5;

const textarea = ref('');
const textareaError = ref('');
const MAX_LEN_TA = 5;

const handleSubmit = () => {
  console.log('[wdqwd]');
}

watch(input, (newValue) => {
  if (newValue.length > MAX_LEN) {
    inputError.value = 'Не больше 5 символов'
  } else {
    inputError.value = ''
  }
});

watch(textarea, (newValue) => {
  if (newValue.length > MAX_LEN_TA) {
    textareaError.value = 'Не больше 5 символов'
  } else {
    textareaError.value = ''
  }
})
</script>

<template>
  <RouterView />
</template>

<style></style>
