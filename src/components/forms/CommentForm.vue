<template>
  <AppCard class="form">
    <template #card-content>
      <h3>Оставить комментарий</h3>
      <AppForm @submit.prevent="submitComment" novalidate>
        <template #form-fields>
          <AppInput v-model="form.username" placeholder="Введите имя*" :error="errors.username"
            :maxCount="maxCounts.username" @update:modelValue="() => validateField('username')" />
          <AppInput v-model="form.email" placeholder="Введите email*" :error="errors.email"
            :maxCount="maxCounts.email" />
          <AppTextarea v-model="form.comment" placeholder="Что вас больше всего впечатлило?*" :error="errors.comment"
            :maxCount="maxCounts.comment" @update:modelValue="() => validateField('comment')" />
        </template>

        <template #form-action>
          <AppButton type="button" variant="unbordered" @click="$emit('cancel')">
            Отмена
          </AppButton>
          <AppButton type="submit">
            Отправить
          </AppButton>
        </template>

        <template #form-error>
          {{ errors.form }}
        </template>
      </AppForm>
    </template>
  </AppCard>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = route.params.id;
const emit = defineEmits(['reloadData', 'closeForm']);

const form = ref({
  username: '',
  email: '',
  comment: ''
});

const errors = ref({
  username: '',
  email: '',
  comment: '',
  form: '',
});

const maxCounts = {
  username: 50,
  email: 50,
  comment: 255
};

const validateField = (field) => {
  const value = form.value[field].trim();

  if (!value) {
    errors.value[field] = 'Обязательное поле';
    return false;
  }

  if (value.length > maxCounts[field]) {
    errors.value[field] = 'Значение должно быть короче';
    return false;
  }

  if (field === 'email') {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValidEmail) {
      errors.value.email = 'Некорректный email';
      return false;
    }
  }

  errors.value[field] = '';
  return true;
};

const validateForm = () => {
  const fields = Object.keys(form.value);
  return fields.every(field => validateField(field));
}


const submitComment = async () => {
  errors.value.form = '';

  if (!validateForm()) return;

  try {
    await apiFetch(`/comment?postId=${postId}`, {
      method: 'POST',
      body: {
        email: form.value.email.trim(),
        textComment: form.value.comment.trim(),
        userInfo: form.value.username.trim()
      }
    });

    form.value.username = '';
    form.value.email = '';
    form.value.comment = '';

    emit('reloadData');
    emit('closeForm');
  } catch (err) {
    errors.value.form = 'Ошибка при отправке';
  }
}
</script>