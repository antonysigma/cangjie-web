<template>
  <label>Console: <input maxlength="6" v-model="query" id="console" /></label>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

import {query} from "../models";

onMounted(() => { document.getElementById("console")?.focus(); });
</script>
