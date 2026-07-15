<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostCard from '../components/PostCard.vue'
import { getPostCategories, getPosts, type Post } from '../services/localhubApi'

const posts = ref<Post[]>([])
const categories = getPostCategories()
const query = ref('')
const category = ref('전체')
const page = ref(1)
const totalPages = ref(1)

const load = async () => {
  const response = await getPosts({
    category: category.value,
    query: query.value,
    page: page.value,
    pageSize: 6,
  })

  posts.value = response.items
  totalPages.value = response.pages.totalPages
}

const submitSearch = async () => {
  page.value = 1
  await load()
}

const movePage = async (nextPage: number) => {
  page.value = nextPage
  await load()
}

onMounted(load)
</script>

<template>
  <main class="page">
    <section class="surface">
      <div class="section-head">
        <div>
          <h2>게시글 목록</h2>
          <p class="section-desc">검색, 카테고리 필터, 페이지 이동, 작성 진입이 가능한 목록 화면입니다.</p>
        </div>
        <RouterLink class="button" to="/posts/new">글쓰기</RouterLink>
      </div>

      <form class="toolbar" style="margin-top: 18px" @submit.prevent="submitSearch">
        <label class="sr-only" for="post-search">검색어</label>
        <input id="post-search" v-model="query" type="search" placeholder="제목, 본문, 작성자 검색" />
        <label class="sr-only" for="post-category">카테고리</label>
        <select id="post-category" v-model="category">
          <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
        </select>
        <button type="submit" class="button-secondary">검색</button>
      </form>
    </section>

    <section class="grid-2">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </section>

    <section v-if="posts.length === 0" class="empty-state">검색 결과가 없습니다. 다른 조건으로 다시 찾아보세요.</section>

    <section class="surface">
      <div class="panel-actions" style="justify-content: space-between; align-items: center">
        <span class="muted">{{ page }} / {{ totalPages }}</span>
        <div class="panel-actions">
          <button class="button-ghost" type="button" :disabled="page <= 1" @click="movePage(Math.max(1, page - 1))">이전</button>
          <button class="button-ghost" type="button" :disabled="page >= totalPages" @click="movePage(Math.min(totalPages, page + 1))">다음</button>
        </div>
      </div>
    </section>
  </main>
</template>