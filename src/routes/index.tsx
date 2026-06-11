import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from '../components/3d/Scene';
import { HeroSection } from '../components/sections/HeroSection';
import { StorySection } from '../components/sections/StorySection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { GallerySection } from '../components/sections/GallerySection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { FooterSection } from '../components/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const sceneDataRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
  });

  const handleSceneReady = (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) => {
    sceneDataRef.current = { scene, camera, renderer };
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // ScrollTrigger refresh on load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('load', () => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* 3D Scene Background */}
      <Scene onSceneReady={handleSceneReady} />

      {/* Content Sections */}
      <div className="relative z-20">
        {/* Hero Section */}
        <HeroSection
          scene={sceneDataRef.current.scene!}
          camera={sceneDataRef.current.camera!}
        />

        {/* Story Section */}
        <StorySection scene={sceneDataRef.current.scene} />

        {/* Features Section */}
        <FeaturesSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <svg className="w-16 h-16" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(99, 102, 241, 0.1)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="282.6"
            strokeDashoffset="282.6"
            strokeLinecap="round"
            style={{
              rotate: '-90deg',
              transformOrigin: '50% 50%',
            }}
            id="progress-circle"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Script for scroll progress */}
      <script>
        {`
          window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            const circumference = 282.6;
            const progressCircle = document.getElementById('progress-circle');
            if (progressCircle) {
              progressCircle.style.strokeDashoffset = circumference - scrollPercent * circumference;
            }
          });
        `}
      </script>
    </div>
  );
}

export default Home;