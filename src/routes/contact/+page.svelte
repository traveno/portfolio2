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
    <title>Stephen -- Software Engineer</title>
</svelte:head>

<div class="w-screen h-screen bg-base-100">
    <div class="flex flex-col h-screen justify-center items-center">
        <div class="stack shadow-2xl shadow-base-100">
            <!-- Card -->
            <div class="basis-1/3 p-8 rounded-lg bg-info text-info-content border-2 border-info-content from-transparent/30 to-transparent/10 bg-gradient-to-bl h-72">
                <div class="flex flex-col gap-4 justify-between h-full">
    
                    <!-- Card header -->
                    <div class="flex flex-row justify-around items-center gap-4">
                        <img class="w-32 -scale-x-100" src="/icons/redphone.png" alt="red phone" />
                        <div>
                            <p class="text-3xl">Stephen's Business Card</p>
                            <p class="italic">Take one, don't be shy!</p>
                        </div>
                    </div>
    
                    <!-- Card body -->
                    <div class="flex flex-col gap-4 justify-end">
                        <div>
                            You can find me on <a class="link-accent font-mono" href="https://github.com/traveno/" target="_blank">GitHub</a>
                        </div>
                        <div class="text-info-content">
                            I'm also reachable via my university email
                            <div class="inline-flex flex-row items-center border-neutral-content border-1 border rounded bg-neutral text-neutral-content ml-2">
                                <span class="font-mono px-2" id="email">{emailAddress}</span>
                                <button class="btn btn-square btn-sm btn-ghost" on:click={() => copyEmailAddress()}>
                                    <svg class="fill-neutral-content" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <!-- Card -->
            <div class="p-8 rounded-lg bg-info text-info-content border-2 border-info-content from-transparent/30 to-transparent/10 bg-gradient-to-bl h-72" style:background-color={$heroBackgroundColor}>
            </div>
            <!-- Card -->
            <div class="p-8 rounded-lg bg-info text-info-content border-2 border-info-content from-transparent/30 to-transparent/10 bg-gradient-to-bl h-72" style:background-color={$heroBackgroundColor}>
            </div>
        </div>
        <div class="basis-2/3"></div>
    </div>
</div>

