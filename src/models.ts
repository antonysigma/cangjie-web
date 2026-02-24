import {computed, ref} from 'vue';

const query_input = ref<string>('hqat');
const query = computed(() => { return query_input.value.toLowerCase(); });

const candidates = ref<string[]>([]);
const texts = ref<string>('');
const is_valid = ref<boolean>(true);

const is_punctuation_code =
    computed<boolean>(() => { return query.value.search(/^z?x.*$/) !== -1; });

export {query_input, query, texts, is_valid, candidates, is_punctuation_code};