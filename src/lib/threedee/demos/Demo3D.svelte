<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from './Scene.svelte';
    import OverlayScene from './OverlayScene.svelte';
    import { delay } from '$lib/helpers';
    import { fade, scale } from 'svelte/transition';
    import { loadingComplete } from '$lib/stores/data';

    let windowWidth: number;
    let windowHeight : number;

    let primaryScene: Scene;
    let overlayScene: OverlayScene;

    let splashVisible = true;
    let loading = true;

    let zoomScale: number | undefined;

    $: if (windowWidth && windowHeight) {
        if (zoomScale === undefined) zoomScale = (windowWidth / windowHeight) < 0.75 ? 0.4 : 1;
    }


    async function runDemoSequence() {
        splashVisible = false;
        overlayScene.setCameraPosition(25, 25, 27);
        overlayScene.setCameraLookAt(-2, 0, -3);
        overlayScene.setCameraZoom(50);
        await overlayScene.say('// welcome to my portfolio!');
        await delay(1000);
        await overlayScene.say('// let\'s have some fun');
        await delay(500);
        overlayScene.setCameraPosition(25, 25, 20);
        overlayScene.setCameraLookAt(-2, 0, -10);
        await overlayScene.say('<MeshSpotLight color={{ 0x7a6e00 }} />')
        await delay(500);
        primaryScene.setDemoStage(1);
        await delay(500);
        primaryScene.setCameraZoom(50);
        await delay(500);
        await overlayScene.say('<MeshTorus rotation={{ x: xRot }} scale={0.1} />');
        await delay(500);
        primaryScene.setDemoStage(2);
        await delay(1000);
        await overlayScene.say('<MeshTorus rotation={{ y: xRot }} scale={0.2} />');
        await delay(500);
        primaryScene.setDemoStage(3);
        await delay(1000);
        runFullSequence();
    }

    async function runFullSequence() {
        await overlayScene.say('// great! let\'s keep going');
        await delay(1000);
        await overlayScene.say('// check this out');
        await delay(500);
        primaryScene.setDemoStage(4);
        await delay(500);
        primaryScene.setDemoStage(5);
        await delay(5000);
        await overlayScene.say('// let\'s get rid of this grid');
        await delay(500);
        await overlayScene.say('scene.remove(grid);');
        await delay(500);
        primaryScene.setDemoStage(6);
        await delay(3000);
        await overlayScene.say('// much better');
        await delay(1000);
        await overlayScene.say('// ok... let\'s keep moving');
        await delay(500);
        await overlayScene.say('// another trick for you');
        await delay(1000);
        primaryScene.setDemoStage(7);
        await delay(6000);
        primaryScene.setDemoStage(8);
    }

    function onLoadComplete() {
        loading = false;
        loadingComplete.set(true);
    }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class="relative lg:rounded-lg aspect-video overflow-hidden border-warning">
    {#if zoomScale !== undefined}
    <div class="absolute w-full h-full">
        <Canvas>
            <Scene bind:this={primaryScene} cameraZoomScale={zoomScale} />
        </Canvas>
    </div>
    <div class="absolute w-full h-full">
        <Canvas>
            <OverlayScene bind:this={overlayScene} on:load={() => onLoadComplete()} cameraZoomScale={zoomScale} />
        </Canvas>
    </div>
    {/if}
    {#if loading}
    <div class="absolute w-full h-full z-20 bg-base-100" out:fade={{ duration: 500, delay: 500 }}>
        <div class="flex flex-col justify-center items-center h-full space-y-12">
            <img src="/sf.png" id="initials" alt="my initials" class="w-24" out:scale={{ start: 2, duration: 500 }} />
            <!-- <progress class="progress progress-info w-56" value={$loadingComplete ? 100 : 0} max="100"></progress> -->
        </div>
    </div> 
    {/if}
    {#if splashVisible}
    <div class="absolute w-full h-full z-10 bg-base-100/25 backdrop-blur flex flex-col justify-center items-center">
        <button class="btn btn-warning btn-lg btn-outline" on:click={() => runDemoSequence()}>Run 3D Demo</button>
    </div>
    {/if}
</div>

<style>
    #initials {
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }

    @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>