<script lang="ts">
    import { heroBackgroundColor } from "$lib/stores/data";
    import confetti from 'canvas-confetti';

    let emailAddress: string = 'fikes@oregonstate.edu';

    $: console.log(emailAddress)

    function copyEmailAddress() {
        let range = document.createRange();
        range.selectNode(document.getElementById('email')!);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        document.execCommand('copy');
        window.getSelection()?.removeAllRanges();

       confetti();
    }
</script>

<svelte:head>
    <title>Stephen Fike -- Software Engineer</title>
</svelte:head>

<div class="flex flex-col bg-base-100">
    <!-- Hero -->
    <div class="flex flex-row justify-center items-start md:items-center h-screen">
        <div class="stack shadow-2xl shadow-base-100 mt-40 md:mt-0">
            <!-- Card -->
            <div class="p-8 rounded-lg border-2 border-base-content from-transparent/50 to-transparent/20 bg-gradient-to-bl max-w-screen-2xl h-72" style:background-color={$heroBackgroundColor}>
                <div class="flex flex-col gap-4 justify-center h-full">
                    <div class="flex flex-row justify-center items-center gap-4">
                        <img class="w-24 -scale-x-100" src="/icons/redphone.png" alt="red phone" />
                        <p class="text-3xl">Stephen's Business Card</p>
                    </div>
                    <div class="flex flex-col gap-4 justify-center h-full">
                        <div>
                            You can find me on <a class="link-accent font-mono" href="https://github.com/traveno/" target="_blank">GitHub</a>
                        </div>
                        <div>
                            I'm also reachable via my university email
                            <div class="inline-flex flex-row items-center border-base-content border-1 border rounded bg-neutral ml-2">
                                <span class="font-mono px-2" id="email">{emailAddress}</span>
                                <button class="btn btn-square btn-sm btn-ghost" on:click={() => copyEmailAddress()}>
                                    <svg class="fill-base-content" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Card -->
            <div class="p-8 rounded-lg border-2 border-base-content from-transparent/50 to-transparent/20 bg-gradient-to-bl max-w-screen-2xl h-72" style:background-color={$heroBackgroundColor}>
            </div>
            <!-- Card -->
            <div class="p-8 rounded-lg border-2 border-base-content from-transparent/50 to-transparent/20 bg-gradient-to-bl max-w-screen-2xl h-72" style:background-color={$heroBackgroundColor}>
            </div>
            <!-- Card -->
            <div class="p-8 rounded-lg border-2 border-base-content from-transparent/50 to-transparent/20 bg-gradient-to-bl max-w-screen-2xl h-72" style:background-color={$heroBackgroundColor}>
            </div>
        </div>
    </div>
</div>


