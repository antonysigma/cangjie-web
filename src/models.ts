import {computed, ref} from 'vue';

const query = ref<string>('');
const candidates = ref<string[]>([]);
const texts = ref<string>('');
const is_valid = ref<boolean>(true);

const is_punctuation_code =
    computed<boolean>(() => { return query.value.search(/^z?x.*$/) !== -1; });

export {query, texts, is_valid, candidates, is_punctuation_code};