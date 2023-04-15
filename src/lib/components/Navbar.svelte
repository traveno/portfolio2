<script lang="ts">
    import { page } from "$app/stores";
    import { randomHexColor } from "$lib/helpers";
    import { heroBackgroundColor, unleashBalls } from "$lib/stores/data";
    import { createFloatingActions, arrow } from 'svelte-floating-ui';
    import { flip, offset, shift } from "svelte-floating-ui/dom";
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";
    import OutClick from 'svelte-outclick';

    let infoMenuVisible = false;
    const arrowRef = writable<HTMLElement>();

    const [ floatingRef, floatingContent, update ] = createFloatingActions({
        strategy: 'absolute',
        placement: 'bottom',
        middleware: [
            offset({ mainAxis: 5 }),
            shift({ padding: 50 }),
            flip(),
            arrow({
                element: arrowRef
            })
        ],
        autoUpdate: {

        },
        onComputed({ placement, middlewareData }) {
            const x = middlewareData.arrow!['x'];
            const y = middlewareData.arrow!['y'];
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
            }[placement.split('-')[0]];

            Object.assign($arrowRef.style, {
                left: x != null ? `${x}px` : '',
                top: y != null ? `${y}px` : '',
                right: '',
                bottom: '',
                [staticSide!]: '-4px'
            });
        }
            
    });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="navbar px-8 py-4 bg-black">
    <div class="navbar-start">
        <div class="dropdown">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/"           class="bg-transparent hover:text-base-content {$page.url.pathname === '/'           ? 'text-accent' : 'text-base-content/75'}">\\home</a></li>
                <li><a href="/cool-stuff" class="bg-transparent hover:text-base-content {$page.url.pathname === '/cool-stuff' ? 'text-accent' : 'text-base-content/75'}">\\ cool stuff</a></li>
                <li><a href="/about"      class="bg-transparent hover:text-base-content {$page.url.pathname === '/about'      ? 'text-accent' : 'text-base-content/75'}">\\ about</a></li>
                <li><a href="/projects"   class="bg-transparent hover:text-base-content {$page.url.pathname === '/projects'   ? 'text-accent' : 'text-base-content/75'}">\\ projects</a></li>
                <li><a href="/contact"    class="bg-transparent hover:text-base-content {$page.url.pathname === '/contact'    ? 'text-accent' : 'text-base-content/75'}">\\ contact me</a></li>
            </ul>
        </div>

        <!-- Fun button -->
        <div class="hidden md:block tooltip tooltip-bottom tooltip-warning" data-tip="Roll The Dice">
            <button class="btn btn-square btn-ghost hover:bg-transparent" on:click={() => $heroBackgroundColor = randomHexColor()}>
                <span class="icon-[ion--dice-outline] w-8 h-8 text-base-content/75 hover:text-warning transition-colors"></span>
            </button>
        </div>
        <div class="hidden md:block tooltip tooltip-bottom tooltip-info" data-tip="Info">
            <button class="btn btn-square btn-ghost hover:bg-transparent" use:floatingRef on:click={() => infoMenuVisible = !infoMenuVisible}>
                <span class="icon-[tabler--info-square-rounded] w-8 h-8 text-base-content/75 hover:text-info transition-colors"></span>
            </button>
        </div>

        {#if $page.url.pathname === '/'}
        <div class="hidden md:block tooltip tooltip-bottom tooltip-success" data-tip={'Party Mode'}>
            <button class="btn btn-square btn-ghost hover:bg-transparent" on:click={() => $unleashBalls = !$unleashBalls} disabled={$page.url.pathname !== '/'}>
                <span class="icon-[bx--party] w-8 h-8 text-base-content/75 {$unleashBalls ? 'text-success' : 'hover:text-success'} transition-colors"></span>
            </button>
        </div>
        {:else}
        <div class="hidden md:block tooltip tooltip-bottom tooltip-info" data-tip={'Party Mode only works on the home page'}>
            <button class="btn btn-square btn-ghost hover:bg-transparent" disabled>
                <span class="icon-[bx--party] w-8 h-8 text-base-content/25 transition-colors"></span>
            </button>
        </div>
        {/if}

        
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/"           class="bg-transparent hover:text-base-content {$page.url.pathname === '/'           ? 'text-accent' : 'text-base-content/75'}">//home</a></li>
            <li><a href="/cool-stuff" class="bg-transparent hover:text-base-content {$page.url.pathname === '/cool-stuff' ? 'text-accent' : 'text-base-content/75'}">//cool_stuff</a></li>
            <li><a href="/about"      class="bg-transparent hover:text-base-content {$page.url.pathname === '/about'      ? 'text-accent' : 'text-base-content/75'}">//about</a></li>
            <li><a href="/projects"   class="bg-transparent hover:text-base-content {$page.url.pathname === '/projects'   ? 'text-accent' : 'text-base-content/75'}">//projects</a></li>
            <li><a href="/contact"    class="bg-transparent hover:text-base-content {$page.url.pathname === '/contact'    ? 'text-accent' : 'text-base-content/75'}">//contact_me</a></li>
        </ul>
    </div>
    <div class="navbar-end gap-3">
        <a href="https://github.com/traveno2" target="_blank" class="tooltip tooltip-bottom" data-tip="Linkedin">
            <span class="icon-[bxl--linkedin] w-8 h-8 text-base-content/75 hover:text-base-content cursor-pointer transition-colors"></span>
        </a>
        <a href="https://github.com/traveno" target="_blank" class="tooltip tooltip-bottom" data-tip="GitHub">
            <span class="icon-[mdi--github] w-8 h-8 text-base-content/75 hover:text-base-content cursor-pointer transition-colors"></span>
        </a>
    </div>
</div>

{#if infoMenuVisible}
<OutClick on:outclick={() => infoMenuVisible = false}>
    <div  class="z-10 p-4 rounded from-transparent/30 to-transparent/10 bg-gradient-to-b" id="tooltip" style:background-color={$heroBackgroundColor} use:floatingContent transition:fly={{ y: 10, duration: 250 }}>
        <div class="flex flex-col justify-normal">

            <a href="https://github.com/traveno/portfolio2" target="_blank">
                <div class="flex flex-row justify-center items-center w-full space-x-1">
                    <p class="text-2xl font-mono">portfolio2</p>
                    <span class="icon-[mdi--github] w-8 h-8"></span>
                </div>
            </a>
            
            <p class="text-sm italic text-center">the successor to my last portfolio</p>
            <div class="divider m-0"></div>
            <div class="flex flex-row justify-between items-center w-full">
                <p>Version date</p>
                <span class="p-1 px-2 bg-base-100/25 rounded font-mono">April 14, 2023</span>
            </div>
            
            <div class="divider m-0"></div>
            <p>Created using <a href="https://kit.svelte.dev/" target="_blank" class="text-accent">SvelteKit</a> -
                <a href="https://threejs.org/" target="_blank" class="text-accent">three.js</a> -
                <a href="https://vercel.com/" target="_blank" class="text-accent">Vercel</a></p>
        </div>
        <div bind:this={$arrowRef} id="arrow" style:background-color={$heroBackgroundColor} class="from-transparent/30 to-transparent/30 bg-gradient-to-b" />
    </div>
</OutClick>
{/if}


<style>
    #arrow {
        position: absolute;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
    }

    #tooltip {
        position: absolute;
    }
</style>