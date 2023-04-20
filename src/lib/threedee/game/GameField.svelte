<script lang="ts">
    import { srgbColor } from '$lib/helpers';
    import { theme } from '$lib/stores/data';
    import { attractorPos } from '$lib/stores/gameState';
    import { T, useThrelte, MeshInstance, type ThreltePointerEvent, Object3DInstance, SpotLight } from '@threlte/core';
    import { ContactShadows, Edges, useCursor } from '@threlte/extras';
    import { AutoColliders, RigidBody } from '@threlte/rapier';
    import { onMount } from 'svelte';
    import * as THREE from "three";
    import { degToRad } from 'three/src/math/MathUtils';

    interface TileData {
        mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>,
        lines: THREE.LineSegments
    }

    const { scene } = useThrelte();

    let tiles: TileData[][] = [];

    const boxGeometry = new THREE.BoxGeometry(1, 2, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: $theme === 'light' ? srgbColor('#636363') : srgbColor('#232323'),
        fog: false, envMapIntensity: 0.5,
        roughness: 10
    });

    $: boxMaterial.color = $theme === 'light' ? srgbColor('#636363') : srgbColor('#232323');

    const gridHelper = new THREE.GridHelper(
        100, 
        100, 
        srgbColor('#888888'),
        srgbColor('#888888')
    );

    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    $: (gridHelper.material as THREE.LineBasicMaterial).opacity = $theme === 'light' ? 1 : 0.2;
    gridHelper.position.setY(-2);

    onMount(() => {
        for (let i = 0; i < 8; i++) {
            tiles[i] = [];
            for (let j = 0; j < 8; j++) {
                const mesh = new THREE.Mesh(boxGeometry, boxMaterial);

                const edges = new THREE.EdgesGeometry(boxGeometry);
                const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: srgbColor('#000000'), fog: false }));

                lines.visible = false;

                mesh.position.set(i * 1 + 0.5, -1, j * 1 + 0.5);
                lines.position.set(i * 1 + 0.5, -1, j * 1 + 0.5);
                tiles[i][j] = { mesh, lines };
            }
        }
    });

    function onTilePointerEnter(event: CustomEvent<ThreltePointerEvent>, tileData: TileData) {
        tileData.lines.visible = true;
    }
    
    function onTilePointerLeave(event: CustomEvent<ThreltePointerEvent>, tileData: TileData) {
        tileData.lines.visible = false;
    }

    const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default');
</script>

<T.Mesh rotation.x={degToRad(-90)} position.y={-2} castShadow receiveShadow>
    <T.PlaneGeometry args={[100, 100]} />
    <!-- <T.MeshStandardMaterial args={[{ color: 0xFF0000 }]} /> -->
    <T.ShadowMaterial />
</T.Mesh>

<Object3DInstance object={gridHelper} />

<T.Group position={[-4, 0, -4]}>
{#each tiles as tileRow}
{#each tileRow as tileData}
    <AutoColliders shape="cuboid" position={[0, -5, 0]}>
        <MeshInstance 
            mesh={tileData.mesh} 
            interactive={false} 
            receiveShadow
            on:click={(event) => $attractorPos = event.detail.point}
            on:pointerenter={event => onTilePointerEnter(event, tileData)}
            on:pointerleave={event => onTilePointerLeave(event, tileData)}
            on:pointerenter={onPointerEnter}
            on:pointerleave={onPointerLeave}
        ></MeshInstance>

        <Object3DInstance
            object={tileData.lines} />
    </AutoColliders>
{/each}
{/each}
</T.Group>

<SpotLight position={{ x: -3, y: 3, z: 5 }} target={{ x: 0, y: 0, z: 0 }} color={srgbColor('#FF0000')} intensity={1} />
<SpotLight position={{ x: 5, y: 3, z: -3 }} target={{ x: 0, y: 0, z: 0 }} color={srgbColor('#0000FF')} intensity={1} />