<template>
  <ol>
    <li :key="c" v-for="c of candidates">{{ c }}</li>
  </ol>
</template>

<style>
ol {
  display: inline-block;
  padding-left: 0.5em;
  margin: 0;
  list-style-type: decimal;
}
</style>

<script setup lang="ts">
import {candidates} from "../models";
</script>
