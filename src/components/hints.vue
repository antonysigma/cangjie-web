<template>
  <div class="key-stroke-hints">
    <div
      @mouseleave="highlighted_ideograph = null"
      class="ideograph-toolbar"
      v-if="query.length > 0"
    >
      <a
        v-for="d of ideographs.split('')"
        :key="d"
        href="#"
        :class="{
          'selected-ideograph':
            d === highlighted_ideograph || d === selected_ideograph,
        }"
        @mouseover="highlighted_ideograph = d"
        @click.prevent="selected_ideograph = d"
        >{{ d }}</a
      >
      <a @click.prevent="selected_ideograph = null" href="#">X</a>
    </div>
    <table>
      <tr v-for="[suffix, characters] of Object.entries(filtered_by_ideograph)">
        <td>
          <KeyStroke />{{
            suffix
              .split("")
              .map((item) => {
                return decodeKeyStroke(item);
              })
              .join("")
          }}
        </td>
        <td
          v-for="ch of characters"
          :class="{
            'selected-ideograph': ideograph[ch] === highlighted_ideograph,
          }"
        >
          {{ ch }}
          {{ selected_ideograph === null ? "" : selected_ideograph }}
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

.selected-ideograph {
  font-weight: bold;
  background: lightyellow;
}

.ideograph-toolbar {
  font-size: 150%;
}
</style>

<script setup lang="ts">
import {computed, ref, watch} from "vue";

import {decodeKeyStroke} from "../decode";
import ideograph from "../ids-cdp.json";
import {query} from "../models";
import {trie} from "../trie";
import {utf8data} from "../utf8data";

import KeyStroke from "./key-stroke.vue";

const ideographs = "⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻";
const highlighted_ideograph = ref<string|null>(null);
const selected_ideograph = ref<string|null>(null);

const matched = computed<string[]>(() => {
  const new_query = query.value;
  if (new_query.length === 0) {
    return [];
  }
  return trie.getPrefix(new_query, true);
});

const filtered_by_ideograph = computed<Record<string, string[]>>(() => {
  const ids = selected_ideograph.value;
  const new_query = query.value;
  const new_matched = matched.value;

  let filtered_hint: Record<string, string[]> = {};
  if (ids === null) {
    for (let idx = 0; idx < Math.min(20, new_matched.length); idx++) {
      const suffix = new_matched[idx].slice(new_query.length);
      filtered_hint[suffix] = utf8data[`_${new_query}${suffix}`].map(
          (unicode: number) => String.fromCodePoint(unicode),
      );
    }
    return filtered_hint;
  }

  for (const m of new_matched) {
    const filtered =
        utf8data[`_${m}`]
            .map((unicode: number) => String.fromCodePoint(unicode))
            .filter((ch: string) => ideograph[ch] === ids);
    if (filtered.length !== 0) {
      const suffix = m.slice(new_query.length);
      filtered_hint[suffix] = filtered;
    }
  }
  return filtered_hint;
});

watch(query, (new_query) => {
  // Reset the ideograph when user clears query.
  if (new_query.length === 0) {
    selected_ideograph.value = null;
  }
});
</script>
