import { writable } from "svelte/store";
import * as THREE from "three";

export interface ScreenCoords {
    x: number,
    y: number
}

export const marbleScreenPos = writable<ScreenCoords>({ x: 0, y: 0 });
export const attractorPos = writable<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

export const cameraFocus = writable<{ position: THREE.Vector3, zoomLevel: number } | null>(null);