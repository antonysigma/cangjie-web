<template>
  <h1>Cangjie3 input method editor (IME)</h1>
  <h2>(Try this: <code>oiar grmbc yhgr jnd .</code>)</h2>
  <TheTextarea />
  <Hints v-if="!is_punctuation_code" />
  <Matrix v-if="is_punctuation_code" />
  <hr />
  <TheConsole />
</template>

<style>
@media only screen and (max-width: 768px) {
  body {
    width: max(100%, 11em);
  }
}
@media only screen and (min-width: 769px) {
  body {
    width: max(70%, 11em);
    margin: 1em auto;
  }
}
h1 {
  font-family: sans-serif;
  font-size: 18pt;
}
h2 {
  font-family: sans-serif;
  font-size: 10pt;
  color: #333;
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
