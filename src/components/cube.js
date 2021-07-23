import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Loading() {
    return (
      <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          opacity={0.6}
          roughness={1}
          metalness={0}
        />
      </mesh>
    );
}

export function Cube(props) {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "./models/arwing.glb");

  useFrame(() => {
    group.current.rotation.y += 0.008;
  });

  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Default.geometry} scale={1.7}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}
