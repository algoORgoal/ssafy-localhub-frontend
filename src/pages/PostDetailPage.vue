<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PasswordModal from '../components/PasswordModal.vue'
import { deletePost, getPostById, incrementPostViews, togglePostLike, type Post } from '../services/localhubApi'

const route = useRoute()
const router = useRouter()
const post = ref<Post | null>(null)
const deleteDialog = ref(false)
const loading = ref(true)

const id = computed(() => Number(route.params.id))

const load = async () => {
  loading.value = true
  await incrementPostViews(id.value)
  post.value = await getPostById(id.value)
  loading.value = false
}

const handleLike = async () => {
  post.value = await togglePostLike(id.value)
}

const handleDelete = async (password: string) => {
  try {
    await deletePost(id.value, password)
    await router.push('/posts')
  } catch (error) {
    alert(error instanceof Error ? error.message : '삭제에 실패했습니다.')
  }
}

onMounted(load)
</script>

<template>
  <main class="page" v-if="!loading && post">
    <section class="detail-layout">
      <article class="detail-panel">
        <div class="badge">{{ post.category }}</div>
        <h1 class="detail-title" style="margin-top: 12px">{{ post.title }}</h1>
        <p class="meta" style="margin-top: 10px">{{ post.author }} · {{ new Date(post.createdAt).toLocaleString('ko-KR') }}</p>

        <div class="toolbar" style="margin-top: 18px">
          <span class="badge">조회 {{ post.viewCount }}</span>
          <span class="badge">좋아요 {{ post.likeCount }}</span>
          <span class="badge">{{ post.region }}</span>
        </div>

        <div class="article" style="margin-top: 22px">
          <p>{{ post.content }}</p>
        </div>

        <div class="card-actions" style="margin-top: 24px">
          <button type="button" class="button-secondary" @click="handleLike">좋아요 토글</button>
          <RouterLink class="button" :to="`/posts/${post.id}/edit`">수정</RouterLink>
          <button type="button" class="button-danger" @click="deleteDialog = true">삭제</button>
          <RouterLink class="button-ghost" to="/posts">목록으로</RouterLink>
        </div>
      </article>

      <aside class="side-panel">
        <h3>상세 메타</h3>
        <div class="detail-layout" style="grid-template-columns: 1fr; gap: 12px; margin-top: 16px">
          <div class="stat-card">
            <div class="muted">태그</div>
            <p style="margin-top: 8px">{{ post.tags.join(', ') || '태그 없음' }}</p>
          </div>
          <div class="stat-card">
            <div class="muted">권장 플로우</div>
            <p style="margin-top: 8px">비밀번호 확인 후 수정하거나 삭제할 수 있습니다.</p>
          </div>
        </div>
      </aside>
    </section>

    <PasswordModal
      v-model="deleteDialog"
      title="게시글 삭제"
      description="삭제를 계속하려면 게시글 비밀번호를 입력하세요."
      confirm-label="삭제"
      @confirm="handleDelete"
    />
  </main>

  <section v-else class="empty-state">게시글을 불러오는 중입니다.</section>
</template>