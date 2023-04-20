import { writable } from "svelte/store";
import * as THREE from "three";

export const marbleScreenPosition = writable<{ x: number, y: number }>({ x: 0, y: 0 });
export const attractorPosition = writable<THREE.Vector3>(new THREE.Vector3(0, 0, 0));