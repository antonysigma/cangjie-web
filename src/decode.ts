import {watch} from 'vue';

import {candidates, is_valid, query, texts} from './models';
import {keysdata, utf8data} from "./utf8data";

function selectCandidate(choice: number) {
  if (choice <= candidates.value.length) {
    texts.value += candidates.value[choice - 1];
    candidates.value = []
    query.value = '';
  } else {
    is_valid.value = false;
  }
}

function decodeKeyStroke(key: string): string {
  if (key.length !== 1) {
    return '?';
  }
  return String.fromCodePoint(keysdata[key]);
}

watch(query, (new_query) => {
  if (new_query.length == 0) {
    return;
  }

  // If there are a few candidates, select one.
  const last_character = new_query[new_query.length - 1];
  if (candidates.value.length > 0) {
    const choice = parseInt(last_character);
    if (choice) {
      selectCandidate(choice);
    }
    return;
  }

  is_valid.value = true;
  if (last_character != ' ') {
    return;
  }

  const key = `_${new_query.slice(0, new_query.length - 1)}`;
  if (!(key in utf8data)) {
    is_valid.value = false;
    return;
  }

  const new_candidates = utf8data[key];
  if (new_candidates.length == 1) {
    texts.value += String.fromCodePoint(utf8data[key]);
    query.value = '';
    return;
  }

  candidates.value =
      utf8data[key].map(unicode => String.fromCodePoint(unicode));
});

export {decodeKeyStroke};