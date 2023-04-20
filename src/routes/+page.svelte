<script lang="ts">
    import Expertise from "$lib/components/main-page/Expertise.svelte";
    import OtherExpertise from "$lib/components/main-page/OtherExpertise.svelte";
    import Game from "$lib/threedee/Game.svelte";
    import { downArrowClicked, heroBackgroundColor } from "$lib/stores/data";
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

    let orbCode = `
function updateVertices() {
    const t = performance.now() / 1000;

    let lineLoopChildren = sphere.children.filter(c => c.type === 'LineLoop');

    for (let i = 0; i < lineLoopChildren.length; i++) {
        let line = lineLoopChildren[i] as THREE.Line;
        let lineGeometry = line.geometry as THREE.BufferGeometry;
        let lineBufferAttr = lineGeometry.attributes.position as THREE.Float32BufferAttribute;

        for (let j = 0; j < verticesAmount; j++) {
            let vec3 = new THREE.Vector3(
                lineBufferAttr.getX(j),
                lineBufferAttr.getY(j),
                lineBufferAttr.getZ(j)
            ).clone();

            if (vec3.y > radius)
                vec3.setY(0);

            const originalHeight = vec3.clone().y;
            const radiusHeight = Math.sqrt(vec3.y * (radius - vec3.y));
            const ratio = noise3D(Math.cos((j + 1) / verticesAmount * Math.PI * 2), 
                Math.sin((j + 1) / verticesAmount * Math.PI * 2), t + i) / 5;

            vec3.copy(originals[(i * verticesAmount) + j]);
            vec3.y = originalHeight
            vec3.multiplyScalar(radiusHeight + ratio);

            lineBufferAttr.setXYZ(j, vec3.x, originalHeight, vec3.z);
        }

        line.geometry.translate(0, 0.01, 0);
        lineBufferAttr.needsUpdate = true;
    } 
}
`;
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

    <div class="flex flex-col h-screen justify-end items-center">
        {#if $downArrowClicked}
        <div class="basis-2/3"></div>
        <div class="basis-1/3" transition:fade>
            <a href="#2" class="z-10 w-14 h-16 absolute bottom-24 animate-[bounce_2s_ease-in-out_infinite] animation-delay-500" on:click={event => { smoothScrollToId(event); $downArrowClicked = true; }}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="/pointer2.svg" class="rotate-180" />
            </a>
        </div>
        {/if}
    </div>

</div>

<div class="absolute top-full left-0 h-full w-full">
    <div class="flex flex-col">

        <!-- Expertise -->
        <div id="2" class="flex flex-row justify-center items-center h-screen from-base-100 to-base-100/80 bg-gradient-to-b" style:background-color={$heroBackgroundColor}>
            <Expertise />
        </div>

        <!-- Expertise -->
        <div id="3" class="flex flex-row justify-center items-center h-screen from-transparent/75 to-transparent/50 bg-gradient-to-b" style:background-color={$heroBackgroundColor}>
            <OtherExpertise />
        </div>
    </div>
</div>

