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
      <AppCard :variant="'hover'" @click="router.push(`/post/${post.id}`)" v-for="post in visiblePosts" :key="post.id">
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
            <AppButton :variant="'unbordered'">
              <IconShow />
            </AppButton>
            <AppButtonTextBox @click.stop="router.push({ path: `/post/${post.id}` })">
              {{ post.comments.length === 0 ? '' : formatCount(post.comments.length) }}
              <AppButton :variant="'unbordered'">
                <IconComment />
              </AppButton>
            </AppButtonTextBox>
          </AppButtonGroup>
        </template>
      </AppCard>
    </template>
    <AppSkeleton v-if="isLoadingMore" v-for="i in 3" :key="'loading-more-' + i" />
  </MainLayout>

  <div ref="observerRef" class="observer"></div>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import router from '@/router';
import { formatCount } from '@/utils/formatCount';
import { formatDate } from '@/utils/formatDate';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const isLoading = ref(false);
const isLoadingMore = ref(false);
const error = ref('');
const rawData = ref([]);
const visibleCount = ref(6);
const observerRef = ref(null);
const observer = ref(null);

const loadPosts = async () => {
  isLoading.value = true;
  try {
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

const visiblePosts = computed(() => {
  return formattedPosts.value.slice(0, visibleCount.value);
});

const loadMorePosts = () => {
  if (visibleCount.value < formattedPosts.value.length) {
    isLoadingMore.value = true;
    setTimeout(() => {
      visibleCount.value += 6;
      isLoadingMore.value = false;
    }, 1000); // Имитирую загрузку с сервера
  }
}

onMounted(async () => {
  await loadPosts();

  const callback = (entries) => {
    if (entries[0].isIntersecting) {
      loadMorePosts();
    }
  }

  const options = {
    rootMargin: "100px",
    threshold: 1.0,
  }

  observer.value = new IntersectionObserver(callback, options);

  observer.value.observe(observerRef.value);
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>