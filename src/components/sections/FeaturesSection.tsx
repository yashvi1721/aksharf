import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: '3D Visualization',
    description: 'Immersive three-dimensional graphics powered by Three.js',
    gradient: 'from-indigo-500 to-purple-500',
    icon: '🎯',
  },
  {
    title: 'Cinematic Animations',
    description: 'Smooth, sophisticated motion design using GSAP',
    gradient: 'from-purple-500 to-pink-500',
    icon: '🎬',
  },
  {
    title: 'Vector Design',
    description: 'Scalable, beautiful SVG-based design elements',
    gradient: 'from-pink-500 to-red-500',
    icon: '✏️',
  },
  {
    title: 'Interactive Elements',
    description: 'Responsive, touch-friendly user interactions',
    gradient: 'from-cyan-500 to-blue-500',
    icon: '👆',
  },
  {
    title: 'Synchronous Design',
    description: 'Perfectly timed effects that work in harmony',
    gradient: 'from-blue-500 to-indigo-500',
    icon: '⏱️',
  },
  {
    title: 'Story Driven',
    description: 'Every interaction tells a part of the narrative',
    gradient: 'from-indigo-500 to-cyan-500',
    icon: '📖',
  },
];

export const FeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      // Initial state
      gsap.set(card, {
        opacity: 0,
        y: 100,
      });

      // Scroll trigger animation
      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out',
          });
        },
      });

      // Hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -20,
          boxShadow: '0 20px 50px rgba(99, 102, 241, 0.3)',
          duration: 0.3,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Cutting-Edge Features
        </h2>
        <p className="text-center text-gray-400 mb-20 text-lg">
          Experience the perfect blend of aesthetics and technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="relative group"
            >
              {/* Card background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

              {/* Card content */}
              <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 h-full">
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-bl-2xl opacity-10`} />

                {/* Icon */}
                <div className="text-4xl mb-4">{feature.icon}</div>

                {/* Title */}
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6">{feature.description}</p>

                {/* Decorative line */}
                <div className={`h-1 w-12 bg-gradient-to-r ${feature.gradient} rounded-full`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};