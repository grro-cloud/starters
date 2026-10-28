<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <main>
    <h1>Vue is running on Grro</h1>
    <p>
      A static Vue app built with Vite and served by nginx. Edit <code>src/App.vue</code> to change this
      page.
    </p>
    <button type="button" @click="count++">Clicked {{ count }} {{ count === 1 ? "time" : "times" }}</button>
  </main>
</template>
