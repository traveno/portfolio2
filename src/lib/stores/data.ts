import { writable } from "svelte/store";
import * as THREE from "three";

export const loadingComplete = writable<boolean>(false);

export const enablePhysics = writable<boolean>(true);

export const heroBackgroundColor = writable<string>('#0390fc');