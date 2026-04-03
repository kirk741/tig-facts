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
          <AppButton type="button" variant="unbordered" @click="$emit('close')">
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { apiFetch } from '@/api/apiFetch';

const route = useRoute();
const userInfoId = route.params.id;

const emit = defineEmits(['close', 'reloadData']);

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
});

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
  errors.value.form = '';
  if (!validateForm()) return;

  const isEdit = !!props.initialData?.id;
  const url = isEdit ? '/post' : `/post?userInfoId=${userInfoId}`;
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const payload = {
      title: form.value.title.trim(),
      briefDescription: form.value.briefDescription.trim(),
      fullDescription: form.value.fullDescription.trim(),
    };

    if (isEdit) {
      payload.id = props.initialData.id;
    }

    await apiFetch(url, {
      method: method,
      body: payload
    });

    emit('reloadData');
    emit('close');
  } catch (err) {
    errors.value.form = 'Ошибка при сохранении';
  }
};

onMounted(() => {
  if (props.initialData) {
    form.value = {
      title: props.initialData.title,
      briefDescription: props.initialData.briefDescription,
      fullDescription: props.initialData.fullDescription
    };
  }
});
</script>