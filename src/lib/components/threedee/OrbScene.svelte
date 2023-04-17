<script lang="ts">
    import { T, Object3DInstance, useFrame, type Position, InteractiveObject, Group, OrbitControls, Fog } from '@threlte/core';
    import * as THREE from "three";
    import { createNoise3D } from 'simplex-noise';
    import { onMount } from 'svelte';
    import { degToRad } from 'three/src/math/MathUtils';
    import { spring } from 'svelte/motion';
    import { Float, Text } from '@threlte/extras';
    import { enablePhysics, heroBackgroundColor, unleashBalls } from '$lib/stores/data';
    import Device from 'svelte-device-info';
    import { Attractor, AutoColliders, Collider, RigidBody, World } from '@threlte/rapier';
    import { randomHexColor } from '$lib/helpers';
    
    let innerWidth: number;
    let innerHeight: number;

    export let screenPosition = { x: 0, y: 0 };

    // For the orb part of the scene
    const textOpacity = spring(1);

    const sphereScale = spring(0.5);
    let sphere = new THREE.Group();
    sphere.position.set(0, Device.isMobile ? 1.5 : 2.5, -5);
    sphere.scale.set(0.5, 0.5, 0.5);

    let interactGeo = new THREE.SphereGeometry(5);
    let interactObj = new THREE.Mesh(interactGeo, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    // interactObj.position.set(0, Device.isMobile ? 1.5 : 2.5, -5);
    interactObj.position.set(0, 5, 0);
    sphere.add(interactObj);

    let originals: THREE.Vector3[] = [];

    let material = new THREE.LineBasicMaterial({
        // color: $heroBackgroundColor as THREE.ColorRepresentation
        color: new THREE.Color('#0000ff')
    });
    
    const noise3D = createNoise3D(Math.random);

    let linesAmount = 12;
    let radius = 10;
    let verticesAmount = 50;

    // heroBackgroundColor.subscribe(newColor => {material.color = new THREE.Color(newColor as THREE.ColorRepresentation)});

    function createOrb() {
        for (let i = 0; i < linesAmount; i++) {
            const points: THREE.Vector3[] = [];

            for (let j = 0; j < verticesAmount; j++) {
                let vector = new THREE.Vector3(
                    Math.cos((j + 1) / verticesAmount * Math.PI * 2),
                    (i / linesAmount) * radius,
                    Math.sin((j + 1) / verticesAmount * Math.PI * 2)
                ) as THREE.Vector3;

                originals.push(vector.clone());
                points.push(vector);
            }

            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            let line = new THREE.LineLoop(geometry, material);
            sphere.add(line);
        }

        console.log(sphere.children);
    }

    function updateVertices() {
        const t = performance.now() / 1000;

        let lineLoopChildren = sphere.children.filter(c => c.type === 'LineLoop');

        for (let i = 0; i < lineLoopChildren.length; i++) {
            let line = lineLoopChildren[i] as THREE.Line;
            let lineGeometry = line.geometry as THREE.BufferGeometry;
            let lineBufferAttr = lineGeometry.attributes.position as THREE.Float32BufferAttribute;

            for (let j = 0; j < verticesAmount; j++) {
                let vec3 = new THREE.Vector3(
                    lineBufferAttr.getX(j),
                    lineBufferAttr.getY(j),
                    lineBufferAttr.getZ(j)
                ).clone();

                if (vec3.y > radius)
                    vec3.setY(0);

                const originalHeight = vec3.clone().y;
                const radiusHeight = Math.sqrt(vec3.y * (radius - vec3.y));
                const ratio = noise3D(Math.cos((j + 1) / verticesAmount * Math.PI * 2), Math.sin((j + 1) / verticesAmount * Math.PI * 2), t + i) / 5;

                vec3.copy(originals[(i * verticesAmount) + j]);
                vec3.y = originalHeight
                vec3.multiplyScalar(radiusHeight + ratio);

                lineBufferAttr.setXYZ(j, vec3.x, originalHeight, vec3.z);
            }

            line.geometry.translate(0, 0.01, 0);
            lineBufferAttr.needsUpdate = true;
        } 
    }

    let sceneCamera: THREE.PerspectiveCamera;
    
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
        attractorPosition = position as Position;
    }

    function updateScreenPosition() {
        const widthHalf = innerWidth / 2;
        const heightHalf = innerHeight / 2;

        let position = new THREE.Vector3();
        sphere.getWorldPosition(position);
        position.add(new THREE.Vector3(0, (radius / 2) * $sphereScale, 0));
        position.project(sceneCamera);
        position.x =  (position.x * widthHalf)  + widthHalf;
        position.y = -(position.y * heightHalf) + heightHalf;

        screenPosition = { x: position.x, y: position.y };
    }

    useFrame(() => {
        updateVertices();
        updateScreenPosition();

        const t = performance.now() / 1000;
        sphere.position.setX(Math.sin(t * 2) * 2);
        sphere.position.setZ(Math.cos(t * 2) * 2);
    });

    onMount(() => {
        createOrb();
    });

    function newText() {
        taglineIndex += 1;
        if (taglineIndex >= taglines.length) taglineIndex = 0;
    }

    let taglines = [
        'STEPHEN FIKE',
        'WELCOME',
        'TO MY',
        'COMPUTER SCIENCE',
        'PORTFOLIO'
    ];

    let taglineIndex = 0;

    // For the ball part of the scene
    let attractorPosition: Position = new THREE.Vector3(0, 0, 0);
    
    let backgroundEnabled = true;
    $: backgroundEnabled = $enablePhysics;

    function mouseLeave() {
        if (!backgroundEnabled) return;
        attractorPosition = new THREE.Vector3(0, 0, 0) as Position;
    }
