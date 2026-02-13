<template>
  <TheTextarea />
  <hr />
  <TheConsole />
</template>

<style>
body {
  width: max(70%, 11em);
  margin: 1em auto;
}
</style>

<script setup lang="ts">
import TheConsole from "./the-console.vue";
import TheTextarea from "./the-textarea.vue";
</script>
