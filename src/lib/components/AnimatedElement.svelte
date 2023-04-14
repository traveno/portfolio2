<script lang="ts">
    import { inview } from 'svelte-inview';
    import { cubicIn } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    function inViewEvent(event: CustomEvent<ObserverEventDetails>) {
        const { inView, entry, scrollDirection, observer, node } = event.detail;
        isInView = inView;
    }

    let isInView: boolean;
    const options = { rootMargin: '-50px', unobserveOnEnter: true };
</script>

<div
    use:inview={options}
    on:inview_change={event => inViewEvent(event)}
    on:inview_enter={event => inViewEvent(event)}
    on:inview_leave={event => inViewEvent(event)}
>
    {#if isInView}
    <div in:fly={{ y: 25, duration: 500, easing: cubicIn }}>
        <slot />
    </div>
    {/if}
</div>