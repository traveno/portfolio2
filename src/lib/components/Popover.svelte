<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { createFloatingActions, arrow } from 'svelte-floating-ui';
    import { flip, offset, shift } from "svelte-floating-ui/dom";
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";

    const dispatch = createEventDispatcher();

    let visible = false;
    let activator: HTMLElement;
    const arrowRef = writable<HTMLElement>();

    export let tooltipClasses: string = 'bg-info';
    export let disabled: boolean = false;

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
            if ($arrowRef === undefined || $arrowRef === null) return;
            Object.assign($arrowRef.style, {
                left: x != null ? `${x}px` : '',
                top: y != null ? `${y}px` : '',
                right: '',
                bottom: '',
                [staticSide!]: '-4px'
            });

        }
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={activator} on:mouseenter={() => visible = true} on:mouseleave={() => visible = false} on:click={() => disabled ? null : dispatch('click')} use:floatingRef
    class="{disabled ? 'opacity-50' : 'opacity-100'}"    
>
    <slot name="activator">
        <span class="btn"></span>
    </slot>
</div>

{#if visible}
<div 
    class="z-10 rounded from-transparent/30 to-transparent/10 bg-gradient-to-b transition-transform px-2 py-1 {tooltipClasses}" 
    id="tooltip" 
    use:floatingContent 
    transition:fly={{ y: 10, duration: 250 }}
>
    {#if disabled}
    <slot name="tooltip-disabled" />
    {:else}
    <slot name="tooltip" />
    {/if}
    
    <div bind:this={$arrowRef} id="arrow" class="from-transparent/30 to-transparent/30 bg-gradient-to-b {tooltipClasses}" />
</div> 
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