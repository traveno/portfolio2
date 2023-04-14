<script lang="ts">
    import { T } from '@threlte/core';
    import * as THREE from "three";
    import { degToRad } from 'three/src/math/MathUtils';
    import { heroBackgroundColor } from '$lib/stores/data';

    let sceneCamera: THREE.PerspectiveCamera;
</script>

<T.Mesh rotation.x={degToRad(90)} position={[0, 0, -0]} receiveShadow>
    <T.MeshPhongMaterial color={'#222'} side={THREE.DoubleSide} />
    <T.PlaneGeometry args={[50, 50]} />
</T.Mesh>

<T.PointLight args={[undefined, 15, 50, 20]} position={[0, 5, 5]} color={$heroBackgroundColor} shadow.radius={25} castShadow />

<T.PerspectiveCamera makeDefault bind:ref={sceneCamera} position.z={25} position.y={1.5} fov={35}>
</T.PerspectiveCamera>