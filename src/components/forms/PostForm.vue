<template>
  <AppCard class="form">
    <template #card-content>
      <h3>Добавить пост</h3>
      <AppForm @submit.prevent="submitPost" novalidate>
        <template #form-fields>
          <AppInput v-model="form.title" placeholder="Заголовок" :error="errors.title" :maxCount="maxCounts.title"
            @update:modelValue="() => validateField('title')" />
          <AppTextarea v-model="form.briefDescription" placeholder="Заинтригуйте пользователя"
            :error="errors.briefDescription" :maxCount="maxCounts.briefDescription"
            @update:modelValue="() => validateField('briefDescription')" />
          <AppTextarea v-model="form.fullDescription" placeholder="Напишите свой интересный пост"
            :error="errors.fullDescription" :maxCount="maxCounts.fullDescription"
            @update:modelValue="() => validateField('fullDescription')" />
        </template>
        <template #form-action>
          <div class="form-buttons">
            <AppButton type="button" variant="unbordered" @click="$emit('close')">
              Отмена
            </AppButton>
            <AppButton type="submit">
              Отправить
            </AppButton>
          </div>
        </template>
        <template #form-error>{{ errors.form }}</template>
      </AppForm>
    </template>
  </AppCard>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { apiFetch } from '@/api/apiFetch';

const route = useRoute();
const userInfoId = route.params.id;

const emit = defineEmits(['close', 'reloadData']);

const form = ref({
  briefDescription: '',
  fullDescription: '',
  title: ''
});

const errors = ref({
  briefDescription: '',
  fullDescription: '',
  title: '',
  form: '',
});

const maxCounts = {
  title: 50,
  briefDescription: 100,
  fullDescription: 255
};

const validateField = (field) => {
  const value = form.value[field].trim();

  if (!value && field !== 'fullDescription') {
    errors.value[field] = 'Обязательное поле';
    return false;
  }

  if (value.length > maxCounts[field]) {
    errors.value[field] = 'Значение должно быть короче';
    return false;
  }

  errors.value[field] = '';
  return true;
}

const validateForm = () => {
  const fields = Object.keys(form.value);
  return fields.every(field => validateField(field));
}

const submitPost = async () => {
  errors.value.form = ''
  if (!validateForm()) return;

  try {
    await apiFetch(`/post?userInfoId=${userInfoId}`, {
      method: 'POST',
      body: {
        briefDescription: form.value.briefDescription.trim(),
        fullDescription: form.value.fullDescription.trim(),
        title: form.value.title.trim()
      }
    });

    form.value.title = '';
    form.value.briefDescription = '';
    form.value.fullDescription = '';

    emit('reloadData');
    emit('close');
  } catch (err) {
    errors.value.form = 'Ошибка при создании поста';
  }
}
</script>

<style scoped>
.form-buttons {
  display: flex;
  justify-content: space-between;
}
</style>