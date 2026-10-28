<script setup lang="ts">
// Fetched on the server during rendering, then reused in the browser.
const { data } = await useFetch('/api/hello', { query: { name: 'Grro' } })
const count = ref(0)
</script>

<template>
  <h1>Nuxt is running on Grro</h1>
  <p>
    The server answered: <code>{{ data?.message }}</code>. Edit <code>app/pages/index.vue</code> to change
    this page, or <code>server/api/hello.get.ts</code> for the API.
  </p>
  <button type="button" @click="count++">Clicked {{ count }} {{ count === 1 ? 'time' : 'times' }}</button>
</template>
