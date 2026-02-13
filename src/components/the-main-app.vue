<template>
  <h1>Cangjie3 input method editor (IME)</h1>
  <p>(Try this: <code>oiar grmbc yhgr jnd .</code>)</p>
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
h1 {
  font-family: sans-serif;
  font-size: 24pt;
}
code {
  font-family: monospace;
  color: rgb(156, 0, 70);
}
</style>

<script setup lang="ts">
import {is_punctuation_code} from "../models";

import Hints from "./hints.vue";
import Matrix from "./matrix.vue";
import TheConsole from "./the-console.vue";
import TheTextarea from "./the-textarea.vue";
</script>
