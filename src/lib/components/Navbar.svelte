<script lang="ts">
    import { page } from "$app/stores";
    import { randomHexColor } from "$lib/helpers";
    import { heroBackgroundColor, unleashBalls } from "$lib/stores/data";
    import { createFloatingActions, arrow } from 'svelte-floating-ui';
    import { flip, offset, shift } from "svelte-floating-ui/dom";
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";

    let infoMenuVisible = false;
    const arrowRef = writable<HTMLElement>();

    const [ floatingRef, floatingContent, update ] = createFloatingActions({
        strategy: 'absolute',
        placement: 'bottom',
        middleware: [
            offset({ mainAxis: 10 }),
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
<!-- Navbar -->
<div class="fixed z-10 bg-black/25 backdrop-blur w-full">
    <!-- Top nav bar -->
    <div class="navbar md:p-4 md:px-8 z-10">
        <div class="navbar-start gap-4">
            <div class="tooltip tooltip-bottom hidden md:block" data-tip="Roll the dice">
                <button class="btn btn-square btn-ghost hover:bg-transparent fill-base-content/75 hover:fill-base-content transition-colors" on:click={() => $heroBackgroundColor = randomHexColor()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M300.118 806Q321 806 335.5 791.382q14.5-14.617 14.5-35.5Q350 735 335.382 720.5q-14.617-14.5-35.5-14.5Q279 706 264.5 720.618q-14.5 14.617-14.5 35.5Q250 777 264.618 791.5q14.617 14.5 35.5 14.5Zm0-360Q321 446 335.5 431.382q14.5-14.617 14.5-35.5Q350 375 335.382 360.5q-14.617-14.5-35.5-14.5Q279 346 264.5 360.618q-14.5 14.617-14.5 35.5Q250 417 264.618 431.5q14.617 14.5 35.5 14.5Zm180 180Q501 626 515.5 611.382q14.5-14.617 14.5-35.5Q530 555 515.382 540.5q-14.617-14.5-35.5-14.5Q459 526 444.5 540.618q-14.5 14.617-14.5 35.5Q430 597 444.618 611.5q14.617 14.5 35.5 14.5Zm180 180Q681 806 695.5 791.382q14.5-14.617 14.5-35.5Q710 735 695.382 720.5q-14.617-14.5-35.5-14.5Q639 706 624.5 720.618q-14.5 14.617-14.5 35.5Q610 777 624.618 791.5q14.617 14.5 35.5 14.5Zm0-360Q681 446 695.5 431.382q14.5-14.617 14.5-35.5Q710 375 695.382 360.5q-14.617-14.5-35.5-14.5Q639 346 624.5 360.618q-14.5 14.617-14.5 35.5Q610 417 624.618 431.5q14.617 14.5 35.5 14.5ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
                </button>
            </div>
            <div class="hidden md:block">
                <button class="btn btn-square btn-ghost hover:bg-transparent" use:floatingRef on:click={() => infoMenuVisible = !infoMenuVisible}>
                    <svg class="{infoMenuVisible ? 'fill-base-content' : 'fill-base-content/75'} hover:fill-base-content cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M453 776h60V536h-60v240Zm26.982-314q14.018 0 23.518-9.2T513 430q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447 430q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                </button>
            </div>

            <div class="hidden md:block tooltip tooltip-bottom" data-tip="Party mode!">
                <button class="btn btn-square btn-ghost hover:bg-transparent" on:click={() => $unleashBalls = !$unleashBalls}>
                    <svg class="fill-base-content/75 hover:fill-base-content" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M160 976q-17 0-28.5-11.5T120 936V717q0-24.75 17.625-42.375T180 657h27V475q0-24.75 17.625-42.375T267 415h183v-64q-20-14-30.5-30.534T409 280.589q0-14.589 5.5-28.089Q420 239 430 229l50-53 50 53q10 10 16 23.5t6 28.089q0 23.343-11 39.877Q530 337 510 351v64h183q24.75 0 42.375 17.625T753 475v182h27q24.75 0 42.375 17.625T840 717v219q0 17-11.5 28.5T800 976H160Zm107-319h426V475H267v182Zm-87 259h600V717H180v199Zm87-259h426-426Zm-87 259h600-600Zm600-259H180h600Z"/></svg>
                </button>
            </div>



            <!-- <button class="hidden md:block btn btn-ghost {$enablePhysics ? 'text-success' : 'text-warning'}" on:click={() => enablePhysics.update(old => !old)}>
                Physics {$enablePhysics ? 'On' : 'Off'}
            </button> -->
        </div>
        <div class="navbar-center">
            <ul class="menu menu-horizontal md:gap-4">
                <li><a href="/"           class="bg-transparent hover:text-base-content {$page.url.pathname === '/'           ? 'text-accent' : 'text-base-content/75'}">\\ home</a></li>
                <li><a href="/cool-stuff" class="bg-transparent hover:text-base-content {$page.url.pathname === '/cool-stuff' ? 'text-accent' : 'text-base-content/75'}">\\ cool stuff</a></li>
                <li><a href="/about"      class="bg-transparent hover:text-base-content {$page.url.pathname === '/about'      ? 'text-accent' : 'text-base-content/75'}">\\ about</a></li>
                <li><a href="/projects"   class="bg-transparent hover:text-base-content {$page.url.pathname === '/projects'   ? 'text-accent' : 'text-base-content/75'} hidden md:block">\\ projects</a></li>
                <li><a href="/contact"    class="bg-transparent hover:text-base-content {$page.url.pathname === '/contact'    ? 'text-accent' : 'text-base-content/75'} hidden md:block">\\ contact me</a></li>
            </ul>
        </div>
        <div class="navbar-end gap-8">
            <a href="https://github.com/traveno2" target="_blank" class="tooltip tooltip-left" data-tip="Linkedin">
                <svg class="fill-base-content/75 hover:fill-base-content cursor-pointer transition-colors" height="32" viewBox="0 0 72 72" width="32" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#000000"/><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" /></g></svg>
            </a>
            <a href="https://github.com/traveno" target="_blank" class="tooltip tooltip-bottom hidden md:block" data-tip="Github">
                <svg class="fill-base-content/75 hover:fill-base-content cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
    </div>













    <!-- Bottom nav bar -->
    <div class="navbar md:p-4 md:px-8 z-10 md:hidden">
        <div class="navbar-start gap-4">
            <div class="tooltip tooltip-bottom" data-tip="Roll the dice">
                <button class="btn btn-square btn-ghost hover:bg-transparent fill-base-content/75 hover:fill-base-content transition-colors" on:click={() => $heroBackgroundColor = randomHexColor()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M300.118 806Q321 806 335.5 791.382q14.5-14.617 14.5-35.5Q350 735 335.382 720.5q-14.617-14.5-35.5-14.5Q279 706 264.5 720.618q-14.5 14.617-14.5 35.5Q250 777 264.618 791.5q14.617 14.5 35.5 14.5Zm0-360Q321 446 335.5 431.382q14.5-14.617 14.5-35.5Q350 375 335.382 360.5q-14.617-14.5-35.5-14.5Q279 346 264.5 360.618q-14.5 14.617-14.5 35.5Q250 417 264.618 431.5q14.617 14.5 35.5 14.5Zm180 180Q501 626 515.5 611.382q14.5-14.617 14.5-35.5Q530 555 515.382 540.5q-14.617-14.5-35.5-14.5Q459 526 444.5 540.618q-14.5 14.617-14.5 35.5Q430 597 444.618 611.5q14.617 14.5 35.5 14.5Zm180 180Q681 806 695.5 791.382q14.5-14.617 14.5-35.5Q710 735 695.382 720.5q-14.617-14.5-35.5-14.5Q639 706 624.5 720.618q-14.5 14.617-14.5 35.5Q610 777 624.618 791.5q14.617 14.5 35.5 14.5Zm0-360Q681 446 695.5 431.382q14.5-14.617 14.5-35.5Q710 375 695.382 360.5q-14.617-14.5-35.5-14.5Q639 346 624.5 360.618q-14.5 14.617-14.5 35.5Q610 417 624.618 431.5q14.617 14.5 35.5 14.5ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
                </button>
            </div>
            <div class="tooltip tooltip-bottom" data-tip="Website info">
                <button class="btn btn-square btn-ghost hover:bg-transparent fill-base-content/75 hover:fill-base-content transition-colors">
                    <svg class="fill-base-content/75 hover:fill-base-content cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M453 776h60V536h-60v240Zm26.982-314q14.018 0 23.518-9.2T513 430q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447 430q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
                </button>
            </div>
        </div>
        <div class="navbar-center">
            <ul class="menu menu-horizontal md:gap-4">
                <li><a href="/projects"   class="bg-transparent hover:text-base-content {$page.url.pathname === '/projects'   ? 'text-accent' : 'text-base-content/75'}">\\ projects</a></li>
                <li><a href="/contact"    class="bg-transparent hover:text-base-content {$page.url.pathname === '/contact'    ? 'text-accent' : 'text-base-content/75'}">\\ contact me</a></li>
            </ul>
        </div>
        <div class="navbar-end gap-4">
            <a href="https://github.com/traveno" target="_blank" class="tooltip tooltip-left" data-tip="Github">
                <svg class="fill-base-content/75 hover:fill-base-content cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
    </div>
</div>


{#if infoMenuVisible}
<div class="z-10 p-4 rounded from-transparent/30 to-transparent/10 bg-gradient-to-b" id="tooltip" style:background-color={$heroBackgroundColor} use:floatingContent transition:fly={{ y: 10, duration: 250 }}>
    <div class="flex flex-col justify-normal">
        <p class="text-2xl text-center">Portfolio Info</p>
        <div class="divider m-0"></div>
        <p>Last updated <span class="p-1 bg-base-100/25 rounded font-mono">April 14, 2023</span></p>
        <div class="divider m-0"></div>
        <p>created using <a href="https://kit.svelte.dev/" target="_blank" class="text-accent">SvelteKit</a> -
            <a href="https://threejs.org/" target="_blank" class="text-accent">three.js</a> -
            <a href="https://vercel.com/" target="_blank" class="text-accent">Vercel</a></p>
    </div>
    <div bind:this={$arrowRef} id="arrow" style:background-color={$heroBackgroundColor} class="from-transparent/30 to-transparent/30 bg-gradient-to-b" />
</div>
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