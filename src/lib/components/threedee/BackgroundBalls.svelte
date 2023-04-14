<script lang="ts">
    import { Canvas, T, type Position, FogExp2 } from '@threlte/core';
    import * as THREE from "three";
    import { World, RigidBody, AutoColliders, Collider, Attractor } from '@threlte/rapier';
    import { randomHexColor } from '$lib/helpers';
    import { enablePhysics } from '$lib/stores/data';

    let sceneCamera: THREE.PerspectiveCamera;
    let attractorPosition: Position = new THREE.Vector3(0, 0, 0);
    
    let backgroundEnabled = true;
    $: backgroundEnabled = $enablePhysics;

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
<div class="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-20 bg-black">
    <Canvas>
        <World gravity={{ x: 0, y: 0, z: 0 }}>
            <Attractor position={attractorPosition} strength={backgroundEnabled ? 5 : 0} range={1000} />
            <T.PerspectiveCamera bind:ref={sceneCamera} makeDefault position={[0, 0, 50]} fov={24}>
            </T.PerspectiveCamera>
            <T.DirectionalLight position={[15, 15, 15]} />
            <T.AmbientLight intensity={1} />

            <Collider shape="ball" args={[7]} position={attractorPosition} />

            <!-- Cube --> 
            <T.Group>
                {#each Array(32) as _, i}
                <RigidBody position={{ x: Math.sin(Math.PI * i / 6) * 12, y: Math.cos(Math.PI * i / 6) * 12, z: (i * -2) - 50 }} scale={3} 
                    linearDamping={3} lockRotations={!backgroundEnabled} lockTranslations={!backgroundEnabled}>
                    <AutoColliders shape="ball" density="1" mass="1" friction="1">
                        <T.Mesh>
                            <T.SphereGeometry />
                            <T.MeshStandardMaterial color={randomHexColor()} />
                        </T.Mesh>
                    </AutoColliders>
                </RigidBody>
                {/each}
            </T.Group>
        </World>
        <FogExp2 color={'#000'} density={0.02} />
    </Canvas>
</div>