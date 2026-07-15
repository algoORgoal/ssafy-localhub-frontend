<script setup lang="ts">
import AppShell from './components/AppShell.vue'
import ChatWidget from './components/ChatWidget.vue'
</script>

<template>
  <AppShell>
    <RouterView />
  </AppShell>
  <ChatWidget />
</template>
