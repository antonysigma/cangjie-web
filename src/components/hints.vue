<template>
  <div class="key-stroke-hints">
    <table>
      <tr v-for="h of hint">
        <td>
          <KeyStroke />{{
            h
              .split("")
              .map((item) => {
                return decodeKeyStroke(item);
              })
              .join("")
          }}
        </td>
        <td v-for="unicode of utf8data[`_${query}${h}`]">
          {{ String.fromCodePoint(unicode) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
.key-stroke-hints {
  display: block;
  font-family: monospace;
  height: max(20em, 30vh);
  overflow-y: scroll;
}
</style>

<script setup lang="ts">
import {computed} from "vue";

import {decodeKeyStroke} from "../decode";
import {query} from "../models";
import {trie} from "../trie";
import {utf8data} from "../utf8data";

import KeyStroke from "./key-stroke.vue";

const hint = computed<string[]>(() => {
  const new_query = query.value;
  if (new_query.length === 0) {
    return [];
  }
  return trie.getPrefix(query.value, true)
      .slice(0, new_query.search(/^(zx|x)/) !== -1 ? -1 : 20)
      .map((h) => h.slice(new_query.length));
});
</script>