</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />
<svelte:body on:mousemove={event => mouseMoved(event)} on:mouseleave={() => mouseLeave()} />

<T.Mesh rotation.x={degToRad(90)} position={[0, 0, -0]} receiveShadow>
    <T.MeshPhongMaterial color={'#FFFFFF'} side={THREE.DoubleSide} />
    <T.PlaneGeometry args={[100, 100]} />
</T.Mesh>

<T.PerspectiveCamera makeDefault bind:ref={sceneCamera} position.z={25} position.y={1.5} fov={35}>
    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={degToRad(85)} />
</T.PerspectiveCamera>

<Object3DInstance object={sphere} scale={$sphereScale}>
    <InteractiveObject interactive object={interactObj} on:pointerenter={() => $sphereScale = 0.6} on:pointerleave={() => $sphereScale = 0.5} />
</Object3DInstance>

<Float floatIntensity={2} floatingRange={[0.25, 0.5]}>
    <!-- <Object3DInstance object={sphere} rotation={{ x: degToRad(25) }} position={{ x: 0, y: Device.isMobile ? 1.5 : 2.5, z: -5 }} scale={0.5} /> -->
    <!-- <T.AmbientLight args={[0xFFFFFF, 0.25]} /> -->
    <T.PointLight args={[undefined, 25, 50, 20]} position={[0, 5, 5]} color={$heroBackgroundColor} shadow.radius={10} castShadow />
    <Text
        interactive
        castShadow
        on:pointerenter={() => $textOpacity = 0.6}
        on:pointerleave={() => $textOpacity = 1}
        on:click={() => newText()}
        text={taglines[taglineIndex]}
        color={0x333333}
        position={{ x: 0, y: 1.7, z: 5 }}
        rotation={{ x: degToRad(-25) }}
        fillOpacity={$textOpacity}
        fontSize={Device.isMobile ? 0.65 : 1.25}
        letterSpacing={Device.isMobile ? 0 : 0.15}
        font={'/fonts/Rubik/static/Rubik-Regular.ttf'}
        anchorX={'center'}
        material={new THREE.MeshStandardMaterial({ color: '#f2f2f2' })}
    />
</Float>

<Fog color={0xFFFFFF} near={15} far={50} />


{#if $unleashBalls}
<World gravity={{ x: 0, y: 0, z: 0 }}>
    <Attractor position={attractorPosition} strength={backgroundEnabled ? 10 : 0} range={1000} />
    <Collider shape="ball" args={[4]} position={attractorPosition} />

    <!-- Cube --> 
    <Group>
        {#each Array(32) as _, i}
        <RigidBody position={{ x: Math.sin(Math.PI * i / 6) * 12, y: Math.cos(Math.PI * i / 6) * 12, z: (i * -2) - 50 }} scale={1} 
            linearDamping={3} lockRotations={!backgroundEnabled} lockTranslations={!backgroundEnabled}>
            <AutoColliders shape="ball" density="1" mass="1" friction="0">
                <T.Mesh>
                    <T.SphereGeometry />
                    <T.MeshStandardMaterial color={randomHexColor()} />
                </T.Mesh>
            </AutoColliders>
        </RigidBody>
        {/each}
    </Group>
</World>
{/if}
