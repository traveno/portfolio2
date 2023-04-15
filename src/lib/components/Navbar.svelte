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
<div class="navbar px-8 bg-black">
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
    <div class="navbar-end gap-8">
        <a href="https://github.com/traveno2" target="_blank" class="tooltip tooltip-bottom" data-tip="Linkedin">
            <svg class="fill-base-content/75 hover:fill-base-content cursor-pointer transition-colors" height="32" viewBox="0 0 72 72" width="32" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#000000"/><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" /></g></svg>
        </a>
        <a href="https://github.com/traveno" target="_blank" class="tooltip tooltip-bottom" data-tip="GitHub">
            <svg class="fill-base-content/75 hover:fill-base-content cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
    </div>
</div>

{#if infoMenuVisible}
<OutClick on:outclick={() => infoMenuVisible = false}>
    <div  class="z-10 p-4 rounded from-transparent/30 to-transparent/10 bg-gradient-to-b" id="tooltip" style:background-color={$heroBackgroundColor} use:floatingContent transition:fly={{ y: 10, duration: 250 }}>
        <div class="flex flex-col justify-normal">
            <p class="text-2xl text-center">Portfolio</p>
            <div class="divider m-0"></div>
            <p>Last update <span class="p-1 bg-base-100/25 rounded font-mono">April 14, 2023</span></p>
            <div class="divider m-0"></div>
            <p>created using <a href="https://kit.svelte.dev/" target="_blank" class="text-accent">SvelteKit</a> -
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

    #tooltip:focus-within {
        border: 2px solid red;
    }
</style>