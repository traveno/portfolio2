import { writable } from "svelte/store";

export const loadingComplete = writable<boolean>(false);
export const enablePhysics = writable<boolean>(true);
export const heroBackgroundColor = writable<string>('#0390fc');

export const unleashBalls = writable<boolean>(false);

// For the big arrow on front page
export const downArrowClicked = writable<boolean>(false);