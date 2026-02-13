<template>
  <div class="key-stroke-hints">
    <table class="matrix">
      <thead>
        <tr>
          <td></td>
          <td v-for="rk of remaining_keystrokes" :key="rk" :id="`thead-${rk}`">
            {{
              rk
                .split("")
                .map((c) => decodeKeyStroke(c))
                .join("")
            }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fk of first_keystroke" :key="fk">
          <td><KeyStroke />{{ decodeKeyStroke(fk) }}</td>
          <td v-for="rk of remaining_keystrokes" :key="rk">
            {{
              `_${query}${fk}${rk}` in utf8data
                ? String.fromCodePoint(utf8data[`_${query}${fk}${rk}`])
                : " "
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table.matrix thead {
  background-color: #eee;
}
table.matrix tbody td:nth-child(1) {
  background-color: #eee;
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

const first_keystroke = computed<string[]>(() => {
  const fk = hint.value.map((h) => h.slice(0, 1));
  return [...new Set(fk) ].sort();
});

const remaining_keystrokes = computed<string[]>(() => {
  const rk = hint.value.map((h) => h.slice(1));
  return [...new Set(rk) ].sort();
});
</script>
