<script lang="ts">
  import { fly, scale, fade } from "svelte/transition";
  export let pathname = '';
  const pageTransitionDuration = 500;
</script>
  
{#key pathname}
    <div  in:fade={{ duration: pageTransitionDuration, delay: pageTransitionDuration }}
        out:fade={{ duration: pageTransitionDuration }}
    >
        <slot />
    </div>
{/key}