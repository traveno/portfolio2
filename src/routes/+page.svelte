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

    // let mouseX = 0;
    // let mouseY = 0;

    // function updateCursorPos(event?: MouseEvent) {
    //     let container = document.getElementById('main-container')!;
    //     let customCursor = document.getElementById('custom-cursor')!;
    //     let customFollower = document.getElementById('custom-cursor-follower')!;

    //     const rect = container.getBoundingClientRect();

    //     if (event !== undefined) {
    //         mouseX = event.clientX + container.scrollLeft - rect.left;
    //         mouseY = event.clientY + container.scrollTop - rect.top;
    //     }

    //     customCursor.style.transform = `translate3d(${mouseX - (7 / 2)}px, ${mouseY - (7 / 2)}px, 0)`;
    //     customFollower.style.transform = `translate3d(${mouseX - (25 / 2)}px, ${mouseY - (25 / 2)}px, 0)`;
    // }
</script>

<svelte:head>
    <title>Stephen Fike -- Software Engineer</title>
</svelte:head>

<!-- <div id="custom-cursor"></div>
<div id="custom-cursor-follower"></div> -->

<!-- <svelte:body on:mousemove={event => updateCursorPos(event)} on:scroll={event => updateCursorPos()} /> -->

<div class="flex flex-col">
    <!-- Hero -->
    <div class="flex flex-row justify-center items-center h-screen bg-black relative">
        <Canvas>
            <!-- <T.DirectionalLight position={[15, 15, 15]} />
            <T.AmbientLight intensity={1} /> -->
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

    <!-- Other Expertise -->
    <!-- <div id="2" class="flex flex-row justify-center items-center h-screen bg-base-300">
        <OtherExpertise />
    </div> -->
</div>
<!-- 
<style>
    #custom-cursor {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #d2d2d2;
        opacity: 50%;
        position: absolute;
        z-index: 1000;
        pointer-events: none;
    }

    #custom-cursor-follower {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: solid #d2d2d2;
        background-color: transparent;
        opacity: 25%;
        position: absolute;
        z-index: 1000;
        pointer-events: none;
    }
</style> -->