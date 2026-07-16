<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import PostCard from "../components/PostCard.vue";
import { getCategories, getRecentPosts } from "../services/localhubApi";
import type { Place, PostListItem } from "../types/api";

const recentPosts = ref<PostListItem[]>([]);
const places = ref<Place[]>([]);

// Fallback 이미지
const fallbackImage = new URL("../assets/fallback.png", import.meta.url).href;

// 각 장소마다 이미지 결정
const placeWithImage = computed(() => {
  return places.value.slice(0, 8).map((place) => ({
    ...place,
    displayImage: place.image && place.image.trim() 
      ? place.image 
      : fallbackImage,
  }));
});

onMounted(async () => {
  // 첫 페이지로 총 페이지 수 확인
  const firstPageResponse = await getCategories({ filter: "전체", page: 1 });
  const totalPages = firstPageResponse.pages.total_pages || 1;
  
  // 랜덤 페이지 생성 (1부터 totalPages까지)
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  
  const [posts, placeList] = await Promise.all([
    getRecentPosts(8),
    getCategories({ filter: "전체", page: randomPage }),
  ]);

  recentPosts.value = posts;
  places.value = placeList.places;
});
</script>

<template>
  <main class="page">
    <section class="surface">
      <div class="section-head">
        <div>
          <h2>큐레이션</h2>
          <p class="section-desc">장소 카드와 카테고리별 탐색을 연결합니다.</p>
        </div>
        <RouterLink class="button-ghost" to="/curation/all">더보기</RouterLink>
      </div>

      <div class="grid-4" style="margin-top: 16px">
        <article v-for="place in placeWithImage" :key="place.id" class="place-card">
          <img
            :src="place.displayImage"
            :alt="place.title"
            style="
              height: 150px;
              width: 100%;
              object-fit: cover;
              border-radius: 18px;
            "
          />
          <span class="badge">{{ place.category_name }}</span>
          <strong class="place-title">{{ place.title }}</strong>
          <p class="muted">{{ place.address }}</p>
        </article>
      </div>
    </section>

    <section class="surface">
      <div class="section-head">
        <div>
          <h2>최근 게시글</h2>
          <p class="section-desc">
            서울에서 일어나는 최근 소식을 확인해보세요.
          </p>
        </div>
        <RouterLink class="button-ghost" to="/posts">더보기</RouterLink>
      </div>

      <div class="grid-2" style="margin-top: 16px">
        <PostCard v-for="post in recentPosts" :key="post.id" :post="post" />
      </div>

      <section
        v-if="recentPosts.length === 0"
        class="empty-state"
        style="margin-top: 16px"
      >
        최근 게시물이 없습니다.
      </section>
    </section>
  </main>
</template>
