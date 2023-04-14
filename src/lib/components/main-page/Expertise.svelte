<script lang="ts">
    import { heroBackgroundColor } from "$lib/stores/data";
    import AnimatedElement from "../AnimatedElement.svelte";
</script>

<AnimatedElement>
    <div class="flex flex-col justify-start items-center gap-4 my-16 h-screen">
        <span class="text-5xl md:text-8xl uppercase">Expertise</span>
        <div class="divider mt-0"></div>
        <div class="grid md:grid-cols-2 gap-8 max-w-screen-lg">
            <!-- Web app dev -->
            <div class="p-8 rounded md:hover:scale-105 from-transparent/50 to-transparent/20 bg-gradient-to-bl transition-all" style:background-color={$heroBackgroundColor}>
                <div class="flex flex-col gap-4 z-10">
                    <div class="flex flex-row items-center justify-start gap-4">
                        <div class="z-10"><img class="w-24 h-24" src="/icons/svelte.svg" alt="svelte" /></div>
                        <div class="text-2xl z-10">Web Application Development</div>
                    </div>
                    <div class="text-base-content/75 z-10">
                        Experienced with Angular, SvelteKit and React. Tons of experience using TypeScript and JavaScript.
                    </div>
                </div>
            </div>
    
            <!-- Deployment tech -->
            <div class="p-8 rounded md:hover:scale-105 from-transparent/50 to-transparent/20 bg-gradient-to-bl transition-all" style:background-color={$heroBackgroundColor}>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-row items-center justify-start gap-4">
                        <div><img class="w-24 h-24" src="/icons/firebase.svg" alt="firebase" /></div>
                        <div><p class="text-2xl">Backend Deployment</p></div>
                    </div>
                    <div class="text-base-content/75">
                        Launched production ready applications on platforms such as AWS, Firebase, Supabase, Vercel.
                        Experienced with self-hosting and maintaining local services.
                    </div>
                </div>
            </div>
    
            <!-- Back end -->
            <div class="p-8 rounded md:hover:scale-105 from-transparent/50 to-transparent/20 bg-gradient-to-bl transition-all" style:background-color={$heroBackgroundColor}>
    
                <div class="flex flex-col gap-4">
                    <div class="flex flex-row items-center justify-start gap-4">
                        <div><img class="w-24 h-24" src="/icons/threejs.svg" alt="svelte" /></div>
                        <div><p class="text-2xl">3D Technologies</p></div>
                    </div>
                    <div class="text-base-content/75">
                        Familiar with CAD softwares and modeling programs. Expert at implementing new 3D
                        solutions with libraries such as <span class="font-mono">three.js</span>.
                    </div>
                </div>
            </div>
    
            <!-- Back end -->
            <div class="p-8 rounded md:hover:scale-105 from-transparent/50 to-transparent/20 bg-gradient-to-bl transition-all" style:background-color={$heroBackgroundColor}>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-row items-center justify-start gap-4">
                        <div><img class="w-24 h-24" src="/icons/svelte.svg" alt="svelte" /></div>
                        <div><p class="text-2xl">Web Application Development</p></div>
                    </div>
                    <div class="text-base-content/75">
                        Experienced with Angular, SvelteKit, React.
                    </div>
                </div>
            </div>
        </div>
    </div>
</AnimatedElement>