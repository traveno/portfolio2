<script lang="ts">
    import StageScene from "$lib/components/threedee/StageScene.svelte";
    import Demo3D from "$lib/components/threedee/demos/Demo3D.svelte";
    import Demo3DInteractive from "$lib/components/threedee/demos/Demo3DInteractive.svelte";
    import { Canvas } from "@threlte/core";
</script>

<svelte:head>
    <title>Stephen Fike -- Software Engineer</title>
</svelte:head>

<div class="fixed w-full h-full bg-black -z-10"></div>

<div class="relative w-full">
    <div class="absolute w-full h-screen grow flex-1 bg-black">
        <Canvas>
            <StageScene />
        </Canvas>
    </div>

    <div class="mx-auto flex flex-col justify-start max-w-screen-lg gap-12 py-24">
        <div class="z-10 flex flex-col space-y-8">
            <span class="text-5xl md:text-7xl text-base-content"><span class="font-mono p-1 bg-base-100 rounded">three.js</span> Demo</span>
            <Demo3D />
        </div>
        <div class="divider"></div>
        <div class="z-10 flex flex-col space-y-8">
            <span class="text-5xl md:text-7xl text-base-content"><span class="font-mono p-1 bg-base-100 rounded">three.js</span> Demo</span>
            <Demo3DInteractive />
        </div>
    </div>
</div>

