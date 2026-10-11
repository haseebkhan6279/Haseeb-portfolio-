"use client";

import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

type Props = {
  /** 0 → 1 as the hero scrolls out; drives the blob's drift and spin. */
  progress: React.RefObject<number>;
  reduced?: boolean;
};

function Blob({ progress, reduced }: Props) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const width = useThree((s) => s.size.width);
  const base = width < 640 ? 0.62 : width < 1024 ? 0.8 : 1;

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;
    const p = progress.current ?? 0;
    // Follow the pointer with a soft lag; scroll adds spin and pushes the blob down/back.
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.6 + p * 2.4 - group.current.rotation.y) * Math.min(1, delta * 3);
    group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * Math.min(1, delta * 3);
    group.current.position.y = -p * 1.6;
    group.current.scale.setScalar(base * (1 - p * 0.25));
    if (!reduced) mesh.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.25, 64]} />
          <MeshDistortMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={1}
            iridescenceIOR={1.6}
            iridescenceThicknessRange={[120, 800]}
            distort={0.38}
            speed={reduced ? 0 : 1.8}
            envMapIntensity={1.25}
          />
        </mesh>
      </Float>

      {/* Satellites give the scene depth and a parallax reference. */}
      <Float speed={reduced ? 0 : 2.4} floatIntensity={2}>
        <mesh position={[2.6, 1.35, -0.8]}>
          <sphereGeometry args={[0.22, 48, 48]} />
          <meshPhysicalMaterial color="#ff7a59" metalness={0.6} roughness={0.15} clearcoat={1} envMapIntensity={1.2} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.9} floatIntensity={2.4}>
        <mesh position={[-2.3, -1.45, -0.4]} rotation={[0.6, 0.3, 0]}>
          <torusGeometry args={[0.26, 0.09, 32, 96]} />
          <meshPhysicalMaterial color="#b69cff" metalness={0.8} roughness={0.12} clearcoat={1} envMapIntensity={1.3} />
        </mesh>
      </Float>
    </group>
  );
}

/** Iridescent liquid-metal blob for the hero. Lit by procedural lightformers — no HDR download. */
export default function HeroBlob({ progress, reduced }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={0.45} />
      <Blob progress={progress} reduced={reduced} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#1a1233"]} />
        <Lightformer form="rect" intensity={5} color="#b69cff" position={[-5, 2, 2]} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={6} color="#ff7a59" position={[5, -1, 1]} scale={[7, 6, 1]} />
        <Lightformer form="ring" intensity={4} color="#ffc861" position={[0, 4, -3]} scale={3} />
        <Lightformer form="rect" intensity={0.8} color="#ffffff" position={[0, -4, 3]} scale={[8, 1, 1]} />
        <Lightformer form="circle" intensity={2.5} color="#7ef0ff" position={[-3, -3, -2]} scale={2.5} />
      </Environment>
    </Canvas>
  );
}
