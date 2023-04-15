<script lang="ts">
    import StageScene from "$lib/components/threedee/StageScene.svelte";
    import Demo3D from "$lib/components/threedee/demos/Demo3D.svelte";
    import Demo3DInteractive from "$lib/components/threedee/demos/Demo3DInteractive.svelte";
    import { Canvas } from "@threlte/core";
</script>

<svelte:head>
    <title>Stephen Fike -- Software Engineer</title>
</svelte:head>

<div class="fixed w-full h-screen -z-20 bg-black">
    <Canvas>
        <StageScene />
    </Canvas>
</div>

<div class="mx-auto flex flex-col justify-start max-w-screen-lg gap-24 my-24">
    <div>
        <span class="text-5xl md:text-7xl text-base-content"><span class="font-mono p-1 bg-base-100 rounded">three.js</span> Demo</span>
        <Demo3D />
    </div>
    <div>
        <span class="text-5xl md:text-7xl text-base-content"><span class="font-mono p-1 bg-base-100 rounded">three.js</span> Demo</span>
        <Demo3DInteractive />
    </div>
</div>