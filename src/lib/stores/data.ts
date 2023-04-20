import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const loadingComplete = writable<boolean>(false);
export const heroBackgroundColor = writable<string>('#7aabff');

// Current theme name (defaults to dark)
export const theme = writable<'light' | 'dark'>('dark');


export const isPreviousVisitor = browser ? localStorage.getItem('visited') === 'true' : false;