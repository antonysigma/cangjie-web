<template>
  <TheTextarea />
  <Hints v-if="!is_punctuation_code" />
  <Matrix v-if="is_punctuation_code" />
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
import {is_punctuation_code} from "../models";

import Hints from "./hints.vue";
import Matrix from "./matrix.vue";
import TheConsole from "./the-console.vue";
import TheTextarea from "./the-textarea.vue";
</script>
