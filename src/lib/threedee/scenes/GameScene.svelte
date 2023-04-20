<script lang="ts">
    import { Attractor, World } from "@threlte/rapier";
    import GameField from "../game/GameField.svelte";
    import * as THREE from 'three';
    import { T, type Position, FogExp2, useThrelte, Object3DInstance, Three, DirectionalLight, PointLight } from "@threlte/core";
    import { degToRad } from "three/src/math/MathUtils";
    import { theme } from "$lib/stores/data";
    import Marble from "../game/Marble.svelte";
    import { srgbColor } from "$lib/helpers";
    import { attractorPos } from "$lib/stores/gameState";
    import Device from 'svelte-device-info';
    import { GLTF, Text } from "@threlte/extras";
    import MarbleSpawn from "../game/MarbleSpawn.svelte";

    const { size, scene, camera, composer } = useThrelte();

    function mouseMoved(event: MouseEvent) {

        let mousePosition3D = new THREE.Vector3(
             (event.clientX / window.innerWidth)  * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.25
        );

        mousePosition3D.unproject($camera);
        let direction = mousePosition3D.sub($camera.position).normalize();
        let distance = -$camera.position.z / direction.z;
        let position = $camera.position.clone().add(direction.multiplyScalar(distance));
    }

    let plaqueGLTFMats: Record<string, THREE.Material>;
    let keyboardGLTFMats: Record<string, THREE.Material>;
    let purgeGLTFMats: Record<string, THREE.Material>;
    let skirtGLTFMats: Record<string, THREE.Material>; 

    $: if (plaqueGLTFMats) processGLTFMaterials(plaqueGLTFMats, 0.7);
    $: if (keyboardGLTFMats) processGLTFMaterials(keyboardGLTFMats, 0.6);
    $: if (skirtGLTFMats) processGLTFMaterials(skirtGLTFMats, 0.45);

    function processGLTFMaterials(materialRecords: Record<string, THREE.Material>, newEnvMapInt: number) {
        for (const k in materialRecords) {
            const material = materialRecords[k];

            if (material.type === 'MeshStandardMaterial') {
                (material as THREE.MeshStandardMaterial).envMapIntensity = newEnvMapInt;
                (material as THREE.MeshStandardMaterial).fog = false;
            }
        }
    }
</script>

<svelte:body on:mousemove={event => mouseMoved(event)} />

<!-- <Pass pass={fxaaPass} /> -->
<!-- <Pass pass={saoPass} /> -->


<DirectionalLight shadow={true} target={{ x: 0, y: 0, z: 0 }} position={{ x: -3, y: 6, z: 3 }} color={srgbColor('#8f8f8f')} intensity={1} />

<FogExp2 color={new THREE.Color($theme === 'light' ? '#FFFFFF' : '#2A303C').convertLinearToSRGB()} density={0.02} />

<!-- <T.Mesh position={$attractorPosition.toArray()}>
    <T.BoxGeometry args={[1, 1 ,1]} />
    <T.MeshStandardMaterial args={[{ color: srgbColor('#FF0000') }]} />
</T.Mesh> -->

<World gravity={{ x: 0, y: -9.8, z: 0 }}>
    <Attractor position={$attractorPos} range={100} strength={0.2} />


    <!-- <PointLight shadow={true} position={{ x: -9.5, y: -1, z: 3.5 }} color={srgbColor('#ff0000')} intensity={0.1} decay={0} power={1} /> -->
    <MarbleSpawn position={{ x: -9.5, y: -1.5, z: 3.5 }} />

    <Marble position={{ x: 2, y: 0, z: -1 }} gameWidth={innerWidth} gameHeight={innerHeight} />
    <GameField />
</World>

<Text
    text={'STEPHEN\'S'}
    color={srgbColor('#222')}
    position={{ x: 0, y: -0.25, z: 4.05 }}
    rotation={{ x: degToRad(0) }}
    fontSize={Device.isMobile ? 0.65 : 1.25}
    letterSpacing={Device.isMobile ? 0 : 0.08}
    font={'/fonts/Rubik/static/Rubik-Regular.ttf'}
    anchorX={'center'}
    ignorePointer={true}
    material={new THREE.MeshStandardMaterial({ fog: false })}
/>

<Text
    text={'PORTFOLIO'}
    color={srgbColor('#222')}
    position={{ x: 4.05, y: -0.25, z: 0 }}
    rotation={{ y: degToRad(90) }}
    fontSize={Device.isMobile ? 0.65 : 1.25}
    letterSpacing={Device.isMobile ? 0 : 0.08}
    font={'/fonts/Rubik/static/Rubik-Regular.ttf'}
    anchorX={'center'}
    ignorePointer={true}
    material={new THREE.MeshStandardMaterial({ fog: false })}
/>

<GLTF bind:materials={plaqueGLTFMats} receiveShadow castShadow url="/toys/nameplaque.glb" scale={2} rotation={{ y: degToRad(105) }} position={{ x: -10, y: -0.23, z: 2 }} interactive />
<GLTF bind:materials={keyboardGLTFMats} receiveShadow castShadow url="/keyboard.glb" scale={1.5} position={{ x: 0, y: -1.4, z: 10 }} interactive  />

<GLTF bind:materials={skirtGLTFMats} receiveShadow castShadow url="/toys/frontskirt.glb" scale={1} position={{ x: -8, y: -3, z: -15 }} rotation={{ x: degToRad(180)}} interactive  />
<!-- <GLTF bind:materials={purgeGLTFMats} receiveShadow castShadow url="/toys/purgebucket.glb" interactive  /> -->