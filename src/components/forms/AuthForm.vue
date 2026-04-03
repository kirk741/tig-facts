<template>
  <AppForm :variant="'centered'" class="form" @submit.prevent="login" novalidate>
    <template #form-header>
      <AppLogo />
    </template>
    <template #form-fields>
      <AppInput v-model="form.username" @update:model-value="() => validateField('username')" :error="errors.username"
        :placeholder="'Логин*'" :required="true"></AppInput>
      <AppInput v-model="form.password" @update:model-value="() => validateField('password')" :error="errors.password"
        :placeholder="'Пароль*'" :type="'password'" :required="true"></AppInput>
    </template>
    <template #form-action>
      <AppButton type="submit">Войти</AppButton>
    </template>
    <template #form-error>{{ errors.form ? errors.form : '' }}</template>
  </AppForm>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import router from '@/router';
import { ref } from 'vue';

const form = ref({
  username: '',
  password: ''
});

const errors = ref({
  username: '',
  password: '',
  form: ''
});

const validateField = (field) => {
  const value = form.value[field].trim();

  if (!value) {
    errors.value[field] = 'Обязательное поле';
    return false;
  }

  errors.value[field] = '';
  return true;
};

const validateForm = () => {
  const fields = Object.keys(form.value);
  return fields.every(field => validateField(field));
};

const login = async () => {
  errors.value.form = '';

  if (!validateForm()) return;

  try {
    const params = new URLSearchParams({
      username: form.value.username,
      password: form.value.password
    }).toString();

    await apiFetch(`/login?${params}`, {
      method: 'POST'
    });

    router.push('/');
  } catch (err) {
    console.error(err);
    if (err.status === 422) {
      errors.value.form = 'Неверный логин или пароль';
    } else {
      errors.value.form = 'Не удалось выполнить вход';
    }
  }
};
</script>