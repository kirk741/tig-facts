<template>
  <AppForm :variant="'centered'" class="form" @submit.prevent="login" novalidate>
    <template #form-header>
      <AppLogo />
    </template>
    <template #form-fields>
      <AppInput v-model="username" v-model:error="usernameError" @typing="emit('typing')" :placeholder="'Введите логин'"
        :required="true" :error="usernameError" />
      <AppInput v-model="password" v-model:error="passwordError" @typing="emit('typing')"
        :placeholder="'Введите пароль'" :type="'password'" :required="true" :error="passwordError" />
    </template>
    <template #form-action>
      <AppButton @click="login" type="submit">Войти</AppButton>
    </template>
  </AppForm>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['login', 'typing']);

const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');

const login = () => {
  validate();

  if (!usernameError.value && !passwordError.value) {
    const userData = {
      username: username.value.trim(),
      password: password.value.trim()
    };

    emit('login', userData);
  }
}

const validate = () => {
  if (!username.value.trim()) {
    usernameError.value = 'Обязательное поле'
  } else {
    usernameError.value = ''
  }

  if (!password.value.trim()) {
    passwordError.value = 'Обязательное поле'
  } else {
    passwordError.value = ''
  }
}
</script>

<style scoped></style>