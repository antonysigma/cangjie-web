<template>
  <h4>Text area:</h4>
  <div class="textpad">
    <pre>{{ texts }}<KeyStroke />_</pre>
    <Candidates />
  </div>
</template>

<style>
.textpad {
  width: 100%;
  height: max(40vh, 5em);
  line-height: 1.5em;
}
</style>
<script setup lang="ts">
import {texts} from "../models";

import Candidates from "./candidates.vue";
import KeyStroke from "./key-stroke.vue";
</script>
