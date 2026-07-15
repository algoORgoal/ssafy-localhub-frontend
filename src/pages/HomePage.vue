<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCategories, getDashboardSummary, getFestivals, getRecentPosts } from '../services/localhubApi'
import type { Festival, Place, Post } from '../types/api'

const recentPosts = ref<Post[]>([])
const places = ref<Place[]>([])
const festivals = ref<Festival[]>([])
const stats = ref({ totalPosts: 0, totalPlaces: 0, totalFestivals: 0 })

onMounted(async () => {
  const [{ posts }, placeList, festivalList, summary] = await Promise.all([
    getRecentPosts(),
    getCategories({ filter: '전체', pageSize: 4 }),
    getFestivals(),
    getDashboardSummary(),
  ])

  recentPosts.value = posts
  places.value = placeList.items
  festivals.value = festivalList.slice(0, 3)
  stats.value = summary
})
</script>

<template>
  <main class="page">
    <section class="hero-card">
      <div class="hero-grid">
        <div>
          <span class="eyebrow">LocalHub MVP · Vue 3 + Mock API</span>
          <h1 style="margin-top: 18px">지역 정보와 커뮤니티를 한 번에 보는 홈</h1>
          <p class="lead">제공 JSON과 게시글 데이터를 결합해 홈, 게시판, 큐레이션, 챗봇으로 자연스럽게 이어지는 첫 화면을 만들었습니다.</p>
          <div class="hero-actions" style="margin-top: 22px">
            <RouterLink class="button" to="/posts">게시글 보기</RouterLink>
            <RouterLink class="button-secondary" to="/chat">챗봇 열기</RouterLink>
            <RouterLink class="button-ghost" to="/curation">큐레이션 탐색</RouterLink>
          </div>
        </div>

        <div class="mini-panel">
          <div class="stats-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr))">
            <div class="stat-card"><div class="muted">게시글</div><div class="stat-value">{{ stats.totalPosts }}</div></div>
            <div class="stat-card"><div class="muted">장소</div><div class="stat-value">{{ stats.totalPlaces }}</div></div>
            <div class="stat-card"><div class="muted">축제</div><div class="stat-value">{{ stats.totalFestivals }}</div></div>
            <div class="stat-card"><div class="muted">상태</div><div class="status-pill">Mock Ready</div></div>
          </div>
          <div>
            <div class="muted">빠른 진입</div>
            <p style="margin-top: 8px; line-height: 1.6">게시글 상세, 작성, 큐레이션, 축제 캘린더, 지도 화면으로 바로 이동할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="surface">
      <div class="section-head">
        <div>
          <h2>최근 게시글</h2>
          <p class="section-desc">홈에서 가장 먼저 보여줄 최근 글입니다.</p>
        </div>
        <RouterLink class="button-ghost" to="/posts">전체보기</RouterLink>
      </div>

      <div class="grid-2" style="margin-top: 16px">
        <RouterLink v-for="post in recentPosts" :key="post.id" :to="`/posts/${post.id}`" class="post-card">
          <span class="card-tag">{{ post.category }}</span>
          <strong class="post-title">{{ post.title }}</strong>
          <p class="muted">{{ post.content }}</p>
          <div class="meta">{{ post.author }} · 조회 {{ post.viewCount }} · 좋아요 {{ post.likeCount }}</div>
        </RouterLink>
      </div>
    </section>

    <section class="surface">
      <div class="section-head">
        <div>
          <h2>큐레이션</h2>
          <p class="section-desc">장소 카드와 카테고리별 탐색을 연결합니다.</p>
        </div>
        <RouterLink class="button-ghost" to="/curation/all">전체 보기</RouterLink>
      </div>

      <div class="grid-4" style="margin-top: 16px">
        <article v-for="place in places" :key="place.id" class="place-card">
          <img :src="place.image" :alt="place.title" style="height: 150px; width: 100%; object-fit: cover; border-radius: 18px" />
          <span class="badge">{{ place.category }}</span>
          <strong class="place-title">{{ place.title }}</strong>
          <p class="muted">{{ place.address }}</p>
        </article>
      </div>
    </section>

    <section class="surface">
      <div class="section-head">
        <div>
          <h2>다가오는 축제</h2>
          <p class="section-desc">챗봇과 캘린더에 함께 쓰는 축제 데이터입니다.</p>
        </div>
        <RouterLink class="button-ghost" to="/festivals">캘린더 보기</RouterLink>
      </div>

      <div class="grid-3" style="margin-top: 16px">
        <article v-for="festival in festivals" :key="festival.id" class="stat-card">
          <div class="badge">{{ festival.region }}</div>
          <strong style="display: block; margin-top: 10px">{{ festival.title }}</strong>
          <p class="muted" style="margin-top: 8px">{{ festival.date }} · {{ festival.location }}</p>
          <p style="margin-top: 10px; line-height: 1.6">{{ festival.summary }}</p>
        </article>
      </div>
    </section>
  </main>
</template>