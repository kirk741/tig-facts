<template>
  <AuthLayout>
    <AppCard>
      <template #card-content>
        <AuthForm />
      </template>
    </AppCard>
  </AuthLayout>
</template>

<script setup>
import AuthForm from '@/components/forms/AuthForm.vue';

</script>