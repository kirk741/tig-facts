<template>
  <MainLayout>
    <AppCard v-for="post in formattedPosts">
      <template #card-content>
        <h3>{{ post.title }}</h3>
        <p>{{ post.briefDescription }}</p>
      </template>
      <template #card-footer>{{ post.fullName }} | {{ post.dateTime }}
        <AppButtonGroup>
          <AppButton :variant="'unbordered'" @click="router.push(`/post/${post.id}`)">
            <IconShow />
          </AppButton>
          <AppButton :variant="'unbordered'"
            @click="router.push({ path: `/post/${post.id}`, query: { openComment: true } })">
            <IconComment />
          </AppButton>
        </AppButtonGroup>
      </template>
    </AppCard>
  </MainLayout>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import router from '@/router';
import { computed, onMounted, ref } from 'vue';

const rawPosts = ref([]);

const formattedPosts = computed(() => {
  if (!rawPosts.value || !Array.isArray(rawPosts.value)) return [];

  return rawPosts.value.flatMap(blog => {
    return blog.post.map(post => ({
      ...post,
      fullName: blog.fullName,
      blogId: blog.id
    }));
  })
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .map(post => ({
      ...post,
      dateTime: new Date(post.dateTime).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }));
});

const loadData = async () => {
  try {
    const response = await apiFetch('/userInfo/findAll');
    rawPosts.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await loadData();
});
</script>

<style scoped></style>