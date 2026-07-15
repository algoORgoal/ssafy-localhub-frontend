<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFestivals, type Festival } from '../services/localhubApi'

const festivals = ref<Festival[]>([])

onMounted(async () => {
  festivals.value = await getFestivals()
})
</script>

<template>
  <main class="page">
    <section class="calendar-card">
      <div class="section-head">
        <div>
          <h2>축제 캘린더 및 통계 대시보드</h2>
          <p class="section-desc">FullCalendar 대신 가벼운 카드형 월간 축제 보기를 먼저 구현합니다.</p>
        </div>
        <span class="status-pill">Calendar View</span>
      </div>

      <div class="grid-2" style="margin-top: 18px">
        <article v-for="festival in festivals" :key="festival.id" class="calendar-day">
          <div class="badge">{{ festival.date }}</div>
          <strong style="display: block; margin-top: 10px">{{ festival.title }}</strong>
          <p class="muted" style="margin-top: 8px">{{ festival.region }} · {{ festival.location }}</p>
          <p style="margin-top: 10px">{{ festival.summary }}</p>
        </article>
      </div>
    </section>
  </main>
</template>