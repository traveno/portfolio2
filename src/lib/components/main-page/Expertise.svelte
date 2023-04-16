<script lang="ts">
    import AnimatedElement from "../AnimatedElement.svelte";
    import SkillCard from "./SkillCard.svelte";
</script>

<AnimatedElement>
    <div class="flex flex-col justify-start items-center gap-4 py-28">
        <span class="text-5xl md:text-7xl text-base-content">My Skillset</span>

        <div class="divider mt-0"></div>
        
        <div class="grid lg:grid-cols-2 gap-2 md:gap-8 max-w-screen-lg">
            <!-- Web app dev -->
            <SkillCard>
                <span slot="title">Web Application Development</span>
                <span slot="content">
                    Experienced with Angular, SvelteKit and React. Tons of experience using TypeScript and JavaScript.
                </span>
                <div slot="icons" class="flex flex-row gap-2">
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[mdi--angular] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[carbon--logo-svelte] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[mdi--language-typescript] h-full w-full text-neutral-content"></span>
                    </div>
                </div>
            </SkillCard>
    
            <!-- Deployment Tech -->
            <SkillCard>
                <span slot="title">Backend Deployment</span>
                <span slot="content">
                    Launched production ready applications on platforms such as AWS, Firebase, Supabase, Vercel.
                    Experienced with self-hosting and maintaining local services.
                </span>
                <div slot="icons" class="flex flex-row gap-2">
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[bxl--aws] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[mdi--firebase] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[simple-icons--supabase] h-full w-full text-neutral-content"></span>
                    </div>
                </div>
            </SkillCard>
            
            <!-- 3D Tech -->
            <SkillCard>
                <span slot="title">3D Technologies</span>
                <span slot="content">
                    Familiar with CAD softwares and modeling programs. Knowledgeable in implementing interactive 3D
                    solutions with web-enabled libraries such as <span class="font-mono">three.js</span>.
                </span>
                <div slot="icons" class="flex flex-row gap-2">
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[simple-icons--webgl] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[tabler--brand-threejs] h-full w-full text-neutral-content"></span>
                    </div>
                </div>
            </SkillCard>
    
            <!-- VPS & Linux -->
            <SkillCard>
                <span slot="title">Linux, VPSs & Virtual Machines</span>
                <span slot="content">Years of experience experience tinkering with and maintaining Linux machines (at home and in the cloud).</span>
                <div slot="icons" class="flex flex-row gap-2">
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[simple-icons--digitalocean] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[simple-icons--vultr] h-full w-full text-neutral-content"></span>
                    </div>
                    <div class="p-3 rounded-full bg-neutral shadow w-12 h-12">
                        <span class="icon-[simple-icons--linux] h-full w-full text-neutral-content"></span>
                    </div>
                </div>
            </SkillCard>
        </div>
    </div>
</AnimatedElement>