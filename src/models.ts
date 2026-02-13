import {ref} from 'vue';

const query = ref<string>('');
const candidates = ref<string[]>([]);
const texts = ref<string>('');
const is_valid = ref<boolean>(true);

export {query, texts, is_valid, candidates};