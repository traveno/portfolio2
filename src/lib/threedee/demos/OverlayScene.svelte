<script lang="ts">
    import {
        AmbientLight,
        DirectionalLight,
        OrthographicCamera,
        useThrelte,
    } from '@threlte/core'
    import { spring, tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { createEventDispatcher } from 'svelte';
    import Keyboard from './Keyboard.svelte';
    
    const dispatch = createEventDispatcher();

    const { scene } = useThrelte();

    let keyboard: Keyboard;


    export function setCameraZoom(zoomLevel: number) {
        $cameraZoom = zoomLevel;
    }

    export function setCameraPosition(x: number, y: number, z: number) {
        $cameraX = x;
        $cameraY = y;
        $cameraZ = z;
    }

    export function setCameraLookAt(x: number, y: number, z: number) {
        $lookAtX = x;
        $lookAtY = y;
        $lookAtZ = z;
    }

    export async function say(text: string) {
        await keyboard.beginTyping(text);
    }

    const cameraZoom = spring(50);
    export let cameraZoomScale = 0.5;

    const cameraX = tweened(25, {duration: 400, easing: cubicOut} );
    const cameraY = tweened(25, {duration: 400, easing: cubicOut} );
    const cameraZ = tweened(25, {duration: 400, easing: cubicOut} );

    const lookAtX = tweened(-2, {duration: 400, easing: cubicOut} );
    const lookAtY = tweened(0, {duration: 400, easing: cubicOut} );
    const lookAtZ = tweened(-5, {duration: 400, easing: cubicOut} );
</script>

<OrthographicCamera position={{ x: $cameraX, y: $cameraY, z: $cameraZ }}  lookAt={{ x: $lookAtX, y: $lookAtY, z: $lookAtZ }} zoom={$cameraZoom * cameraZoomScale} near={5} far={500} >
</OrthographicCamera>

<DirectionalLight shadow position={{ x: 3, y: 5, z: -5 }} target={{ x: 0, y: 0, z: -5 }}/>
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.5} />
<AmbientLight intensity={0.2} />


<Keyboard 
    bind:this={keyboard}
    on:load={() => dispatch('load')}
/>