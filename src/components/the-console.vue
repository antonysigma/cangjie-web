<template>
  <label
    >Console:
    <input maxlength="6" v-model="query" id="console" v-on:keydown="onKeyPress"
  /></label>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

import {query, texts} from "../models";

onMounted(() => { document.getElementById("console")?.focus(); });

function onKeyPress(event: KeyboardEvent) {
  if (query.value.length > 0) {
    return;
  }

  const key_name = event.key;
  if (key_name === "Enter") {
    // line break
    texts.value += "\n";
    return;
  }

  if (key_name === "Backspace") {
    // delete words
    texts.value = texts.value.slice(0, Math.max(0, texts.value.length - 1));
    return;
  }
}
</script>
