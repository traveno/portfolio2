<script lang="ts">
    import type { ScreenCoords } from "$lib/stores/gameState";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";

    let pointerElement: HTMLElement;

    let visible = false;
    let screenPosition: ScreenCoords = { x: 0, y: 0 };

    $: if (pointerElement && screenPosition) {
        Object.assign(pointerElement.style, { top: `${screenPosition.y - 150}px`, left: `${screenPosition.x - 40}px` });
    }

    export function point(position: Writable<ScreenCoords>, duration: number) {
        let unsubscribe = position.subscribe(latestPos => {
            screenPosition = latestPos;
            visible = true;
        });

        setTimeout(() => {
            unsubscribe();
            visible = false;
        }, duration);
    }

    // onMount(() => {
    //     point(writable<ScreenCoords>({ x: 500, y: 900}), 100000);
    // });
</script>

<div class="absolute w-full h-full top-0 left-0 pointer-events-none overflow-hidden" >
    <div bind:this={pointerElement} class="w-14 absolute">
        {#if visible}
        <!-- svelte-ignore a11y-missing-attribute -->
        <div class="flex flex-col justify-between gap-8" transition:fade={{ duration: 250 }}>
            <!-- <img src="/mouse.svg" />     -->
            <div class="animate-[bounce_1.5s_ease-in-out_infinite] animation-delay-500"><img src="/pointer2.svg" class="rotate-180" /></div>
        </div>
        {/if}
    </div>
</div>