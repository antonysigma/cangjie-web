import './decode';

import {createApp} from 'vue';

import TheMainApp from './components/the-main-app.vue';
import {query} from './models';

createApp(TheMainApp).mount('#root');

query.value = 'zx';