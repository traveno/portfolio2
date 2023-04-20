<script lang="ts">
    import { srgbColor } from '$lib/helpers';
    import { heroBackgroundColor } from '$lib/stores/data';
    import { cameraFocus, marbleScreenPos } from '$lib/stores/gameState';
    import { MeshInstance, useFrame, useTexture, useThrelte } from '@threlte/core';
    import { useCursor } from '@threlte/extras';
    import { AutoColliders, RigidBody } from '@threlte/rapier';
    import * as THREE from 'three';

    export let position = { x: 0, y: 0, z: 0 };

    export let gameWidth: number;
    export let gameHeight: number;

    const { camera: sceneCamera } = useThrelte();

    let heightMap = useTexture('/textures/marble/heightmap.png');
    let displacementMap = useTexture('/textures/marble/displacementmap.jpeg')
    displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
    heightMap.minFilter = displacementMap.minFilter = THREE.NearestFilter;

    const uniforms = {
        iterations: { value: 40 },
        depth: { value: 0.15 },
        smoothing: { value: 0.3 },
        colorA: { value: srgbColor('#000000') },
        colorB: { value: srgbColor('#d719c7') },
        heightMap: { value: heightMap },
        displacementMap: { value: displacementMap },
        displacement: { value: 0.05 },
        time: { value: 0 }
    }

    $: uniforms.colorB.value = srgbColor($heroBackgroundColor);

    const marbleMaterial = new THREE.MeshStandardMaterial({ roughness: 0.15, fog: false, envMapIntensity: 0.5 });

    marbleMaterial.onBeforeCompile = shader => {
      // Wire up local uniform references
      shader.uniforms = {...shader.uniforms, ...uniforms }
      
      // Add to top of vertex shader
      shader.vertexShader = `
        varying vec3 v_pos;
        varying vec3 v_dir;
      ` + shader.vertexShader
      
      // Assign values to varyings inside of main()
      shader.vertexShader = shader.vertexShader.replace(/void main\(\) {/, (match) => match + `
        v_dir = position - cameraPosition; // Points from camera to vertex
        v_pos = position;
      `);
      
      // Add to top of fragment shader
      shader.fragmentShader = `
      	#define FLIP vec2(1., -1.)
        
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform sampler2D heightMap;
        uniform sampler2D displacementMap;
        uniform int iterations;
        uniform float depth;
        uniform float smoothing;
        uniform float displacement;
        uniform float time;
        
        varying vec3 v_pos;
        varying vec3 v_dir;
      ` + shader.fragmentShader
      
      // Add above fragment shader main() so we can access common.glsl.js
      shader.fragmentShader = shader.fragmentShader.replace(/void main\(\) {/, (match) => `
       	/**
         * @param p - Point to displace
         * @param strength - How much the map can displace the point
         * @returns Point with scrolling displacement applied
         */
        vec3 displacePoint(vec3 p, float strength) {
        	vec2 uv = equirectUv(normalize(p));
          vec2 scroll = vec2(time, 0.);
          vec3 displacementA = texture(displacementMap, uv + scroll).rgb; // Upright
					vec3 displacementB = texture(displacementMap, uv * FLIP - scroll).rgb; // Upside down
          
          // Center the range to [-0.5, 0.5], note the range of their sum is [-1, 1]
          displacementA -= 0.5;
          displacementB -= 0.5;
          
          return p + strength * (displacementA + displacementB);
        }
        
				/**
          * @param rayOrigin - Point on sphere
          * @param rayDir - Normalized ray direction
          * @returns Diffuse RGB color
          */
        vec3 marchMarble(vec3 rayOrigin, vec3 rayDir) {
          float perIteration = 1. / float(iterations);
          vec3 deltaRay = rayDir * perIteration * depth;

          // Start at point of intersection and accumulate volume
          vec3 p = rayOrigin;
          float totalVolume = 0.;

          for (int i=0; i<iterations; ++i) {
            // Read heightmap from spherical direction of displaced ray position
            vec3 displaced = displacePoint(p, displacement);
            vec2 uv = equirectUv(normalize(displaced));
            float heightMapVal = texture(heightMap, uv).r;

            // Take a slice of the heightmap
            float height = length(p); // 1 at surface, 0 at core, assuming radius = 1
            float cutoff = 1. - float(i) * perIteration;
            float slice = smoothstep(cutoff, cutoff + smoothing, heightMapVal);

            // Accumulate the volume and advance the ray forward one step
            totalVolume += slice * perIteration * 3.;
            p += deltaRay;
          }
          return mix(colorA, colorB, clamp(totalVolume, 0., 1.));
        }
      ` + match)
      
    	shader.fragmentShader = shader.fragmentShader.replace(/vec4 diffuseColor.*;/, `
      	vec3 rayDir = normalize(v_dir);
        vec3 rayOrigin = v_pos;
        
        vec3 rgb = marchMarble(rayOrigin, rayDir);
				vec4 diffuseColor = vec4(rgb, 1.);      
      `)
    }

    const marble = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 64, 32),
        marbleMaterial
    );

    marble.position.setY(0.5);

    function updateScreenPosition() {
        const widthHalf = gameWidth / 2;
        const heightHalf = gameHeight / 2;

        let position = new THREE.Vector3();
        marble.getWorldPosition(position);
        position.add(new THREE.Vector3(0, 0, 0));
        position.project($sceneCamera);
        position.x =  (position.x * widthHalf)  + widthHalf;
        position.y = -(position.y * heightHalf) + heightHalf;

        $marbleScreenPos = { x: position.x, y: position.y };
    }

    function onClickMarble() {
      cameraFocus.set({
        position: new THREE.Vector3(position.x + 25, position.y, position.z + 25),
        zoomLevel: 150
      });
    }

    useFrame((ctx, delta) => {
        updateScreenPosition();
        uniforms.time.value += delta * 0.03;
    });

    const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default');
</script>

<RigidBody {position}>
    <AutoColliders shape="ball" mass={10}>
        <MeshInstance 
          interactive 
          mesh={marble} 
          castShadow 
          on:click={() => onClickMarble()}
          on:pointerenter={onPointerEnter}
          on:pointerleave={onPointerLeave}
        >
        </MeshInstance>
    </AutoColliders>
</RigidBody>