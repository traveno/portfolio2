<script lang="ts">
    import { page } from "$app/stores";
    import { randomHexColor } from "$lib/helpers";
    import { heroBackgroundColor, theme } from "$lib/stores/data";
    import PopoverToggle from "./PopoverToggle.svelte";
    import Popover from "./Popover.svelte";
    import { onMount } from "svelte";
    import { themeChange } from 'theme-change';
    import ThemeSwitch from "./ThemeSwitch.svelte";

    onMount(() => {
        themeChange(false);
    });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="navbar px-8 py-4 {$page.url.pathname === '/' ? 'bg-transparent' : 'bg-base-300'} transition-colors">
    <div class="navbar-start">
        <div class="dropdown">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/"           class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/'           ? 'text-primary' : 'text-base-content/75'}">\\home</a></li>
                <li><a href="/cool-stuff" class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/cool-stuff' ? 'text-primary' : 'text-base-content/75'}">\\ cool stuff</a></li>
                <li><a href="/about"      class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/about'      ? 'text-primary' : 'text-base-content/75'}">\\ about</a></li>
                <li><a href="/projects"   class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/projects'   ? 'text-primary' : 'text-base-content/75'}">\\ projects</a></li>
                <li><a href="/contact"    class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/contact'    ? 'text-primary' : 'text-base-content/75'}">\\ contact me</a></li>
            </ul>
        </div>

        <!-- Fun button -->
        <Popover tooltipClasses="bg-warning text-warning-content" on:click={() => $heroBackgroundColor = randomHexColor()}>
            <div slot="activator" class="hidden md:inline-flex btn btn-square btn-ghost hover:bg-transparent">
                <span class="icon-[ion--dice-outline] w-8 h-8 text-base-content/75 hover:text-warning transition-colors"></span>
            </div>

            <span slot="tooltip">Roll The Dice</span>
        </Popover>

        <!-- App information popover -->
        <PopoverToggle>
            <!-- Activator -->
            <div slot="activator" class="hidden md:inline-flex btn btn-square btn-ghost hover:bg-transparent">
                <span class="icon-[tabler--info-square-rounded] w-8 h-8 text-base-content/75 hover:text-info transition-colors"></span>
            </div>

            <!-- Tooltip -->
            <span slot="tooltip" class="text-info-content">Info</span>

            <!-- Content -->
            <div slot="content" class="flex flex-col justify-normal text-info-content">
                <a href="https://github.com/traveno/portfolio2" target="_blank">
                    <div class="flex flex-row justify-center items-center w-full space-x-1">
                        <p class="text-2xl font-mono">portfolio2</p>
                        <span class="icon-[mdi--github] w-8 h-8"></span>
                    </div>
                </a>
                <p class="text-sm italic text-center">the successor to my last portfolio</p>

                <div class="divider before:bg-black/10 after:bg-black/10 m-0"></div>

                <div class="flex flex-row justify-between items-center w-full">
                    <p>Version date</p>
                    <span class="p-1 px-2 bg-info-content/25 rounded font-mono">April 20, 2023</span>
                </div>
                
                <div class="divider before:bg-black/10 after:bg-black/10 m-0"></div>

                <p>
                    Created using 
                    <a href="https://kit.svelte.dev/" target="_blank" class="link-warning">SvelteKit</a> -
                    <a href="https://threejs.org/" target="_blank" class="link-warning">three.js</a> -
                    <a href="https://vercel.com/" target="_blank" class="link-warning">Vercel</a>
                </p>
            </div>
        </PopoverToggle>

        <!-- Fun button -->
        <Popover tooltipClasses="bg-success text-success-content">
            <div slot="activator" class="hidden md:inline-flex btn btn-square btn-ghost hover:bg-transparent">
                <span class="icon-[bx--party] w-8 h-8 text-base-content/75 hover:text-success transition-colors"></span>
            </div>

            <span slot="tooltip">Party Mode</span>
            <span slot="tooltip-disabled">Must be on the home page to party</span>
        </Popover>

        <Popover tooltipClasses="bg-info text-info-content">
            <div slot="activator" class="hidden md:inline-flex btn btn-square btn-ghost hover:bg-transparent">
                <ThemeSwitch />
            </div>

            <span slot="tooltip">Toggle {$theme === 'light' ? 'Dark' : 'Light'} Theme</span>
        </Popover>

        
    </div>
    <div class="navbar-center hidden lg:flex text-base-content/50 text-lg">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/"           class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/'           ? 'text-primary underline underline-offset-8' : ''}">//home</a></li>
            <li><a href="/cool-stuff" class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/cool-stuff' ? 'text-primary underline underline-offset-8' : ''}">//cool_stuff</a></li>
            <li><a href="/about"      class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/about'      ? 'text-primary underline underline-offset-8' : ''}">//about</a></li>
            <li><a href="/projects"   class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/projects'   ? 'text-primary underline underline-offset-8' : ''}">//projects</a></li>
            <li><a href="/contact"    class="bg-transparent hover:text-base-content font-mono {$page.url.pathname === '/contact'    ? 'text-primary underline underline-offset-8' : ''}">//contact_me</a></li>
        </ul>
    </div>
    <div class="navbar-end gap-3">
        <a href="https://github.com/traveno2" target="_blank" class="tooltip tooltip-bottom" data-tip="Linkedin">
            <span class="icon-[bxl--linkedin] w-8 h-8 text-base-content/75 hover:text-base-content cursor-pointer transition-colors"></span>
        </a>
        <a href="https://github.com/traveno" target="_blank" class="tooltip tooltip-bottom" data-tip="GitHub">
            <span class="icon-[mdi--github] w-8 h-8 text-base-content/75 hover:text-base-content cursor-pointer transition-colors"></span>
        </a>
    </div>
</div>
