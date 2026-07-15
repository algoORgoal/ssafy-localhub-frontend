<script setup lang="ts">
import type { Post } from '../services/localhubApi'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="post-card">
    <span class="card-tag">{{ post.category }}</span>
    <RouterLink :to="`/posts/${post.id}`" class="post-title">{{ post.title }}</RouterLink>
    <p class="muted">{{ post.content }}</p>
    <div class="meta">{{ post.author }} · {{ new Date(post.createdAt).toLocaleDateString('ko-KR') }} · 조회 {{ post.viewCount }} · 좋아요 {{ post.likeCount }}</div>
  </article>
</template>