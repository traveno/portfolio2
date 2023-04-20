<script lang="ts">
    import Expertise from "$lib/components/main-page/Expertise.svelte";
    import OtherExpertise from "$lib/components/main-page/OtherExpertise.svelte";
    import Game from "$lib/threedee/Game.svelte";
    import { heroBackgroundColor } from "$lib/stores/data";
    import { fade } from "svelte/transition";

    let orbPos: { x: number, y: number };
    let cursorElement: HTMLElement;

    function smoothScrollToId(event: MouseEvent) {
        event.preventDefault();
        const link = event.currentTarget as HTMLAnchorElement;
        const anchorId = new URL(link.href).hash.replace('#', '');
        const anchor = document.getElementById(anchorId);
        window.scrollTo({ top: (anchor?.offsetTop ?? 0) + (anchor?.offsetHeight ?? 0), behavior: 'smooth' });
    }
</script>

<svelte:head>
    <title>Stephen -- Software Engineer</title>
</svelte:head>

<!-- <div class="fixed w-full h-full top-0 left-0 bg-absolute"></div> -->

<div class="absolute w-full h-full top-0 left-0">
    <Game />

    {#if orbPos}
        <svg class="w-full h-full absolute top-0 left-0 z-50 pointer-events-none stroke-info stroke-2"><line x1="478" y1="50" x2={orbPos.x} y2={orbPos.y} /></svg>
        <div class="w-[32px] h-[32px] rounded-full absolute top-0 left-0 border-2 border-info" style:left={`${orbPos.x - 16}px`} style:top={`${orbPos.y - 16}px`} bind:this={cursorElement}></div>

        <!-- <div class="absolute -top-24 -left-40 z-50 mockup-code px-4 scale-50 transition-opacity border-info border-4">
            <pre><code class="text-sm">{orbCode}</code></pre>
        </div> -->
    {/if}

</div>

<div class="absolute top-full left-0 h-full w-full">
    <div class="flex flex-col">

        <!-- Expertise -->
        <div id="2" class="flex flex-row justify-center items-center h-screen from-base-100 to-base-100/80 bg-gradient-to-b" style:background-color={$heroBackgroundColor}>
            <Expertise />
        </div>

        <!-- Expertise -->
        <div id="3" class="flex flex-row justify-center items-center h-screen from-base-100/80 to-base-100-80 bg-gradient-to-b" style:background-color={$heroBackgroundColor}>
            <OtherExpertise />
        </div>
    </div>
</div>

