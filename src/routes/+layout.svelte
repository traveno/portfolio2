<script lang="ts">
    import '../app.css';
    import PageTransition from '$lib/components/PageTransition.svelte';
    import type { LayoutServerData } from './$types';
    import { page } from '$app/stores';
    import { browser, dev } from '$app/environment';
    
    // Vercel analytics
    import { webVitals } from '$lib/vitals';
    import { inject } from '@vercel/analytics';
    import { enablePhysics } from '$lib/stores/data';
    import OrbScene from '$lib/components/threedee/OrbScene.svelte';
    import { Canvas } from '@threlte/core';
    inject({ mode: dev ? 'development' : 'production' });

    export let data: LayoutServerData;

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
    $: if (browser && analyticsId) webVitals({ path: $page.url.pathname, params: $page.params, analyticsId });
</script>

<main class="h-full">
    <!-- Main content container -->
    <div class="mx-auto lg:max-w-screen-lg z-10">
        <div class="flex flex-col justify-start lg:gap-8 lg:py-16">
            <!-- Navbar -->
            <div class="navbar justify-center items-center lg:bg-base-100/50 lg:rounded-lg lg:backdrop-blur bg-transparent backdrop-blur-0">
                <div class="navbar-start">
                    <button class="hidden md:block btn btn-ghost {$enablePhysics ? 'text-success' : 'text-warning'}" on:click={() => enablePhysics.update(old => !old)}>
                        Physics {$enablePhysics ? 'On' : 'Off'}
                    </button>
                </div>
                <div class="navbar-center">
                    <ul class="menu menu-horizontal px-1">
                        <li><a href="/" class:text-accent={$page.url.pathname === '/'}>home</a></li>
                        <li><a href="/about" class:text-accent={$page.url.pathname === '/about'}>about</a></li>
                        <li><a href="/projects" class:text-accent={$page.url.pathname === '/projects'}>projects</a></li>
                        <li><a href="/contact" class:text-accent={$page.url.pathname === '/contact'}>contact</a></li>
                    </ul>
                </div>
                <div class="navbar-end">
                    <a href="https://github.com/traveno" target="_blank" class="tooltip" data-tip="Github">
                        <svg class="fill-base-content cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                </div>
            </div>
            <!-- Content -->
            <PageTransition pathname={data.pathname}>
                <slot />

                <!-- Footer -->
                <div class="flex flex-row justify-between p-8 lg:pß-0">
                    <div class="text-sm italic">last updated April 13, 2023</div>
                    <div class="text-sm italic">
                        created using <a href="https://kit.svelte.dev/" target="_blank" class="text-accent">SvelteKit</a>,
                        <a href="https://threejs.org/" target="_blank" class="text-accent">three.js</a>,
                        <a href="https://vercel.com/" target="_blank" class="text-accent">vercel</a>
                    </div>
                </div>
            </PageTransition>
        </div>
    </div>

    <!-- Mobile blur -->
    <div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-10 bg-base-100/50 lg:bg-transparent backdrop-blur lg:backdrop-blur-0"></div>

    <!-- Background graphics -->
    <!-- <BackgroundBalls /> -->
    
    <!-- <Background /> -->

    <!-- Background graphics -->
    <div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-10 bg-black">
        <Canvas>
            <!-- <T.DirectionalLight position={[15, 15, 15]} />
            <T.AmbientLight intensity={1} /> -->
            <OrbScene />
        </Canvas>
    </div>

</main>

