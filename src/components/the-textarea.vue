<template>
  <div class="textpad">
    <pre>{{ texts }}<KeyStroke />_</pre>
    <Candidates />
  </div>
</template>

<style>
@media only screen and (max-width: 768px) {
  .textpad {
    width: 100%;
    line-height: 1.5em;
  }
}
@media only screen and (min-width: 769px) {
  .textpad {
    width: 100%;
    height: max(30vh, 5em);
    line-height: 1.5em;
  }
}
</style>

<script setup lang="ts">
import {texts} from "../models";

import Candidates from "./candidates.vue";
import KeyStroke from "./key-stroke.vue";
</script>
