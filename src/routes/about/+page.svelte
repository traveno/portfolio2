<script>
    import Demo3D from "$lib/components/threedee/demos/Demo3D.svelte";
    import { loadingComplete } from "$lib/stores/data";
</script>

<svelte:head>
    <title>about me</title>
</svelte:head>

<div class="flex flex-col justify-start max-w-screen-lg mx-auto pt-40 md:pt-28">
    <div class="divider hidden lg:flex"></div>
    <article class="prose w-full max-w-full">
        <h1 class="text-center">Hey, I'm Stephen!</h1>
    </article>

    <div class="flex flex-col space-y-8 px-8">
        <article class="prose">
            <h2 class="italic">my interests</h2>
            <ul>
                <li>Artificial Intelligence</li>
                <li>3D technologies (CAD, rendering, WebGL)</li>
                <li>Web development</li>
            </ul>
        </article>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                
            </div>
            <div>
                
            </div>
        </div>
    </div>
</div>