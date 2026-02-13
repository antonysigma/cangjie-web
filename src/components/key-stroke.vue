<template>
  <span
    :class="{
      'key-stroke': is_valid,
      'invalid-key-stroke': !is_valid,
    }"
    >{{ keystroke }}</span
  >
</template>

<style>
.key-stroke {
  background-color: white;
  color: gray;
}

.invalid-key-stroke {
  background-color: red;
  color: white;
}
</style>
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
