<script lang="ts">
    import { Attractor, World } from "@threlte/rapier";
    import GameField from "../game/GameField.svelte";
    import * as THREE from 'three';
    import { T, type Position, OrbitControls, FogExp2 } from "@threlte/core";
    import { degToRad } from "three/src/math/MathUtils";
    import { theme } from "$lib/stores/data";
    import Marble from "../game/Marble.svelte";
    import { srgbColor } from "$lib/helpers";
    import { attractorPosition } from "$lib/stores/gameState";

    let innerWidth: number;
    let innerHeight: number;
    let sceneCamera: THREE.OrthographicCamera;

    function mouseMoved(event: MouseEvent) {
        if (!sceneCamera) return;

        let mousePosition3D = new THREE.Vector3(
             (event.clientX / window.innerWidth)  * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.25
        );

        mousePosition3D.unproject(sceneCamera);
        let direction = mousePosition3D.sub(sceneCamera.position).normalize();
        let distance = -sceneCamera.position.z / direction.z;
        let position = sceneCamera.position.clone().add(direction.multiplyScalar(distance));
    }
</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />
<svelte:body on:mousemove={event => mouseMoved(event)} />

<T.OrthographicCamera makeDefault bind:ref={sceneCamera} position={[25, 20, 25]} args={[-5, 5, 5, -5, 1, 100]} zoom={75} >
    <OrbitControls enabled={false} enableZoom={false} enableRotate={true} maxPolarAngle={degToRad(70)} target={{ x: 0, y: 0, z: 0 }} />
</T.OrthographicCamera>

<!-- <T.AmbientLight args={[new THREE.Color($theme === 'light' ? '#FFFFFF' : '#2A303C').convertLinearToSRGB(), 1]} /> -->
<T.DirectionalLight args={[srgbColor('#fdff75'), 1]} position={[10, 10, 5]} castShadow />

<FogExp2 color={new THREE.Color($theme === 'light' ? '#FFFFFF' : '#2A303C').convertLinearToSRGB()} density={0.02}  />

<!-- <T.Mesh position={$attractorPosition.toArray()}>
    <T.BoxGeometry args={[1, 1 ,1]} />
    <T.MeshStandardMaterial args={[{ color: srgbColor('#FF0000') }]} />
</T.Mesh> -->

<World gravity={{ x: 0, y: -9.8, z: 0 }}>
    <Attractor position={$attractorPosition} range={100} strength={0.01} />

    <!-- <MarbleSpawn /> -->

    <Marble gameWidth={innerWidth} gameHeight={innerHeight} />
    <GameField />
</World>

