<template>
  <AppForm :variant="'centered'" class="form">
    <template #form-header>
      <AppLogo />
    </template>
    <template #form-fields>
      <AppInput :placeholder="'Введите логин'" />
      <AppInput :placeholder="'Введите пароль'" />
    </template>
    <template #form-action>
      <AppButton>Войти</AppButton>
    </template>
  </AppForm>
</template>

<script setup>
</script>

<style scoped>
.form {}
</style>