"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const fragmentShader = `
uniform float uTime;
uniform float uVelocity;
varying vec2 vUv;

// Pseudo-random noise
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    
    // Wave distortion amplifying with scroll velocity
    float wave = sin(uv.y * 10.0 + uTime) * (uVelocity * 0.002);
    uv.x += wave;
    
    // Base Obsidian Color (#0a0a0a) = r:0.04, g:0.04, b:0.04
    vec3 baseCol = vec3(0.04, 0.04, 0.04);
    
    // Cyan (#06b6d4) accent bleeding into scene
    vec3 accent = vec3(0.02, 0.71, 0.83);
    
    // Mix based on distortion intensity
    float intensity = smoothstep(0.0, 50.0, abs(uVelocity));
    
    // Subtle gradient based on UV
    vec3 finalColor = mix(baseCol, accent, intensity * 0.15 + (uv.y * 0.02));
    
    // Add tiny amount of shader noise to prevent banding
    finalColor += random(uv + uTime * 0.01) * 0.015;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    // Orthographic full screen pass
    gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

function PostProcessQuad() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [velocity, setVelocity] = useState(0);
    const lastY = useRef(0);

    useEffect(() => {
        lastY.current = window.scrollY;

        let vel = 0;
        const handleScroll = () => {
            const currentY = window.scrollY;
            vel = currentY - lastY.current;
            lastY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Decay loop
        const decayInterval = setInterval(() => {
            vel *= 0.9; // Friction
            if (Math.abs(vel) < 0.1) vel = 0;
            setVelocity(vel);
        }, 16);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(decayInterval);
        };
    }, []);

    useFrame((state) => {
        if (!materialRef.current) return;

        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

        // Smooth interpolation for shader velocity
        materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uVelocity.value,
            velocity,
            0.1
        );
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={{
                    uTime: { value: 0 },
                    uVelocity: { value: 0 }
                }}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

export default function DistortionCanvas() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a]">
            <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
                <PostProcessQuad />
            </Canvas>
        </div>
    );
}
