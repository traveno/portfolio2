<script lang="ts">
    import { heroBackgroundColor, unleashBalls } from "$lib/stores/data";
    import { createFloatingActions, arrow } from 'svelte-floating-ui';
    import { flip, offset, shift } from "svelte-floating-ui/dom";
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";
    import OutClick from 'svelte-outclick';

    let visible = false;
    let expanded = false;
    let activator: HTMLElement;
    const arrowRef = writable<HTMLElement>();

    const [ floatingRef, floatingContent, update ] = createFloatingActions({
        strategy: 'absolute',
        placement: 'bottom',
        middleware: [
            offset({ mainAxis: 5 }),
            shift({ padding: 25 }),
            flip(),
            arrow({
                element: arrowRef
            })
        ],
        onComputed({ placement, middlewareData }) {
            const x = middlewareData.arrow!['x'];
            const y = middlewareData.arrow!['y'];
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
            }[placement.split('-')[0]];

            Object.assign($arrowRef.style, {
                left: x != null ? `${x}px` : '',
                top: y != null ? `${y}px` : '',
                right: '',
                bottom: '',
                [staticSide!]: '-4px'
            });

        }
    });

    function onActivatorClick(event: MouseEvent) {
        expanded = !expanded;
    }

    function onOutsideClick(event: CustomEvent) {
        expanded = false;
        visible = false;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={activator} on:click={onActivatorClick} on:mouseenter={() => visible = true} on:mouseleave={() => visible = false} use:floatingRef>
    <slot name="activator">
        <span class="btn"></span>
    </slot>
</div>

{#if visible || expanded}
<OutClick excludeElements={[activator]} on:outclick={onOutsideClick}>
    <div 
        class="z-10 rounded bg-info from-transparent/30 to-transparent/10 bg-gradient-to-b transition-transform {expanded ? 'p-4' : 'px-2 py-1'}" 
        id="tooltip" 
        use:floatingContent 
        transition:fly={{ y: 10, duration: 250 }}
    >
        {#if expanded}
        <slot name="content" />
        {:else}
        <slot name="tooltip" />
        {/if}
        <div bind:this={$arrowRef} id="arrow" class="from-transparent/30 to-transparent/30 bg-gradient-to-b bg-info" />
    </div> 
</OutClick>
{/if}

<style>
    #arrow {
        position: absolute;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
    }

    #tooltip {
        position: absolute;
    }
</style>