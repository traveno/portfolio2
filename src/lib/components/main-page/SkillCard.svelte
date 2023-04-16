<div class="relative p-8 md:rounded md:hover:scale-105 from-transparent/40 to-transparent/20 bg-gradient-to-bl transition-all bg-info">
    <div class="absolute w-full h-full top-0 left-0 pattern-dots pattern-blue-600 pattern-bg-transparent pattern-size-4 pattern-opacity-20"></div>
    <div class="flex flex-col justify-stretch h-full gap-4">
            <div class="flex flex-row items-center justify-between gap-4 z-10 text-info-content">
                <div><p class="text-2xl"><slot name="title" /></p></div>
                <div>
                    <slot name="icons" />
                </div>
            </div>
        <div class="text-info-content border-l-2 border-base-content pl-4 py-2 z-10 flex-1">
            <slot name="content" />
        </div>
    </div>
</div>