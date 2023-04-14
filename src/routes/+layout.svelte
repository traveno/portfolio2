<script lang="ts">
    import '../app.css';
    import PageTransition from '$lib/components/PageTransition.svelte';
    import type { LayoutServerData } from './$types';
    import { page } from '$app/stores';
    import { browser, dev } from '$app/environment';
    
    // Vercel analytics
    import { webVitals } from '$lib/vitals';
    import { inject } from '@vercel/analytics';
    import Navbar from '$lib/components/Navbar.svelte';
    inject({ mode: dev ? 'development' : 'production' });

    export let data: LayoutServerData;

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
    $: if (browser && analyticsId) webVitals({ path: $page.url.pathname, params: $page.params, analyticsId });
</script>

<main class="h-full w-full" id="main-container">
    <!-- Main content container -->
    <div class="h-full w-full z-10">
        <div class="flex flex-col justify-start lg:gap-8 h-full relative">
            <Navbar />
            <!-- Content -->
            <PageTransition pathname={data.pathname}>
                <slot />
            </PageTransition>
        </div>
    </div>
</main>