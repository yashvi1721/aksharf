import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    title: 'Digital Dreams',
    color: 'from-indigo-600 to-purple-600',
    description: 'Immersive 3D visualization',
    emoji: '🌌',
    bgGradient: 'via-indigo-500',
  },
  {
    id: 2,
    title: 'Cyber Realm',
    color: 'from-purple-600 to-pink-600',
    description: 'Interactive motion design',
    emoji: '🌐',
    bgGradient: 'via-purple-500',
  },
  {
    id: 3,
    title: 'Tech Horizon',
    color: 'from-cyan-600 to-blue-600',
    description: 'Advanced animations',
    emoji: '🚀',
    bgGradient: 'via-cyan-500',
  },
  {
    id: 4,
    title: 'Neon Nexus',
    color: 'from-pink-600 to-orange-600',
    description: 'Futuristic UI elements',
    emoji: '⚡',
    bgGradient: 'via-pink-500',
  },
  {
    id: 5,
    title: 'Infinite Loop',
    color: 'from-blue-600 to-cyan-600',
    description: 'Seamless experiences',
    emoji: '♾️',
    bgGradient: 'via-blue-500',
  },
  {
    id: 6,
    title: 'Creative Flow',
    color: 'from-purple-600 to-indigo-600',
    description: 'Story-driven design',
    emoji: '🎨',
    bgGradient: 'via-purple-500',
  },
];

export const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    // Create scroll animation for gallery items
    itemRefs.current.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top center',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
      });

      // Initial state
      gsap.set(item, {
        opacity: 0,
        y: 50,
      });
    });

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        itemRefs.current.forEach((item, index) => {
          gsap.to(item, {
            y: self.getVelocity() * 0.05 * (index % 2 === 0 ? 1 : -1),
            duration: 0.3,
          });
        });
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black py-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Creative Showcase
        </h2>
        <p className="text-center text-gray-400 mb-20 text-lg">
          A collection of stunning visual experiences
        </p>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer h-96"
            >
              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
              />

              {/* Card container */}
              <div className="relative h-full overflow-hidden rounded-2xl border border-gray-700/50 group-hover:border-gray-500/50 transition-all duration-300 shadow-lg">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 group-hover:opacity-75 transition-opacity duration-300`}
                />

                {/* Animated bars background */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-full h-16 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      style={{
                        top: `${i * 60}px`,
                        animation: hoveredId === item.id ? `pulse ${2 + i * 0.2}s ease-in-out infinite` : 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  {/* Large emoji/icon */}
                  <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                    {item.emoji}
                  </div>

                  {/* Animated circles */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`w-40 h-40 bg-gradient-to-r ${item.color} rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-all duration-300 group-hover:scale-150`} />
                  </div>

                  {/* Text content */}
                  <div className="relative z-10 text-center">
                    <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>

                    {/* Button */}
                    <button className={`px-6 py-2 bg-gradient-to-r ${item.color} text-white rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-95 transition-all duration-300 hover:shadow-lg`}>
                      Explore
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-500/50 rounded-lg group-hover:scale-110 group-hover:border-gray-300/80 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-gray-500/50 rounded-full group-hover:scale-110 group-hover:border-gray-300/80 transition-all duration-300" />

                  {/* Corner glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} rounded-bl-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl`} />
                </div>
              </div>

              {/* Number indicator */}
              <div className="absolute -top-4 -right-4 text-6xl font-bold text-gray-700/20 group-hover:text-gray-600/40 transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global animation styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0;
          }
          50% {
            transform: scaleX(1.1);
            opacity: 0.15;
          }
        }
      `}</style>
    </section>
  );
};
