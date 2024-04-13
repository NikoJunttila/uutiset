import { writable } from 'svelte/store';

// global store for boolean value used in showing big article
const booleanStore = writable(false);

export default booleanStore;