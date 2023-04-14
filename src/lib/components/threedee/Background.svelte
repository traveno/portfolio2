<script lang="ts">
    import { Canvas, T, type Position, Object3D, Object3DInstance, MeshInstance, OrbitControls } from '@threlte/core';
    import * as THREE from "three";
    import { randomHexColor } from '$lib/helpers';
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
    import { degToRad } from 'three/src/math/MathUtils';
    import { Fog } from "@threlte/core";

    const objLoader = new OBJLoader();
    let loadingDone = false;

    objLoader.load('/fike.io.obj', (group) => {
        object.copy(group);
        object.position.set(-20, -3, -10);
        object.rotateY(degToRad(15));
        object.rotateX(degToRad(25));

        const material = new THREE.MeshPhongMaterial({
            color: 0x6B7280,
            reflectivity: 10
        });

        object.traverse((obj) => {
            if (obj.type === 'Mesh') {
                (obj as THREE.Mesh).material = material;
            }
        });

        console.log('fikeObj', object);
        loadingDone = true;
    });

    let object: THREE.Object3D = new THREE.Group();

    let sceneCamera: THREE.PerspectiveCamera;
    let attractorPosition: Position = new THREE.Vector3(0, 0, 0);
    
    let backgroundEnabled = true;

    function mouseMoved(event: MouseEvent) {
        if (!backgroundEnabled || !sceneCamera) return;

        let mousePosition3D = new THREE.Vector3(
             (event.clientX / window.innerWidth)  * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
        );

        mousePosition3D.unproject(sceneCamera);
        let direction = mousePosition3D.sub(sceneCamera.position).normalize();
        let distance = -sceneCamera.position.z / direction.z;
        let position = sceneCamera.position.clone().add(direction.multiplyScalar(distance));

        attractorPosition = position as Position;
    }

    function mouseLeave() {
        if (!backgroundEnabled) return;
        attractorPosition = new THREE.Vector3(0, 0, 0) as Position;
    }
</script>

<svelte:body on:mousemove={event => mouseMoved(event)} on:mouseleave={mouseLeave} />

<!-- Background graphics -->
<div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 z-30 bg-black">
    <Canvas rendererParameters={{ alpha: true }}>
        {#if loadingDone}
        <T.PerspectiveCamera makeDefault position={[-20, 15, 50]} fov={50}>
        </T.PerspectiveCamera>
        <T.DirectionalLight position={[15, 15, 15]} />
        <T.AmbientLight intensity={1} />
        <Object3DInstance bind:object>
        </Object3DInstance>
        {/if}
        <Fog color={0x000000} near={5} far={100}  />
    </Canvas>
</div>
