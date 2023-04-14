<script lang="ts">
    import StageScene from "$lib/components/threedee/StageScene.svelte";
    import Demo3D from "$lib/components/threedee/demos/Demo3D.svelte";
    import Demo3DInteractive from "$lib/components/threedee/demos/Demo3DInteractive.svelte";
    import { Canvas } from "@threlte/core";
</script>

<svelte:head>
    <title>Stephen Fike -- Software Engineer</title>
</svelte:head>

<div class="fixed w-full h-full bg-black">
    <Canvas>
        <!-- <T.DirectionalLight position={[15, 15, 15]} />
        <T.AmbientLight intensity={1} /> -->
        <StageScene />
    </Canvas>
</div>

<div class="mx-auto flex flex-col justify-start items-center max-w-screen-lg gap-4 py-40">
    <span class="text-5xl md:text-7xl text-base-content z-10"><span class="font-mono p-1 bg-base-100 rounded">three.js</span> Demo</span>
    <div class="divider"></div>
    <div class="w-full">
        <Demo3D />
    </div>
    <div class="divider"></div>
    <div class="w-full">
        <Demo3DInteractive />
    </div>
</div>