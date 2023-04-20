<script lang="ts">
    import { theme } from "$lib/stores/data";
import type { DialogueSequence } from "$lib/stores/dialogue";
    import type { ScreenCoords } from "$lib/stores/gameState";
    import { createFloatingActions } from "svelte-floating-ui";
    import { offset, type ClientRectObject, type VirtualElement, shift } from "svelte-floating-ui/dom";
    import { cubicInOut } from "svelte/easing";
    import { writable, type Writable } from "svelte/store";
    import { fly } from "svelte/transition";

    let yOffset = 0;

    let showChatBubble = false;
    let currentMessage = '';

    let screenPosition: ScreenCoords = { x: 0, y: 0 };

    // Floating UI
    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: 'absolute',
        placement: 'top-end',
        middleware: [
            offset({ mainAxis: 65, crossAxis: -55 }),
            shift()
        ],
        autoUpdate: true
    });

    $: getBoundingClientRect = (): ClientRectObject => {
        return {
            x: screenPosition.x,
            y: screenPosition.y,
            top: screenPosition.y - yOffset,
            left: screenPosition.x,
            bottom: screenPosition.y + yOffset,
            right: screenPosition.x,
            width: 0,
            height: 0
        }
    }
    
    const virtualElement = writable<VirtualElement>({ getBoundingClientRect });
    $: virtualElement.set({ getBoundingClientRect });
    floatingRef(virtualElement);

    export async function startDialogueSequence(position: Writable<ScreenCoords>, dialogue: DialogueSequence[], callback: () => void) {
        let unsubscribe = position.subscribe(newPos => {
            screenPosition = newPos;
        });

        for (let message of dialogue) {
            currentMessage = message.message;

            if (currentMessage !== '')
                showChatBubble = true;

            await sleep(message.duration);
            showChatBubble = false;
            currentMessage = '';
            await sleep(250);
        }

        unsubscribe();
        showChatBubble = false;
        callback();
    }

    function sleep(ms: number) {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }
</script>

<svelte:window bind:scrollY={yOffset} />

{#if showChatBubble}
<div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
    <div class="absolute w-96" use:floatingContent transition:fly={{ y: 25, duration: 250, easing: cubicInOut}}>
        <div class="chat chat-end">
            <div class="chat-header text-xl {$theme === 'light' ? 'text-gray-800' : 'text-white'}">Mr. Marble</div>
            <div class="chat-bubble chat-bubble-primary shadow-xl text-xl">
                {currentMessage}
            </div>
        </div>
    </div>
</div>
{/if}