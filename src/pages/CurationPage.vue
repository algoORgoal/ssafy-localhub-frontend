<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlaceCard from '../components/PlaceCard.vue'
import { getCategories, getPostCategories } from '../services/localhubApi'
import type { Place } from '../types/api'

const props = defineProps<{ mode?: 'all' }>()

const route = useRoute()
const router = useRouter()

const places = ref<Place[]>([])
const filter = ref('전체')
const page = ref(1)
const totalPages = ref(1)
const categories = getPostCategories()

const parsePage = (value: unknown) => {
  const parsed = Number(Array.isArray(value) ? value[0] : value)
  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1
}

const syncFromRoute = () => {
  page.value = parsePage(route.query.page)
  filter.value =
    typeof route.query.filter === 'string' && route.query.filter
      ? route.query.filter
      : '전체'
}

const buildQuery = (next: { page?: number; filter?: string }) => {
  const nextQuery: Record<string, string> = {}
  const nextPage = next.page ?? page.value
  const nextFilter = next.filter ?? filter.value

  if (nextPage > 1) nextQuery.page = String(nextPage)
  if (nextFilter && nextFilter !== '전체') nextQuery.filter = nextFilter
  return nextQuery
}

const sameQuery = (nextQuery: Record<string, string>) => {
  const current = route.query
  const keys = new Set([...Object.keys(nextQuery), ...Object.keys(current)])
  for (const key of keys) {
    const currentValue = current[key]
    const nextValue = nextQuery[key]
    if ((Array.isArray(currentValue) ? currentValue[0] : currentValue) !== (nextValue ?? undefined)) {
      return false
    }
  }
  return true
}

const updateRouteQuery = (next: { page?: number; filter?: string }) => {
  const nextQuery = buildQuery(next)
  if (sameQuery(nextQuery)) return
  router.push({ query: nextQuery })
}

const load = async () => {
  syncFromRoute()

  const response = await getCategories({
    filter: filter.value,
    page: page.value,
  })

  places.value = response.places
  totalPages.value = Math.max(1, response.pages.total_pages || 1)

  if (page.value > totalPages.value) {
    const nextQuery = buildQuery({ page: totalPages.value })
    if (!sameQuery(nextQuery)) {
      router.replace({ query: nextQuery })
    }
  }
}

const setFilter = (nextFilter: string) => {
  updateRouteQuery({ page: 1, filter: nextFilter })
}

const goToPage = (nextPage: number) => {
  updateRouteQuery({ page: nextPage })
}

watch(
  () => route.query,
  async () => {
    await load()
  },
  { immediate: true, deep: true },
)

const title = computed(() =>
  props.mode === 'all' ? '큐레이션 - 전체보기' : '큐레이션 - 카테고리 골라보기',
)

const goToMap = (place: Place) => {
  const nextQuery: Record<string, string> = {
    placeId: String(place.id),
  }

  if (place.category_name && place.category_name !== '전체') {
    nextQuery.filter = place.category_name
  }

  router.push({ path: '/map', query: nextQuery })
}
</script>

<template>
  <main class="page">
    <section class="surface">
      <div class="section-head">
        <div>
          <h2>{{ title }}</h2>
          <p class="section-desc">장소 카드와 카테고리 필터로 지역 데이터를 탐색합니다.</p>
        </div>
        <RouterLink class="button" to="/map">지도 보기</RouterLink>
      </div>

      <div class="filter-row" style="margin-top: 18px">
        <button
          v-for="item in categories"
          :key="item"
          type="button"
          class="button-ghost"
          :class="{ 'category-chip-active': filter === item }"
          @click="setFilter(item)"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="grid-2">
      <div v-for="place in places" :key="place.id" @click="goToMap(place)" style="cursor: pointer">
        <PlaceCard :place="place" />
      </div>
    </section>

    <section class="surface">
      <div class="pagination-container">
        <!-- 이전 버튼 -->
        <button class="pagination-arrow" :disabled="page <= 1" @click="goToPage(Math.max(1, page - 1))">
          이전
        </button>

        <!-- 페이지 번호 (구글 스타일: 현재 페이지 강조) -->
        <div class="pagination-numbers">
          <span class="active">{{ page }}</span>
          <span class="muted">/ {{ totalPages }}</span>
        </div>

        <!-- 다음 버튼 -->
        <button class="pagination-arrow" :disabled="page >= totalPages" @click="goToPage(Math.min(totalPages, page + 1))">
          다음
        </button>
      </div>
    </section>
  </main>
</template>
