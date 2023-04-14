<script lang="ts">
    import StageScene from "$lib/components/threedee/StageScene.svelte";
    import Demo3D from "$lib/components/threedee/demos/Demo3D.svelte";
    import { Canvas } from "@threlte/core";
</script>

<svelte:head>
    <title>Stephen Fike -- Software Engineer</title>
</svelte:head>

<div class="absolute w-full h-full z-0">
    <Canvas>
        <!-- <T.DirectionalLight position={[15, 15, 15]} />
        <T.AmbientLight intensity={1} /> -->
        <StageScene />
    </Canvas>
</div>

<div class="mx-auto flex flex-col justify-start items-center w-screen h-screen max-w-screen-lg py-40 pd:my-28 gap-4">
    <div class="text-6xl uppercase text-base-content">three.js demo</div>
    <div class="divider mt-0"></div>
    <div class="w-full">
        <Demo3D />
    </div>
</div>