<script lang="ts">
import { onMount } from 'svelte';
import { Canvas } from '@threlte/core';
import Scene from './Demo3DInteractiveScene.svelte';

    let containerHeight: number;
    let containerWidth: number;

    onMount(() => {
        console.log(containerWidth, containerHeight);
    })

    let animSpeed = 0.5;
    let cameraZoom = 0;
    let cylinderLength = 0.01;
</script>

<div id="demo-interactive" class="aspect-video rounded-lg overflow-hidden" bind:clientWidth={containerWidth} bind:clientHeight={containerHeight}>
    <div id="demo-display">
        <Canvas size={{ width: containerWidth * 0.7, height: containerWidth * 0.5625 }}>
            <Scene animationSpeed={animSpeed} cameraZoom={cameraZoom} cylinderLength={cylinderLength} />
        </Canvas>
    </div>
    <div id="demo-controls" style:width={ (containerWidth * 0.3).toString() + 'px' }>
        <div class="p-8">
            <!-- <h2>ANIMATION SPEED</h2>
            <Slider bind:value={animSpeed} min={0} max={1} step={0.001} />

            <h2>CAMERA ZOOM</h2>
            <Slider bind:value={cameraZoom} min={0} max={1} step={0.001} />

            <h2>CYLINDER LENGTH</h2>
            <Slider bind:value={cylinderLength} min={0.01} max={1} step={0.001} /> -->
            <p class="pb-2 text-3xl text-gray-300">Controls</p>
            <hr>
            <label for="anim-speed-slider" class="pt-5 block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Animation speed</label>
            <input bind:value={animSpeed} id="anim-speed-slider" type="range" min="0" max="1" step="0.001" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">

            <label for="camera-zoom-slider" class="pt-5 block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Camera zoom level</label>
            <input bind:value={cameraZoom} id="camera-zoom-slider" type="range" min="0" max="1" step="0.001" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">

            <label for="cylinder-slider" class="pt-5 block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Cylinder length</label>
            <input bind:value={cylinderLength} id="cylinder-slider" type="range" min="0.01" max="1" step="0.001" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </div>
        
    </div>
</div>

<style>
    #demo-interactive {
        background-color: rgb(28, 28, 28);
    }

    #demo-controls {
        float: right;
        width: 30%;
        font-family: 'Cascadia Code';
        color: darkgray;
    }

    #demo-display {
        width: 70%;
        float: left;
    }
</style>