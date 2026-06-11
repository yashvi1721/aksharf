import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface AnimatedGlyphProps {
  scene: THREE.Scene;
  geometry: THREE.BufferGeometry;
  color: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  animationDuration?: number;
  delay?: number;
}

export const createAnimatedGlyph = ({
  scene,
  geometry,
  color,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  animationDuration = 2,
  delay = 0,
}: AnimatedGlyphProps): THREE.Mesh => {
  const material = new THREE.MeshPhongMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.3,
    wireframe: false,
    shininess: 100,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(scale, scale, scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  // Entrance animation
  gsap.fromTo(
    mesh.scale,
    { x: 0, y: 0, z: 0 },
    {
      x: scale,
      y: scale,
      z: scale,
      duration: animationDuration,
      delay,
      ease: 'back.out',
    }
  );

  gsap.fromTo(
    mesh.position,
    { y: position[1] + 2 },
    {
      y: position[1],
      duration: animationDuration,
      delay,
      ease: 'power2.out',
    }
  );

  gsap.to(mesh.rotation, {
    x: mesh.rotation.x + Math.PI * 2,
    y: mesh.rotation.y + Math.PI * 2,
    duration: 8,
    delay,
    repeat: -1,
    ease: 'none',
  });

  return mesh;
};

export const createFloatingParticles = (
  scene: THREE.Scene,
  count: number = 50,
  color: number = 0x6366f1
): THREE.Points => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size: 0.1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Animate particles
  gsap.to(particles.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    duration: 20,
    repeat: -1,
    ease: 'none',
  });

  return particles;
};