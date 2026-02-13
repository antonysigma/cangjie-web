<template>
  <span
    :style="{
      'background-color': is_valid ? 'white' : 'red',
      color: is_valid ? 'gray' : 'white',
    }"
    >{{ keystroke }}</span
  >
</template>

<script setup lang="ts">
import {computed} from "vue";

import {is_valid, query} from "../models";
import {keysdata} from "../utf8data";

const keystroke = computed<string>(() => {
  const new_query = query.value;
  if (new_query.length == 0) {
    return "";
  }

  let interpreted = "";
  for (const letter of new_query) {
    if (letter == " ") {
      continue;
    } else if (letter.match(/[a-z]/)) {
      interpreted += String.fromCodePoint(keysdata[letter]);
    } else {
      interpreted += "?";
    }
  }
  return interpreted;
});
</script>
