<script lang="ts">
    import { Canvas, Pass, type ThrelteContext } from "@threlte/core";
    import GameScene from "./scenes/GameScene.svelte";
    import Pointer from "../components/Pointer.svelte";
    import { marbleScreenPosition } from "$lib/stores/gameState";
    import { Environment } from "@threlte/extras";
    import { onMount } from "svelte";
    import * as THREE from 'three';

    let ctx: ThrelteContext;
    
    onMount(() => {
        ctx.renderer!.outputEncoding = THREE.sRGBEncoding;
    });

</script>


<Canvas bind:ctx rendererParameters={{ alpha: true, antialias: true }}>
    <GameScene />
     <!-- <Pass pass={new RenderPixelatedPass(2.5, ctx.scene, get(ctx.camera))} /> -->

    <Environment
        path="/textures/"
        files="studio.hdr"
        format="hdr"
        isBackground={false}
    />
</Canvas>

<Pointer screenPosition={$marbleScreenPosition} />