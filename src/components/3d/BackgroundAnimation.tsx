import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface BackgroundAnimationProps {
  scene: THREE.Scene;
}

export const createBackgroundAnimation = (scene: THREE.Scene) => {
  // Create geometric background elements
  const geometries = [
    new THREE.IcosahedronGeometry(2, 4),
    new THREE.OctahedronGeometry(1.5),
    new THREE.TorusGeometry(2, 0.5, 8, 100),
  ];

  const materials = [
    new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.2,
      wireframe: true,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 0.2,
      wireframe: true,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2,
      wireframe: true,
    }),
  ];

  const meshes: THREE.Mesh[] = [];

  geometries.forEach((geometry, index) => {
    const mesh = new THREE.Mesh(geometry, materials[index]);
    mesh.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    scene.add(mesh);
    meshes.push(mesh);

    // Rotate continuously
    gsap.to(mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 20 + index * 5,
      repeat: -1,
      ease: 'none',
    });
  });

  return meshes;
};

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ scene }) => {
  useEffect(() => {
    createBackgroundAnimation(scene);
  }, [scene]);

  return null;
};