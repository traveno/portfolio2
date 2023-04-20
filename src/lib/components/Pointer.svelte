<script lang="ts">
    let pointerElement: HTMLElement;

    export let visible = true;
    export let screenPosition: { x: number, y: number } = { x: 0, y: 0 };

    $: if (pointerElement && screenPosition) {
        Object.assign(pointerElement.style, { top: `${screenPosition.y - 110}px`, left: `${screenPosition.x - 40}px` });
    }
</script>

<div class="absolute w-full h-full top-0 left-0 pointer-events-none overflow-hidden">
    <div bind:this={pointerElement} class="w-14 h-16 absolute animate-[bounce_2s_ease-in-out_infinite] animation-delay-500">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="/pointer2.svg" class="rotate-180" />
    </div>
</div>