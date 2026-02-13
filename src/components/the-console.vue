<template>
  <label
    >Console:
    <input maxlength="7" v-model="query" id="console" v-on:keydown="onKeyPress"
  /></label>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

import {query, texts} from "../models";
import {punctuations} from "../punctuations";

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
  case "Escape":
    // clear console
    query.value = "";
    event.preventDefault();
    return;

  case "Backspace":
    // delete words
    texts.value = texts.value.slice(0, Math.max(0, texts.value.length - 1));
    return;

  default:
    if (key_name in punctuations) {
      texts.value += punctuations[key_name];
      event.preventDefault();
      return;
    }
  }
}
</script>
