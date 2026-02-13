<template>
  <div class="key-stroke-hints">
    <table class="matrix">
      <thead>
        <tr>
          <td></td>
          <td v-for="rk of remaining_keystrokes" :key="rk">
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
        <tr
          v-for="fk of first_keystroke"
          :key="fk"
          :class="{ 'highlight-row': suffix[0] === fk }"
        >
          <td>
            <span class="key-stroke">{{
              prefix
                .split("")
                .map((c) => decodeKeyStroke(c))
                .join("")
            }}</span
            >{{ decodeKeyStroke(fk) }}
          </td>
          <td
            v-for="rk of remaining_keystrokes"
            :key="rk"
            :class="{
              'highlight-row': suffix.length > 1 && suffix.slice(1) === rk,
            }"
          >
            {{
              `_${prefix}${fk}${rk}` in utf8data
                ? String.fromCodePoint(utf8data[`_${prefix}${fk}${rk}`])
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
.highlight-row {
  background-color: #f005;
}
</style>
<script setup lang="ts">
import {computed} from "vue";

import {decodeKeyStroke} from "../decode";
import {query} from "../models";
import {trie} from "../trie";
import {utf8data} from "../utf8data";

const prefix = computed<string>(() => {
  const m = query.value.match(/^z?x/i);
  return m ? m[0] : "";
});

const suffix =
    computed<string>(() => { return query.value.replace(/^z?x/i, ""); });

const hint = computed<string[]>(() => {
  if (prefix.value.length === 0) {
    return [];
  }
  return trie.getPrefix(prefix.value, true)
      .map((h) => h.slice(prefix.value.length));
});

const first_keystroke = computed<string[]>(() => {
  const fk = hint.value.map((h) => h[0]);
  return [...new Set(fk) ].sort();
});

const remaining_keystrokes = computed<string[]>(() => {
  const rk = hint.value.map((h) => h.slice(1));
  return [...new Set(rk) ].sort();
});
</script>
