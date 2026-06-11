import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { createAnimatedGlyph, createFloatingParticles } from '../3d/AnimatedGlyph';

interface HeroSectionProps {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scene, camera }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    // Create 3D geometric shapes
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const pyramidGeometry = new THREE.ConeGeometry(1, 2, 4);

    // Create glyphs with staggered animations
    const box = createAnimatedGlyph({
      scene,
      geometry: boxGeometry,
      color: 0x6366f1,
      position: [-4, 2, 0],
      scale: 1.2,
      delay: 0.2,
    });
    meshesRef.current.push(box);

    const sphere = createAnimatedGlyph({
      scene,
      geometry: sphereGeometry,
      color: 0xec4899,
      position: [4, 2, 0],
      scale: 1,
      delay: 0.4,
    });
    meshesRef.current.push(sphere);

    const torus = createAnimatedGlyph({
      scene,
      geometry: torusGeometry,
      color: 0x8b5cf6,
      position: [0, -2, 0],
      scale: 0.8,
      delay: 0.6,
    });
    meshesRef.current.push(torus);

    const pyramid = createAnimatedGlyph({
      scene,
      geometry: pyramidGeometry,
      color: 0x06b6d4,
      position: [0, 4, 0],
      scale: 0.9,
      delay: 0.8,
    });
    meshesRef.current.push(pyramid);

    // Create floating particles
    const particles = createFloatingParticles(scene, 100, 0x6366f1);
    particlesRef.current = particles;

    // Animate text elements
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.3,
          ease: 'power3.out',
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.6,
          ease: 'power3.out',
        }
      );
    }

    // Interactive mouse tracking for 3D objects
    const onMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      meshesRef.current.forEach((mesh, index) => {
        gsap.to(mesh.rotation, {
          x: mouseY * 0.5,
          y: mouseX * 0.5,
          duration: 0.5,
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [scene, camera]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-transparent to-pink-900" />
      </div>

      <div className="relative z-10 text-center">
        <div
          ref={titleRef}
          className="mb-6"
        >
          <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AKSHARF
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4" />
        </div>

        <div
          ref={subtitleRef}
          className="mb-8"
        >
          <p className="text-xl text-gray-300 mb-2">
            A Journey Through Creative Digital Innovation
          </p>
          <p className="text-gray-400">
            Where imagination meets technology in perfect harmony
          </p>
        </div>

        <div className="flex gap-4 justify-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:scale-105">
            Explore Journey
          </button>
          <button className="px-8 py-3 border border-pink-500 text-pink-400 rounded-lg hover:bg-pink-500/10 transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500 text-sm">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};