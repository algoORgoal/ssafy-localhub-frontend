<script setup lang="ts">
import type { Place } from '../types/api'

defineProps<{
  place: Place
}>()
</script>

<template>
  <article class="place-card">
    <img :src="place.image" :alt="place.title" style="height: 180px; width: 100%; object-fit: cover; border-radius: 18px" />
    <span class="badge">{{ place.category }}</span>
    <h3 class="place-title">{{ place.title }}</h3>
    <p class="muted">{{ place.address }}</p>
    <p>{{ place.description }}</p>
  </article>
</template>