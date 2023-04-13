<script lang="ts">
    import '../app.css';
    import { Canvas, T, type Position, FogExp2, LightInstance, Three } from '@threlte/core';
    import * as THREE from "three";
    import { World, RigidBody, AutoColliders, Collider, Attractor } from '@threlte/rapier';
    import PageTransition from '$lib/components/PageTransition.svelte';
    import type { LayoutServerData } from './$types';
    import { navigating, page } from '$app/stores';
    import { loadingComplete } from '$lib/stores/data';
    import { fade, scale } from 'svelte/transition';

    export let data: LayoutServerData;

    let sceneCamera: THREE.PerspectiveCamera;
    let attractorPosition: Position = new THREE.Vector3(0, 0, 0);
    
    let backgroundEnabled = true;

    function mouseMoved(event: MouseEvent) {
        if (!backgroundEnabled || !sceneCamera) return;

        let mousePosition3D = new THREE.Vector3(
             (event.clientX / window.innerWidth)  * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );

        mousePosition3D.unproject(sceneCamera);
        let direction = mousePosition3D.sub(sceneCamera.position).normalize();
        let distance = -sceneCamera.position.z / direction.z;
        let position = sceneCamera.position.clone().add(direction.multiplyScalar(distance));

        attractorPosition = position as Position;
    }

    function mouseLeave() {
        if (!backgroundEnabled) return;

        attractorPosition = new THREE.Vector3(0, 0, 0) as Position;
    }

    function randomColor(): string {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++)
            color += letters[Math.floor(Math.random() * 16)];
        return color;
    }
</script>

<main on:mousemove={event => mouseMoved(event)} on:mouseleave={mouseLeave} class="h-full">
    <!-- Main content container -->
    <div class="mx-auto lg:max-w-screen-lg overflow-hidden z-10">
        <div class="flex flex-col justify-start lg:space-y-8 lg:py-16">
            <!-- Navbar -->
            <div class="navbar justify-center items-center lg:bg-base-100/50 lg:rounded-lg lg:backdrop-blur bg-transparent backdrop-blur-0">
                <div class="navbar-start">
                    <button class="hidden md:block btn btn-ghost {backgroundEnabled ? 'text-success' : 'text-warning'}" on:click={() => backgroundEnabled = !backgroundEnabled}>
                        Physics {backgroundEnabled ? 'On' : 'Off'}
                    </button>
                </div>
                <div class="navbar-center">
                    <ul class="menu menu-horizontal px-1">
                        <li><a href="/" class:text-accent={$page.url.pathname === '/'}>about</a></li>
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

    <!-- Loading splash -->
    {#if !$loadingComplete}
    <div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 bg-black" out:fade={{ duration: 500, delay: 250 }}>
        <div class="flex flex-col justify-center items-center h-full">
            <div class="scale-50"><img src="/sf.png" id="initials" alt="my initials" out:scale={{ start: 2, duration: 500 }} /></div>
            <!-- <div class="text-3xl font-bold">Loading</div> -->
        </div>
    </div> 
    {/if}
    

    <!-- Mobile blur -->
    <div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-10 bg-base-100/50 lg:bg-transparent backdrop-blur lg:backdrop-blur-0"></div>

    <!-- Background graphics -->
    <div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-20 bg-black">
        <Canvas>
            <World gravity={{ x: 0, y: 0, z: 0 }}>
                <Attractor position={attractorPosition} strength={backgroundEnabled ? 5 : 0} range={1000} />
                <T.PerspectiveCamera bind:ref={sceneCamera} makeDefault position={[0, 0, 50]} fov={24}>
                </T.PerspectiveCamera>
                <T.DirectionalLight position={[15, 15, 15]} />
                <!-- <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} color={'0xf00'} /> -->
                <!-- <T.PointLight position={[15, 15, 0]} color={'#f00'} intensity={5} /> -->
                <T.AmbientLight intensity={0.5} />

                <Collider shape="ball" args={[7]} position={attractorPosition} />

                <!-- Cube --> 
                <T.Group>
                    {#each Array(32) as _, i}
                    <RigidBody position={{ x: Math.sin(Math.PI * i / 6) * 12, y: Math.cos(Math.PI * i / 6) * 12, z: i * -2 }} scale={3} 
                        linearDamping={3} lockRotations={!backgroundEnabled} lockTranslations={!backgroundEnabled}>
                        <AutoColliders shape="ball" density="1" mass="1" friction="1">
                            <T.Mesh>
                                <T.SphereGeometry />
                                <T.MeshStandardMaterial color={randomColor()} />
                            </T.Mesh>
                        </AutoColliders>
                    </RigidBody>
                    {/each}
                </T.Group>

                
            </World>
            <FogExp2 color={'#000'} density={0.02} />
            <!-- <FogExp2 color={'#f00'} density={0.01} /> -->
        </Canvas>
    </div>
</main>

<style>
    #initials {
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }

    @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>