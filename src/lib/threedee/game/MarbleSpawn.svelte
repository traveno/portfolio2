<script lang="ts">
    import { srgbColor } from "$lib/helpers";
    import { heroBackgroundColor } from "$lib/stores/data";
    import { Object3DInstance, T, useFrame } from "@threlte/core";
    import { createNoise3D } from "simplex-noise";
    import { onMount } from "svelte";
    import * as THREE from 'three';

    let sphere = new THREE.Group();

    let interactGeo = new THREE.SphereGeometry(0.6);
    let interactObj = new THREE.Mesh(interactGeo, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    interactObj.position.set(0, 0.5, 0);
    sphere.add(interactObj);

    let originals: THREE.Vector3[] = [];

    let material = new THREE.LineBasicMaterial({
        fog: false,
        transparent: true,

    });

    $: material.color = srgbColor($heroBackgroundColor); 
    
    const noise3D = createNoise3D(Math.random);

    let linesAmount = 12;
    let radius = 1.1;
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
            line.translateY(-0.05);
            sphere.add(line);
        }
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
                const ratio = noise3D(Math.cos((j + 1) / verticesAmount * Math.PI * 2), Math.sin((j + 1) / verticesAmount * Math.PI * 2), t + i) / 20;

                vec3.copy(originals[(i * verticesAmount) + j]);
                vec3.y = originalHeight;
                vec3.multiplyScalar(radiusHeight + ratio);

                lineBufferAttr.setXYZ(j, vec3.x, originalHeight, vec3.z);
            }

            line.geometry.translate(0, 0.002, 0);
            lineBufferAttr.needsUpdate = true;
        } 
    }

    useFrame(() => {
        updateVertices();
    });

    onMount(() => {
        createOrb();
    });
</script>

<Object3DInstance object={sphere}>
    <T.PointLight args={[srgbColor($heroBackgroundColor), 50, 20, 15]} position={[0, 5, 0]} />
    <!-- <InteractiveObject interactive object={interactObj} /> -->
</Object3DInstance>