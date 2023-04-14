<script lang="ts">
    import { T, Object3DInstance, useFrame } from '@threlte/core';
    import * as THREE from "three";
    import { createNoise3D } from 'simplex-noise';
    import { onMount } from 'svelte';
    import { degToRad } from 'three/src/math/MathUtils';

    let sphere = new THREE.Group();
    sphere.position.set(0, -3.5, 0);

    let originals: THREE.Vector3[] = [];

    let material = new THREE.LineBasicMaterial({
        color: '#b00000'
    });

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

    useFrame((ctx, delta) => {
        // updateVertices(delta);
        testVertices(frameCount++);
    });

    onMount(() => {
        createOrb();
    });
</script>

<!-- <svelte:body on:mousemove={event => mouseMoved(event)} /> -->

<T.Mesh rotation.x={degToRad(90)} position={[0, 0, -0]}>
    <T.MeshPhongMaterial color={'#222'} side={THREE.DoubleSide} />
    <T.PlaneGeometry args={[50, 50]} />
</T.Mesh>

<T.PointLight args={['#f44', 15, 50, 20]} position={[0, 5, 5]} castShadows />


<T.PerspectiveCamera makeDefault bind:ref={sceneCamera} position.z={25} position.y={1.5} fov={35}>
</T.PerspectiveCamera>
<Object3DInstance bind:object={sphere} rotation={{ x: degToRad(25) }} position={{ x: 0, y: 1, z: -5 }} scale={0.5} />