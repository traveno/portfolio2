<script lang="ts">
    import { srgbColor } from '$lib/helpers';
    import { theme } from '$lib/stores/data';
    import { attractorPosition } from '$lib/stores/gameState';
    import { T, useThrelte, Mesh, MeshInstance, type ThreltePointerEvent, Object3DInstance } from '@threlte/core';
    import { Edges, useCursor } from '@threlte/extras';
    import { AutoColliders, RigidBody } from '@threlte/rapier';
    import { onMount } from 'svelte';
    import * as THREE from "three";

    interface TileData {
        mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>,
        lines: THREE.LineSegments
    }

    const { scene } = useThrelte();

    let tiles: TileData[][] = [];

    const boxGeometry = new THREE.BoxGeometry(1, 2, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: srgbColor('#636363'), fog: false, envMapIntensity: 0.5 });

    const gridHelper = new THREE.GridHelper(
        100, 
        100, 
        srgbColor('#888888'),
        srgbColor('#888888')
    );

    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    $: (gridHelper.material as THREE.LineBasicMaterial).opacity = $theme === 'light' ? 0.6 : 0.2;
    gridHelper.position.setY(-2);

    scene.add(gridHelper);

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

<T.Group position={[-4, 0, -4]}>
{#each tiles as tileRow}
{#each tileRow as tileData}
    <AutoColliders shape="cuboid">
        <MeshInstance 
            mesh={tileData.mesh} 
            interactive 
            receiveShadow
            on:click={(event) => $attractorPosition = event.detail.point}
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


