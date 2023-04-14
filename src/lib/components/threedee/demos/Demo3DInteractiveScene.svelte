<script lang="ts">
import * as THREE from 'three';
import {
    AmbientLight,
    DirectionalLight,
    OrthographicCamera,
    useThrelte,
    useFrame,
    Mesh,
    Group,
    Canvas,
} from '@threlte/core'
import { spring, tweened } from 'svelte/motion';
import { cubicOut, linear } from 'svelte/easing';
import { onMount } from 'svelte';

    const { scene } = useThrelte();

    scene.background = new THREE.Color( 0x005599 );
    let gridHelper = new THREE.GridHelper(100, 50, 0x555555, 0x222222);
    scene.add(gridHelper);

    onMount(() => {
    });

    let spotlightVisibility = true;
    const spotlightScale = spring(0.001);

    let torusVisibility1 = true;
    let torusVisibility2 = true;
    const torusScale1 = spring(0.001);
    const torusScale2 = spring(0.001);

    let torusRotation = 0;
    let groupRotation = 0;

    export let animationSpeed: number;

    const groupRotationSpeed = tweened(0, {duration: 3000, easing: cubicOut} );

    export let cameraZoom = 0;

    export let cylinderLength = 0.01;

    // On frame update
    useFrame(() => {
        torusRotation += 0.03 * animationSpeed;

        groupRotation += 0.01 * animationSpeed;
    });
</script>

<OrthographicCamera position={{ x: 25, y: 31, z: 25 }}  lookAt={{ x: 0, y: 6, z: 0 }} zoom={35 + (15 * cameraZoom)} near={5} far={500} >
</OrthographicCamera>

<DirectionalLight shadow position={{ x: 0, y: 10, z: 0 }} target={{ x: 0, y: 0, z: 0 }}/>
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.5} />
<AmbientLight intensity={0.2} />

<Group rotation={{ x: groupRotation, z: groupRotation }} position={{ y: 6 }} >
        <!-- Floor -->
    <Mesh
    on:pointerenter={() => spotlightVisibility = false}
    geometry={new THREE.CylinderGeometry(12, 12, 1, 72)}
    material={new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 0x7a6e00 })}
    position={new THREE.Vector3(0, -0.001, 0)}
    visible={spotlightVisibility}
    scale={{ x: 0.3, y: cylinderLength * 5, z: 0.3 }}
    />

    <Mesh
    geometry={new THREE.TorusGeometry(12, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x995599 })}
    scale={0.1}
    position={{ x: 0, y: 3 + (cylinderLength * 2.5), z: 0 }}
    visible={torusVisibility1}
    rotation={{ y: torusRotation }}
    castShadow
    />

    <Mesh
    geometry={new THREE.TorusGeometry(10, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x005599 })}
    scale={0.2}
    position={{ x: 0, y: 3 + (cylinderLength * 2.5), z: 0 }}
    visible={torusVisibility2}
    rotation={{ x: torusRotation }}
    castShadow
    />

    <Mesh
    geometry={new THREE.TorusGeometry(12, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x995599 })}
    scale={0.1}
    position={{ x: 0, y: -3 - (cylinderLength * 2.5), z: 0 }}
    visible={torusVisibility1}
    rotation={{ y: torusRotation }}
    castShadow
    />

    <Mesh
    geometry={new THREE.TorusGeometry(10, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x005599 })}
    scale={0.2}
    position={{ x: 0, y: -3 - (cylinderLength * 2.5), z: 0 }}
    visible={torusVisibility2}
    rotation={{ x: torusRotation }}
    castShadow
    />
</Group>
<!-- <FogExp2 color={0x000000} density={0.03} /> -->