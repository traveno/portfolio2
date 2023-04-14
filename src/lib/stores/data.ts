import { writable } from "svelte/store";
import * as THREE from "three";

export const loadingComplete = writable<boolean>(false);

export const enablePhysics = writable<boolean>(true);