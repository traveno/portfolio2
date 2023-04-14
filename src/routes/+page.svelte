<script lang="ts">
    import Expertise from "$lib/components/main-page/Expertise.svelte";
    import OrbScene from "$lib/components/threedee/OrbScene.svelte";
    import { heroBackgroundColor } from "$lib/stores/data";
    import { Canvas } from "@threlte/core";

    function smoothScrollToId(event: MouseEvent) {
        event.preventDefault();
        const link = event.currentTarget as HTMLAnchorElement;
        const anchorId = new URL(link.href).hash.replace('#', '');
        const anchor = document.getElementById(anchorId);
        window.scrollTo({ top: anchor?.offsetTop, behavior: 'smooth' });
    }
</script>

<svelte:head>
    <title>Stephen -- Software Engineer</title>
</svelte:head>

<div class="flex flex-col">
    <!-- Hero -->
    <div class="flex flex-row justify-center items-center h-screen bg-black relative">
        <Canvas>
            <OrbScene />
        </Canvas>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="absolute block h-1/5 w-full bottom-0 left-0 right-0">
            <a href="#2" on:click={event => smoothScrollToId(event)}>
                <svg style="fill: {$heroBackgroundColor}; fill-opacity: 0.5;" class="fill-base-content/50 mx-auto cursor-pointer animate-[bounce_2s_ease-in-out_infinite] animation-delay-500" xmlns="http://www.w3.org/2000/svg" height="96" viewBox="0 96 960 960" width="96"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg>
            </a>
        </div>
    </div>

    <!-- Expertise -->
    <div id="2" class="flex flex-row justify-center items-center h-screen from-black to-base-300 bg-gradient-to-b">
        <Expertise />
    </div>
</div>
