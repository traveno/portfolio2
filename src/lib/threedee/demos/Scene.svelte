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
    } from '@threlte/core'
    import { spring, tweened } from 'svelte/motion';
    import { cubicOut, linear } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { delay } from '$lib/helpers';
    
    const { scene } = useThrelte();

    scene.background = new THREE.Color( 0x005599 );
    let gridHelper = new THREE.GridHelper(100, 50, 0x555555, 0x222222);
    scene.add(gridHelper);

    onMount(() => {
    });

    /**
    * @param {any} index
    */
    export async function setDemoStage(index: number) {
        switch (index) {
            case 1:
                $spotlightScale = 1;
                break;
            case 2:
                torusVisibility1 = true;
                $torusScale1 = 0.1;
                break;
            case 3:
                torusVisibility2 = true;
                $torusScale2 = 0.2;
                break;
            case 4:
                $spotlightScale = 0.3;
                break;
            case 5:
                isGroupRotating = true;
                $groupRotationSpeed = 0.01;
                break;
            case 6:
                scene.remove(gridHelper);
                break;
            case 7:
                $cylinderScale = 1;
                cylinderVisibility = true;
                spotlightVisibility = false;
                break;
            case 8:
                $cylinderScale = 0.001;
                await delay(3000);
                cylinderVisibility = false;
                spotlightVisibility = true;
                await delay(1000);
                $spotlightScale = 0.001;
                await delay(500);
                spotlightVisibility = false;
                tubeVisibility = true;
                $spotlightScale = 0.3
                await delay(1000);
                $cylinderScale = -1;
                $tubeScale = 1;
                break;
            default:
                break;
        }
    }

    

    let spotlightVisibility = true;
    const spotlightScale = spring(0.001);

    let cylinderVisibility = false;
    const cylinderScale = tweened(0.001, { duration: 1500, easing: linear });

    let tubeVisibility = false;
    const tubeScale = tweened(0.001, { duration: 1500, easing: linear });

    let torusVisibility1 = false;
    let torusVisibility2 = false;
    const torusScale1 = spring(0.001);
    const torusScale2 = spring(0.001);

    let isGroupRotating = false;

    let torusRotation = 0;
    let groupRotation = 0;

    const groupRotationSpeed = tweened(0, {duration: 3000, easing: cubicOut} );

    const cameraZoom = spring(35);
    export let cameraZoomScale = 0.5;

    useFrame(() => {
        torusRotation += 0.03;

        if (isGroupRotating)
            groupRotation += $groupRotationSpeed;

        if (tubeVisibility && $cylinderScale === 1)
            $cylinderScale = -1;
        else if (tubeVisibility && $cylinderScale === -1)
            $cylinderScale = 1;
    });

    /**
    * @param {number} zoomLevel
    */
    export function setCameraZoom(zoomLevel: number) {
        $cameraZoom = zoomLevel;
    }

    var arcShape = new THREE.Shape();
    arcShape.moveTo(10 * 2, 10);
    arcShape.absarc(10, 10, 10, 0, Math.PI * 2, false);
    var holePath = new THREE.Path();
    holePath.moveTo(10 + 9, 10);
    holePath.absarc(10, 10, 9, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);

    let tubeGeometry = new THREE.ExtrudeGeometry(arcShape, {
        // amount: 6,
        bevelEnabled: false,
        steps: 1,
        curveSegments: 72
    });
    
    tubeGeometry.center();
    tubeGeometry.rotateX(Math.PI * -.5);
</script>

<OrthographicCamera position={{ x: 25, y: 25, z: 25 }}  lookAt={{ x: 0, y: 0, z: 0 }} zoom={$cameraZoom * cameraZoomScale} near={5} far={500}>
</OrthographicCamera>

<DirectionalLight shadow position={{ x: 3, y: 5, z: 0 }} target={{ x: 0, y: 0, z: 0 }}/>
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.5} />
<AmbientLight intensity={0.2} />

<Group rotation={{ x: groupRotation, z: groupRotation }}>
    <!-- Floor -->
    <Mesh
    receiveShadow
    rotation={{ x: -90 * (Math.PI / 180) }}
    geometry={new THREE.CircleGeometry(10, 72)}
    material={new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 0x7a6e00 })}
    position={new THREE.Vector3(0, -0.001, 0)}
    visible={spotlightVisibility}
    scale={$spotlightScale}
    />

    <Mesh
    geometry={new THREE.TorusGeometry(12, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x995599 })}
    scale={$torusScale1}
    position={{ x: 0, y: 3 + ($cylinderScale * 3), z: 0 }}
    visible={torusVisibility1}
    rotation={{ y: torusRotation }}
    castShadow
    />

    <Mesh
    geometry={new THREE.TorusGeometry(10, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x005599 })}
    scale={$torusScale2}
    position={{ x: 0, y: 3 + ($cylinderScale * 3), z: 0 }}
    visible={torusVisibility2}
    rotation={{ x: torusRotation }}
    castShadow
    />

    <Mesh
    geometry={new THREE.TorusGeometry(12, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x995599 })}
    scale={0.1}
    position={{ x: 0, y: -3 - ($cylinderScale * 3), z: 0 }}
    visible={torusVisibility1}
    rotation={{ y: torusRotation }}
    castShadow
    />

    <Mesh
    geometry={new THREE.TorusGeometry(10, 2, 16, 25)}
    material={new THREE.MeshStandardMaterial({ color: 0x005599 })}
    scale={0.2}
    position={{ x: 0, y: -3 - ($cylinderScale * 3), z: 0 }}
    visible={torusVisibility2}
    rotation={{ x: torusRotation }}
    castShadow
    />

    <!-- Cylinder -->
    <Mesh
    geometry={new THREE.CylinderGeometry(10, 10, 6, 72)}
    material={new THREE.MeshStandardMaterial({ color: 0x7a6e00 })}
    scale={{ x: $spotlightScale, y: $cylinderScale, z: $spotlightScale }}
    position={new THREE.Vector3(0, 0, 0)}
    visible={cylinderVisibility}
    castShadow
    />

    <!-- Tube -->
    <Mesh
    geometry={tubeGeometry}
    material={new THREE.MeshStandardMaterial({color: 0x7a6e00 })}
    scale={{ x: $spotlightScale, y: $tubeScale, z: $spotlightScale }}
    position={new THREE.Vector3(0, 0, 0)}
    visible={tubeVisibility}
    castShadow
    />
</Group>