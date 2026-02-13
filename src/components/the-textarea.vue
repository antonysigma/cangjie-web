<template>
  <h4>Text area:</h4>
  <div class="textpad">
    <span>{{ texts }}</span
    ><KeyStroke /><Candidates />
  </div>
</template>

<style>
.textpad {
  width: 100%;
  height: max(70vh, 5em);
  line-height: 1.5em;
}
</style>
<script setup lang="ts">
import {texts} from "../models";

import Candidates from "./candidates.vue";
import KeyStroke from "./key-stroke.vue";
</script>
