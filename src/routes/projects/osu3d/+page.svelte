<script>
    import Demo3D from "$lib/components/Demo3D.svelte";

</script>
<svelte:head>
    <title>my projects</title>
</svelte:head>

<div class="flex flex-col justify-start items-start lg:bg-base-100/50 lg:p-8 lg:rounded-lg lg:backdrop-blur space-y-8 lg:pt-8">
    <article class="prose place-self-center">
        <h1>osu3d-webapp</h1>
    </article>
    <div class="divider"></div>
    <div class="carousel w-full lg:rounded-lg">
        <div id="img1" class="carousel-item w-full">
            <img src="/project-photos/osu3d/screen1.png" alt="screen 1" class="w-full" />
        </div>

        <div id="img2" class="carousel-item w-full">
            <img src="/project-photos/osu3d/screen2.png" alt="screen 2" class="w-full" /> 
        </div>

        <div id="img3" class="carousel-item w-full">
            <img src="/project-photos/osu3d/screen3.png" alt="screen 3" class="w-full" /> 
        </div>
    </div>
    
    <div class="flex justify-center w-full py-2 gap-4">
        <a href="#img1" class="btn btn-info">1</a>
        <a href="#img2" class="btn btn-info">2</a>
        <a href="#img3" class="btn btn-info">3</a>
    </div>
</div>

