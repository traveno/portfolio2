<script lang="ts">
    import { useGltfAnimations, GLTF, Text } from "@threlte/extras";
    import * as THREE from 'three';
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    const loaded = () => dispatch('load');

    export async function beginTyping(text: string) {
        return new Promise<void>((resolve) => {
            if ($actions)
                console.log($actions);

            let index = 0;
            let ignoreModifier = false;

            const advance = () => {
                console.log('advance')
                if (index === text.length)
                    resolve();
                
                if (ignoreModifier) {
                    ignoreModifier = false;
                    return;
                }
                let char = text.slice(index, index + 1);
                setTimeout(() => {
                    if (index < text.length) {
                        if ('<>!(){}"#:\''.includes(char)) ignoreModifier = true;
                        pressCharacter(text.slice(index, index + 1));
                        index++;
                        typeTextCut = text.slice(0, index) + '_';
                    }
                }, Math.random() * (text.slice(index, index + 1) === ' ' ? 250 : 25));
            }
        
            if (!$mixer?.hasEventListener('finished', advance))
                    $mixer?.addEventListener('finished', advance);

            advance();
        });
    }

    const { gltf, actions, mixer } = useGltfAnimations(({ actions, mixer }) => {
        mixer.timeScale = 3;
    });

    function pressCharacter(char: string) {
        switch (char.toUpperCase()) {
            case ' ':
                triggerAnimation('Spacebar.PressAction');
                break;
            case '<':
                triggerAnimation(',.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '>':
                triggerAnimation('..PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '(':
                triggerAnimation('9.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case ')':
                triggerAnimation('0.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '{':
                triggerAnimation('LBracket.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '}':
                triggerAnimation('RBracket.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '!':
                triggerAnimation('1.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case ':':
                triggerAnimation(';.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '=':
                triggerAnimation('Plus.PressAction');
                break;
            case '\'':
            case '"':
                triggerAnimation('Quote.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '#':
                triggerAnimation('3.PressAction');
                triggerAnimation('LShift.PressAction');
                break;
            case '\n':
                triggerAnimation('Enter.PressAction');
                break;
            case '\t':
                triggerAnimation('Tab.PressAction');
                break;
            default:
                triggerAnimation(`${char.toUpperCase()}.PressAction`);
                break;
        }
    }

    const triggerAnimation = (animName: string) => {
        $actions[animName]?.setLoop(THREE.LoopOnce, 1);
        $actions[animName]?.reset();
        $actions[animName]?.play();
    }

    let typeTextCut = '';

    function gltfLoaded() {
        // Emit loaded event, since all we need to load is the gltf
        loaded();
    }

    let position = new THREE.Vector3(0, 0, 0);
</script>
    
<GLTF 
    url={'/keyboard.glb'}
    bind:gltf={$gltf} 
    position={new THREE.Vector3(0, 1, 0)} 
    on:load={gltfLoaded}
/>

<Text 
    text={typeTextCut} 
    scale={6} 
    position={new THREE.Vector3(0, 3.5, -2)}
    color={new THREE.Color('white')}
    outlineColor={new THREE.Color('black')} 
    outlineWidth={0.01}
    anchorX={'center'}
    font={'/CascadiaCode.ttf'}
/>