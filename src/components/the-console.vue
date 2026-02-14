<template>
  <label
    >Console:
    <input
      maxlength="7"
      v-model="query_input"
      id="console"
      @keydown="onKeyPress"
      @keyup.esc.prevent="onEscape"
  /></label>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

import {candidates, query, query_input, texts} from "../models";

onMounted(() => { document.getElementById("console")?.focus(); });

function onKeyPress(event: KeyboardEvent) {
  if (query.value.length > 0) {
    return;
  }

  const key_name = event.key;
  switch (event.key) {
  case "Enter":
    // line break
    texts.value += "\n";
    return;

  case "Backspace":
    // delete words
    texts.value = texts.value.slice(0, Math.max(0, texts.value.length - 1));
    return;
  }
}

function onEscape(event: KeyboardEvent) {
  query_input.value = "";
  candidates.value = [];
}
</script>
