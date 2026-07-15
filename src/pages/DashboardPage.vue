<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDashboardSummary, getRecentPosts, type Post } from '../services/localhubApi'

const stats = ref({ totalPosts: 0, totalPlaces: 0, totalFestivals: 0, topCategories: [] as Array<{ name: string; count: number }> })
const recentPosts = ref<Post[]>([])

onMounted(async () => {
  stats.value = await getDashboardSummary()
  recentPosts.value = await getRecentPosts()
})
</script>

<template>
  <main class="page">
    <section class="hero-card">
      <span class="eyebrow">LocalHub 메인 대시보드</span>
      <h1 style="margin-top: 16px">핵심 지표와 콘텐츠를 한눈에</h1>
      <p class="lead">발표 데모에서 보여주기 좋은 정보 밀도 높은 허브 화면입니다.</p>
    </section>

    <section class="stats-grid">
      <div class="stat-card"><div class="muted">게시글</div><div class="stat-value">{{ stats.totalPosts }}</div></div>
      <div class="stat-card"><div class="muted">장소</div><div class="stat-value">{{ stats.totalPlaces }}</div></div>
      <div class="stat-card"><div class="muted">축제</div><div class="stat-value">{{ stats.totalFestivals }}</div></div>
      <div class="stat-card"><div class="muted">상태</div><div class="status-pill">MVP Ready</div></div>
    </section>

    <section class="surface">
      <h2>카테고리 분포</h2>
      <div class="grid-4" style="margin-top: 16px">
        <article v-for="item in stats.topCategories" :key="item.name" class="stat-card">
          <div class="muted">{{ item.name }}</div>
          <div class="stat-value">{{ item.count }}</div>
        </article>
      </div>
    </section>

    <section class="surface">
      <h2>최근 게시글</h2>
      <div class="grid-2" style="margin-top: 16px">
        <RouterLink v-for="post in recentPosts" :key="post.id" :to="`/posts/${post.id}`" class="post-card">
          <span class="card-tag">{{ post.category }}</span>
          <strong>{{ post.title }}</strong>
          <p class="muted">{{ post.author }} · 조회 {{ post.viewCount }}</p>
        </RouterLink>
      </div>
    </section>
  </main>
</template>