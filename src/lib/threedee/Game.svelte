<script lang="ts">
    import { Canvas, T, type ThrelteContext } from "@threlte/core";
    import GameScene from "./scenes/GameScene.svelte";
    import Pointer from "../components/Pointer.svelte";
    import { marbleScreenPos } from "$lib/stores/gameState";
    import { Environment, useProgress } from "@threlte/extras";
    import { onMount } from "svelte";
    import * as THREE from 'three';
    import { tweened } from "svelte/motion";
    import { fade } from "svelte/transition";
    import Camera from "./game/Camera.svelte";
    import ChatBubble from "$lib/components/ChatBubble.svelte";
    import { openingMessages, repeatVisitorMessages } from "$lib/stores/dialogue";
    import { isPreviousVisitor } from "$lib/stores/data";

    let ctx: ThrelteContext;
    let chatBubble: ChatBubble;
    let pointer: Pointer;

    $: if (chatBubble && $progress === 1) {
        new Promise<void>(resolve => setTimeout(resolve, 2000)).then(() => {
            if (!isPreviousVisitor)
                chatBubble.startDialogueSequence(marbleScreenPos, openingMessages, () => {
                    pointer.point(marbleScreenPos, 10000); // point for 10 secs
                });
            else
                chatBubble.startDialogueSequence(marbleScreenPos, repeatVisitorMessages, () => {
                    console.log('Mark as visited!');
                });
        });
    }

    const { progress } = useProgress();
    const tweenedProgress = tweened($progress, { duration: 500 });
    $: tweenedProgress.set($progress);
    
    onMount(() => {
        ctx.renderer!.outputEncoding = THREE.sRGBEncoding;
        ctx.renderer!.shadowMap.enabled = true;
        ctx.renderer!.shadowMap.type = THREE.PCFSoftShadowMap;
    });
</script>

<!-- Threlte -->
<Canvas bind:ctx rendererParameters={{ alpha: true, antialias: true }} >
    <Camera />
    <GameScene />
    <Environment
        path="/textures/"
        files="studio.hdr"
        format="hdr"
        isBackground={false}
    />
</Canvas>

<!-- Loading screen on initial webpage load -->
{#if $tweenedProgress < 1}
    <div class="absolute top-0 left-0 w-full h-full bg-base-100 flex flex-col gap-4 justify-center items-center" transition:fade|local={{ duration: 250 }}>
        <p class="text-base-content/50 text-4xl">Loading</p>
		<div class="relative w-1/3">
			<progress class="h-4 progress progress-info" value={$tweenedProgress} max="1"></progress>
		</div>
    </div>
{/if}

<!-- UI Dialogue layer -->
<ChatBubble bind:this={chatBubble} />

<!-- Pointer -->
<Pointer bind:this={pointer} />