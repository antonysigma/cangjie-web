<template>
  <ol v-for="c of candidates">
    <li :key="c">{{ c }}</li>
  </ol>
</template>

<style>
ol {
  display: inline-block;
  padding-left: 0.5em;
  margin: 0;
  list-style-type: decimal;
}
ol li {
  margin: 0 10px;
}
</style>

<script setup lang="ts">
import {candidates} from "../models";
</script>
