<template>
  <SingleLayout>
    <template #form>
      <AppCard>
        <template #card-content>
          <h3>{{ post.title }}</h3>
          <p>{{ post.briefDescription }}</p>
          <p>{{ post.fullDescription }}</p>
        </template>
        <template #card-footer>
          <AppInfoGroup>
            <span v-if="post.dateTime">{{ formatDate(post.dateTime) }}</span>
            <RouterLink :to="`/blog/${post.userInfoId}`" @click.stop><span v-if="post.userInfoId">Открыть блог</span>
            </RouterLink>
          </AppInfoGroup>
        </template>
        <template #card-action>
          <Teleport to="body">
            <AppButton v-if="!isFormVisible" @click="isFormVisible = true" class="fixed-action-btn">
              Оставить комментарий
            </AppButton>
          </Teleport>
          <AppModal v-if="isFormVisible" @close="isFormVisible = false">
            <CommentForm @reloadData="loadData" @closeForm="isFormVisible = false" @cancel="isFormVisible = false" />
          </AppModal>
        </template>
      </AppCard>
    </template>

    <template #cards>
      <template v-if="isDataLoading">
        <AppSkeleton v-for="i in 4" :key="'skeleton-' + i" />
      </template>

      <template v-else-if="!comments.length">
        <AppCard>
          <template #card-content>
            <div>
              <h2>Комментариев пока нет</h2>
              <p>Будьте первым, кто поделится впечатлениями</p>
            </div>
          </template>
        </AppCard>
      </template>

      <template v-else>
        <AppCard v-for="comment in comments" :key="comment.id">
          <template #card-content>
            <p>{{ comment.textComment }}</p>
          </template>
          <template #card-footer>
            <AppInfoGroup>
              <span v-if="comment.userInfo">{{ comment.userInfo }}</span>
              <span v-if="comment.email">{{ comment.email }}</span>
              <span v-if="comment.dateTime">{{ comment.dateTime }}</span>
            </AppInfoGroup>
            <AppButtonGroup>
              <AppButton :variant="'unbordered'" @click="handleDelete(comment.id)">
                <IconDelete />
              </AppButton>
            </AppButtonGroup>
          </template>
        </AppCard>
      </template>
    </template>
  </SingleLayout>
</template>

<script setup>
import { apiFetch } from '@/api/apiFetch';
import CommentForm from '@/components/forms/CommentForm.vue';
import { formatDate } from '@/utils/formatDate';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const rawData = ref(null);
const isDataLoading = ref(true);
const isFormVisible = ref(false);

const comments = computed(() => {
  if (!rawData.value || !rawData.value.comments) return [];

  return [...rawData.value.comments]
    .sort((a, b) => {
      return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
    })
    .map((comment) => {
      return {
        ...comment,
        dateTime: formatDate(new Date(comment.dateTime))
      };
    });
});

const post = computed(() => {
  if (!rawData.value) return {};

  return {
    title: rawData.value.title,
    briefDescription: rawData.value.briefDescription,
    fullDescription: rawData.value.fullDescription,
    dateTime: rawData.value.dateTime,
    userInfoId: rawData.value.userInfoId
  };
});

const loadData = async () => {
  isDataLoading.value = true;
  try {
    const id = route.params.id;
    const response = await apiFetch(`/post/${id}`);
    rawData.value = response;
    console.log(response)
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  } finally {
    isDataLoading.value = false;
  }
}

const handleDelete = async (id) => {
  await apiFetch(`/comment/${id}`, { method: 'DELETE' });
  await loadData();
}

onMounted(loadData);
</script>

<style>
.card-action-container {
  width: 100%;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.sticky-btn {
  position: sticky;
  bottom: 20px;
  z-index: 10;
}

.fixed-action-btn {
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
  .fixed-action-btn {
    max-width: calc(100% - 48px);
  }
}
</style>