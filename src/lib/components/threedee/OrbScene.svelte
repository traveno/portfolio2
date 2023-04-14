<script lang="ts">
    import { T, Object3DInstance, useFrame, InteractiveObject } from '@threlte/core';
    import * as THREE from "three";
    import { createNoise3D } from 'simplex-noise';
    import { onMount } from 'svelte';
    import { degToRad } from 'three/src/math/MathUtils';
    import { spring } from 'svelte/motion';
    import { Float, Text } from '@threlte/extras';
    import { heroBackgroundColor } from '$lib/stores/data';

    let sphere = new THREE.Group();
    sphere.position.set(0, -3.5, 0);

    let originals: THREE.Vector3[] = [];

    let material = new THREE.LineBasicMaterial({
        color: $heroBackgroundColor as THREE.ColorRepresentation
    });

    heroBackgroundColor.subscribe(newColor => {material.color = new THREE.Color(newColor as THREE.ColorRepresentation)});

    const noise3D = createNoise3D(Math.random);

    let linesAmount = 12;
    let radius = 10;
    let verticesAmount = 50;

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
    }

    function testVertices(frameCount: number) {
        const t = performance.now() / 1000;

        for (let i = 0; i < sphere.children.length; i++) {
            let line = sphere.children[i] as THREE.Line;
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
            0.5
        );

        mousePosition3D.unproject(sceneCamera);
        let direction = mousePosition3D.sub(sceneCamera.position).normalize();
        let distance = -sceneCamera.position.z / direction.z;
        let position = sceneCamera.position.clone().add(direction.multiplyScalar(distance)).normalize();
    }

    let frameCount = 0;

    const textSpacing = spring(1);

    useFrame((ctx, delta) => {
        testVertices(frameCount++);
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
        'TO MY PORTFOLIO'
    ];

    let taglineIndex = 0;
</script>

<!-- <svelte:body on:mousemove={event => mouseMoved(event)} /> -->

<T.Mesh rotation.x={degToRad(90)} position={[0, 0, -0]} receiveShadow>
    <T.MeshPhongMaterial color={'#222'} side={THREE.DoubleSide} />
    <T.PlaneGeometry args={[50, 50]} />
</T.Mesh>

<T.PerspectiveCamera makeDefault bind:ref={sceneCamera} position.z={25} position.y={1.5} fov={35}>
</T.PerspectiveCamera>

<Float floatIntensity={2} floatingRange={[0.5, 0.2]}>
    <Object3DInstance object={sphere} rotation={{ x: degToRad(25) }} position={{ x: 0, y: 2.5, z: -5 }} scale={0.5} />
    <T.PointLight args={[undefined, 15, 50, 20]} position={[0, 5, 5]} color={$heroBackgroundColor} shadow.radius={25} castShadow />
    <Text
        interactive 
        on:pointerenter={() => $textSpacing = 0.5}
        on:pointerleave={() => $textSpacing = 1}
        on:click={() => newText()}
        text={taglines[taglineIndex]}
        position={{ x: 0, y: 1.7, z: 5 }}
        rotation={{ x: degToRad(-25) }}
        fillOpacity={$textSpacing}
        fontSize={1.25}
        letterSpacing={0.15}
        font={'/fonts/Rubik/static/Rubik-Regular.ttf'}
        anchorX={'center'}
        material={new THREE.MeshStandardMaterial({ color: '#f2f2f2' })}
    />
</Float>

