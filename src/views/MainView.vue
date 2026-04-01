<template>
  <MainLayout>
    <template v-if="isLoading">
      <AppSkeleton v-for="i in 6" :key="'skeleton-' + i" />
    </template>

    <template v-else-if="!formattedPosts.length">
      <AppCard>
        <template #card-content>
          <div>
            <h2>Постов пока нет</h2>
            <p>Добавьте свой первый пост</p>
          </div>
        </template>
      </AppCard>
    </template>

    <template v-else>
      <AppCard :variant="'hover'" @click="router.push(`/post/${post.id}`)" v-for="post in formattedPosts"
        :key="post.id">
        <template #card-content>
          <h3>{{ post.title }}</h3>
          <p>{{ post.briefDescription }}</p>
        </template>
        <template #card-footer>
          <AppInfoGroup>
            <RouterLink :to="`/blog/${post.blogId}`" @click.stop><span v-if="post.fullName">{{ post.fullName }}</span>
            </RouterLink>
            <span v-if="post.dateTime">{{ formatDate(post.dateTime) }}</span>
          </AppInfoGroup>
          <AppButtonGroup>
            <AppButton :variant="'unbordered'" @click="router.push(`/post/${post.id}`)">
              <IconShow />
            </AppButton>
            <AppButton :variant="'unbordered'"
              @click.stop="router.push({ path: `/post/${post.id}`, query: { openComment: true } })">
              {{ post.comments.length === 0 ? '' : post.comments.length }}
              <IconComment />
            </AppButton>
          </AppButtonGroup>
        </template>
      </AppCard>
    </template>
  </MainLayout>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import router from '@/router';
import { formatDate } from '@/utils/formatDate';
import { computed, onMounted, ref } from 'vue';

const isLoading = ref(false);
const error = ref('');
const rawData = ref([]);

const loadPosts = async () => {
  isLoading.value = true;
  try {
    isLoading.value = true;
    const response = await apiFetch('/userInfo/findAll');
    rawData.value = response;
  } catch (err) {
    console.error(err);
    error.value = 'Не удалось загрузить посты';
  } finally {
    isLoading.value = false;
  }
};

const formattedPosts = computed(() => {
  if (!rawData.value || !Array.isArray(rawData.value)) return [];

  return rawData.value.flatMap(blog =>
    blog.post.map(post => ({
      ...post,
      fullName: blog.fullName,
      blogName: blog.blogName,
      blogId: blog.id
    }))
  ).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
});

onMounted(() => {
  loadPosts()
});

</script>

<style scoped></style>