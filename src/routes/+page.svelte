<script lang="ts">
    import Expertise from "$lib/components/main-page/Expertise.svelte";
    import OtherExpertise from "$lib/components/main-page/OtherExpertise.svelte";
    import OrbScene from "$lib/components/threedee/OrbScene.svelte";
    import { downArrowClicked, heroBackgroundColor } from "$lib/stores/data";
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

<div class="absolute w-full h-screen bg-black">
    <Canvas>
        <OrbScene />
    </Canvas></div>

<div class="flex flex-col">
        <div class="flex flex-col h-screen justify-start items-center">
        {#if !$downArrowClicked}
        <div class="basis-2/3"></div>
        <div class="basis-1/3">
            <a href="#2" on:click={event => { smoothScrollToId(event); $downArrowClicked = true; }}>
                <span class="icon-[solar--alt-arrow-down-bold] w-24 h-24 cursor-pointer animate-[bounce_2s_ease-in-out_infinite] animation-delay-500 opacity-50" style:color={$heroBackgroundColor}></span>
            </a>
        </div>
        {/if}
    </div>

    <!-- Expertise -->
    <div id="2" class="flex flex-row justify-center items-center h-screen from-black to-base-300 bg-gradient-to-b">
        <Expertise />
    </div>

    <!-- Expertise -->
    <div id="2" class="flex flex-row justify-center items-center h-screen from-base-300 to-transparent/75 bg-gradient-to-b" style:background-color={$heroBackgroundColor}>
        <OtherExpertise />
    </div>
</div>
