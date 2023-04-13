import { writable } from "svelte/store";

export const loadingComplete = writable<boolean>(false);
export const keyboardLoad = writable<number>(0);