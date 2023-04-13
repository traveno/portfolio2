<script>
    import Demo3D from "$lib/components/Demo3D.svelte";
    import { loadingComplete } from "$lib/stores/data";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
</script>
<svelte:head>
    <title>about me</title>
</svelte:head>

<div class="flex flex-col justify-start lg:bg-base-100/50 lg:p-8 lg:rounded-lg lg:backdrop-blur space-y-8 pt-8">
    <Demo3D on:loaded={() => loadingComplete.set(true)} />
    <div class="divider"></div>
    <article class="prose w-full max-w-full">
        <h1 class="text-center">Hey, I'm Stephen!</h1>
    </article>

    <div class="flex flex-col space-y-8">
        <article class="prose">
            <h2 class="italic">my interests</h2>
            <ul>
                <li>Artificial Intelligence</li>
                <li>3D technologies (CAD, rendering, WebGL)</li>
                <li>Web development</li>
            </ul>
        </article>

        <div class="grid grid-cols-2 gap-8">
            <div>
                <article class="prose">
                    <h2 class="italic">current employment</h2>
                    <h3>Machine Research (Jan 2022 - Present)</h3>
                    <p>Bringing AI powered quoting to a web-based environment.</p>
                    <p><a href="https://www.machineresearch.com/" target="_blank" class="text-accent">website</a></p>
                </article>
            </div>
            <div>
                <article class="prose">
                    <h2 class="italic">education</h2>
                    <h3>Oregon State University</h3>
                    <p>Studying Computer Science, focus is Artificial Intelligence. Junior standing, graduating June 2024.</p>
                </article>
            </div>
            <div>
                <article class="prose">
                    <h2 class="italic">my experience</h2>
                    <ul>
                        <li>TypeScript / JavaScript</li>
                        <li>Angular</li>
                        <li>SvelteKit</li>
                        <li>Electron</li>
                        <li>GraphQL / PostgreSQL</li>
                        <li>Web 3D technologies (three.js)</li>
                        <li>Cloud application development / deployment</li>
                        <li>AWS</li>
                        <li>Supabase</li>
                        <li>Firebase</li>
                    </ul>
                </article>
            </div>
            <div>
                <article class="prose">
                    <h2 class="italic">non web-technology experience</h2>
                    <ul>
                        <li>C++ / C</li>
                        <li>Python</li>
                        <li>Android development</li>
                    </ul>
                </article>
            </div>
        </div>
    </div>
</div>