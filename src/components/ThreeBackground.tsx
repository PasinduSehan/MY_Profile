import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
  type: "torus" | "octahedron" | "icosahedron" | "box";
  position: [number, number, number];
  color: string;
  scale: number;
  speedMultiplier: number;
}

function FloatingShape({ 
  type, 
  position, 
  color, 
  scale, 
  speedMultiplier 
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle drifting floating movement
    meshRef.current.position.y = position[1] + Math.sin(time * 0.4 + position[0]) * 0.25;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.3 + position[2]) * 0.15;

    // Slowly rotate, adding mouse reactivity
    const baseRotX = time * 0.1 * speedMultiplier;
    const baseRotY = time * 0.08 * speedMultiplier;
    
    const mouseInfluenceX = state.pointer.x * 0.6;
    const mouseInfluenceY = state.pointer.y * 0.6;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, baseRotX + mouseInfluenceY, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, baseRotY + mouseInfluenceX, 0.05);
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === "torus" && <torusGeometry args={[1, 0.3, 12, 48]} />}
      {type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {type === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {type === "box" && <boxGeometry args={[1, 1, 1]} />}
      
      <meshPhysicalMaterial
        color={color}
        wireframe={true}
        transparent={true}
        opacity={0.18}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Interactive Particle Dust System
function InteractiveParticles({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Monitor mouse position globally since Canvas uses pointer-events-none
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to standard ThreeJS NDC space range: -1 to +1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate random base positions and velocity phases
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initialPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute randomly in a spacious viewport coordinate box
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8 - 2; // offset z deeper behind the text

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initialPos[i * 3] = x;
      initialPos[i * 3 + 1] = y;
      initialPos[i * 3 + 2] = z;
    }
    return [pos, initialPos];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    const posAttribute = geom.attributes.position;
    const posArray = posAttribute.array as Float32Array;

    // Organic lerping of mouse coords to provide an ultra-smooth kinetic feel
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouseRef.current.x, 0.08);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouseRef.current.y, 0.08);

    // Approximate 3D viewport mapping based on camera & particle depth
    const targetMouseX = smoothMouse.current.x * 7.5;
    const targetMouseY = smoothMouse.current.y * 5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const bx = initialPositions[idx];
      const by = initialPositions[idx + 1];
      const bz = initialPositions[idx + 2];

      // Organic drifting wave pattern
      let px = bx + Math.sin(time * 0.15 + i * 0.1) * 0.3;
      let py = by + Math.cos(time * 0.2 + i * 0.15) * 0.3;
      let pz = bz + Math.sin(time * 0.1 + i * 0.25) * 0.2;

      // Proximity maths
      const dx = px - targetMouseX;
      const dy = py - targetMouseY;
      const dz = pz - 0; // relative to mouse on z=0 plane
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const threshold = 3.5; // expanded interaction radius for immersive response
      if (dist < threshold) {
        // Particles outside 1.2 units get gently clustered/attracted toward pointer
        // Particles inside 1.2 units get strongly repelled away
        if (dist > 1.2) {
          const attractionForce = ((threshold - dist) / threshold) * 0.45;
          px -= (dx / dist) * attractionForce;
          py -= (dy / dist) * attractionForce;
          pz -= (dz / dist) * attractionForce * 0.5;
        } else {
          const repulsionForce = ((1.2 - dist) / 1.2) * 1.8;
          const dirX = dist > 0.01 ? dx / dist : 1;
          const dirY = dist > 0.01 ? dy / dist : 1;
          const dirZ = dist > 0.01 ? dz / dist : 1;

          px += dirX * repulsionForce;
          py += dirY * repulsionForce;
          pz += dirZ * repulsionForce * 0.8;
        }
      }

      posArray[idx] = px;
      posArray[idx + 1] = py;
      posArray[idx + 2] = pz;
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation={true}
        color="#06b6d4" // Cyan hue
        transparent={true}
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeBackground() {
  // Configured positions for subtle floating shapes across the screen coordinate space
  const shapes = useMemo(() => [
    { type: "torus" as const, position: [-4, 2, -5] as [number, number, number], color: "#6366f1", scale: 1.1, speedMultiplier: 1 },
    { type: "icosahedron" as const, position: [4, -2.5, -6] as [number, number, number], color: "#10b981", scale: 1.3, speedMultiplier: 0.8 },
    { type: "octahedron" as const, position: [-3, -2, -4] as [number, number, number], color: "#06b6d4", scale: 0.75, speedMultiplier: 1.2 },
    { type: "box" as const, position: [3, 2, -5] as [number, number, number], color: "#8b5cf6", scale: 0.85, speedMultiplier: 0.7 },
  ], []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10b981" />
        
        {/* Render geometric background wireframes */}
        {shapes.map((shape, idx) => (
          <FloatingShape key={idx} {...shape} />
        ))}

        {/* Render high-performance interactive dust particles */}
        <InteractiveParticles count={750} />
      </Canvas>
    </div>
  );
}
