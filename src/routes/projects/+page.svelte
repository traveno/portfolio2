<script>
    import { goto } from "$app/navigation";
</script>

<svelte:head>
    <title>my projects</title>
</svelte:head>

<div class="flex flex-col justify-start">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-0">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="card bg-base-100/50 backdrop-blur rounded-lg hover:scale-105 transition transform duration-500 cursor-pointer" on:click={() => goto('/projects/osu3d')}>
            <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
            <div class="card-body">
                <h2 class="card-title">osu3d-webapp</h2>
                Management software for the club's members & machines
            </div>
        </div>

        <div class="card bg-base-100/50 backdrop-blur rounded-lg hover:scale-105 transition transform duration-500 cursor-pointer">
            <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
            <div class="card-body">
                <h2 class="card-title">osu3d-webapp</h2>
                Management software for the club's members & machines
            </div>
        </div>

        <div class="card bg-base-100/50 backdrop-blur rounded-lg hover:scale-105 transition transform duration-500 cursor-pointer">
            <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
            <div class="card-body">
                <h2 class="card-title">osu3d-webapp</h2>
                Management software for the club's members & machines
            </div>
        </div>

        <div class="card bg-base-100/50 backdrop-blur rounded-lg hover:scale-105 transition transform duration-500 cursor-pointer">
            <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
            <div class="card-body">
                <h2 class="card-title">osu3d-webapp</h2>
                Management software for the club's members & machines
            </div>
        </div>
    </div>
</div>