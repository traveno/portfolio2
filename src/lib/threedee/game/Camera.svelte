<script lang="ts">
    import { OrbitControls, OrthographicCamera, useFrame, useThrelte } from "@threlte/core";
    import * as TWEEN from '@tweenjs/tween.js';
    import type * as THREE from 'three';
    import { cameraFocus } from "$lib/stores/gameState";

    const { size, scene } = useThrelte();

    let camera: THREE.OrthographicCamera;

    $: if (camera) camera.position.set(position.x, position.y, position.z);
    let position = { x: 20, y: 15, z: 20, zoom: 75 };

    $: if ($cameraFocus && $cameraFocus !== null) {
        const tween = new TWEEN.Tween(position)
            .to({ x: $cameraFocus.position.x, z: $cameraFocus.position.z, zoom: $cameraFocus.zoomLevel }, 250)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                camera.position.set(position.x, position.y, position.z);
                camera.zoom = position.zoom;
                camera.updateProjectionMatrix();
            })
            .start();
    }

    animate();

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
    }
</script>

<OrthographicCamera 
    bind:camera
    left={$size.width / -2}
    right={$size.width / 2}
    top={$size.height / 2}
    bottom={$size.height / -2}
    position={{ x: position.x, y: position.y, z: position.z }}
    zoom={position.zoom}
    near={0.005}
    far={1000}
    lookAt={{ x: 0, y: 2, z: 0 }}
>
    <OrbitControls enabled={false} enableZoom={true} enableRotate={true} target={{ x: 0, y: 0, z: 0 }} />
</OrthographicCamera>