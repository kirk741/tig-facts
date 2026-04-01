<template>
  <AuthLayout>
    <AppCard>
      <template #card-content>
        <AuthForm @login="login" @typing="error = ''" />
        <div class="form__error" v-if="error">{{ error }}</div>
      </template>
    </AppCard>
  </AuthLayout>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import router from '@/router';
import { ref } from 'vue';

const error = ref('');

const login = async (formData) => {
  error.value = '';

  try {
    const params = new URLSearchParams(formData).toString();

    await apiFetch(`/login?${params}`, {
      method: 'POST'
    });
    router.push('/');
  } catch (err) {
    if (err.status === 422) {
      error.value = 'Неверный логин или пароль';
    } else {
      error.value = 'Ошибка сервера или сети';
    }
  }
}
</script>

<style scoped>
.form__error {
  color: var(--color-invalid)
}
</style>