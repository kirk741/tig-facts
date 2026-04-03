<template>
  <SingleLayout>
    <template #form>
      <AppCard>
        <template #card-content>
          <h3>{{ blogInfo.blogName }}</h3>
          <p>Владелец: {{ blogInfo.fullName }}</p>
        </template>

        <template #card-action>
          <Teleport to="body">
            <AppButton v-if="!isFormVisible" @click="isFormVisible = true" class="fixed-action-button">
              Добавить пост
            </AppButton>
          </Teleport>
          <AppModal v-if="isFormVisible" @close="isFormVisible = false">
            <PostForm @reloadData="loadPosts" @close="isFormVisible = false" @cancel="isFormVisible = false"
              :initial-data="editingPost" />
          </AppModal>
        </template>
      </AppCard>
    </template>

    <template #cards>
      <template v-if="isLoading">
        <AppSkeleton v-for="i in 6" :key="'skeleton-' + i" />
      </template>

      <template v-else-if="!currentFormattedPosts.length">
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
        <AppCard :variant="'hover'" @click="router.push(`/post/${post.id}`)" v-for="post in currentFormattedPosts"
          :key="post.id">
          <template #card-header>
            <AppButtonGroup>
              <AppButton :variant="'unbordered'" @click.stop="() => handleDelete(post.id)">
                <IconDelete />
              </AppButton>
              <AppButton :variant="'unbordered'">
                <IconShow />
              </AppButton>
              <AppButtonTextBox @click.stop="router.push({ path: `/post/${post.id}` })">
                {{ post.comments.length === 0 ? '' : formatCount(post.comments.length) }}
                <AppButton :variant="'unbordered'">
                  <IconComment />
                </AppButton>
              </AppButtonTextBox>
              <AppButton :variant="'unbordered'" @click.stop="handleEdit(post)">
                <IconEdit />
              </AppButton>
            </AppButtonGroup>
          </template>

          <template #card-content>
            <h3>{{ post.title }}</h3>
            <p>{{ post.briefDescription }}</p>
          </template>

          <template #card-footer>
            <AppInfoGroup>
              <span v-if="post.dateTime">{{ formatDate(post.dateTime) }}</span>
            </AppInfoGroup>
          </template>
        </AppCard>
      </template>
    </template>
  </SingleLayout>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import PostForm from '@/components/forms/PostForm.vue';
import router from '@/router';
import { formatCount } from '@/utils/formatCount';
import { formatDate } from '@/utils/formatDate';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const isLoading = ref(false);
const rawData = ref([]);
const isFormVisible = ref(false);
const editingPost = ref(null);

const route = useRoute();

const loadPosts = async () => {
  isLoading.value = true;
  try {
    const response = await apiFetch('/userInfo/findAll');
    rawData.value = response;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  } finally {
    isLoading.value = false;
  }
}

const currentFormattedPosts = computed(() => {
  const id = route.params.id;
  const blog = rawData.value.find(b => b.id == id);
  return blog ? blog.post : [];
});

const blogInfo = computed(() => {
  const id = route.params.id;
  const blog = rawData.value.find(b => b.id == id);
  if (!blog) return {};
  return {
    blogName: blog.blogName,
    fullName: blog.fullName
  }
});

const handleDelete = async (id) => {
  await apiFetch(`/post/${id}`, { method: 'DELETE' });
  await loadPosts();
}

const handleEdit = (post) => {
  editingPost.value = post;
  isFormVisible.value = true;
}

onMounted(loadPosts);
</script>

<style scoped>
.fixed-action-button {
  position: fixed;
  bottom: 20px;
  left: var(--gap-xl);
  width: 100%;
  max-width: 320px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  border-radius: 50px;
}

@media(max-width: 660px) {
  .fixed-action-button {
    max-width: calc(100% - 48px);
  }
}
</style>