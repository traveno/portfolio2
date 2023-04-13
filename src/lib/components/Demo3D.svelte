<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from './Scene.svelte';
    import OverlayScene from './OverlayScene.svelte';
    import { delay } from '$lib/helpers';
    import { createEventDispatcher } from 'svelte';

    let containerWidth: number;
    let containerHeight : number;

    let primaryScene: Scene;
    let overlayScene: OverlayScene;

    let splashVisible = true;

    const dispatch = createEventDispatcher();


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
</script>

<div class="relative lg:rounded-lg aspect-video overflow-hidden border-warning" bind:clientWidth={containerWidth} bind:clientHeight={containerHeight}>
    <div class="absolute w-full h-full">
        <Canvas>
            <Scene bind:this={primaryScene} />
        </Canvas>
    </div>
    <div class="absolute w-full h-full">
        <Canvas>
            <OverlayScene bind:this={overlayScene} on:loaded={() => dispatch('loaded')} />
        </Canvas>
    </div>
    {#if splashVisible}
    <div class="absolute w-full h-full z-10 bg-base-100/25 backdrop-blur flex flex-col justify-center items-center">
        <button class="btn btn-warning btn-lg btn-outline" on:click={() => runDemoSequence()}>Run 3D Demo</button>
    </div>
    {/if}
</div>
