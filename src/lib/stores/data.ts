import { writable } from "svelte/store";

export const loadingComplete = writable<boolean>(false);