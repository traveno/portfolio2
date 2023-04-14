<script>
    import { goto } from "$app/navigation";
    import { heroBackgroundColor } from "$lib/stores/data";
</script>

<svelte:head>
    <title>my projects</title>
</svelte:head>

<div class="w-full h-full bg-base-100">
    <div class="flex flex-col justify-start items-center gap-4 max-w-screen-lg mx-auto py-40 md:py-28">
        <span class="text-5xl md:text-6xl uppercase">Projects</span>
        <div class="divider mt-0"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-0">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="card rounded-lg hover:scale-105 transform duration-500 cursor-pointer from-transparent/50 to-transparent/20 bg-gradient-to-bl transition-all"
                style:background-color={$heroBackgroundColor}
                on:click={() => goto('/projects/osu3d')}>
                <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
                <div class="card-body">
                    <h2 class="card-title">osu3d-webapp</h2>
                    Management software for the club's members & machines
                </div>
            </div>
    
            <div class="card rounded-lg from-transparent/50 to-transparent/20 bg-gradient-to-bl blur duration-500 transition-colors" style:background-color={$heroBackgroundColor}>
                <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
                <div class="card-body">
                    <h2 class="card-title">osu3d-webapp</h2>
                    Management software for the club's members & machines
                </div>
            </div>
    
            <div class="card rounded-lg from-transparent/50 to-transparent/20 bg-gradient-to-bl blur duration-500 transition-colors" style:background-color={$heroBackgroundColor}>
                <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
                <div class="card-body">
                    <h2 class="card-title">osu3d-webapp</h2>
                    Management software for the club's members & machines
                </div>
            </div>
    
            <div class="card rounded-lg from-transparent/50 to-transparent/20 bg-gradient-to-bl blur duration-500 transition-colors" style:background-color={$heroBackgroundColor}>
                <figure><img src="/project-photos/osu3d/card.png" alt="osu3d app" class="pointer-events-none select-none" /></figure>
                <div class="card-body">
                    <h2 class="card-title">osu3d-webapp</h2>
                    Management software for the club's members & machines
                </div>
            </div>
        </div>
    </div>
</div>