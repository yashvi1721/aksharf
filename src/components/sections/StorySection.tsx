import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyFrames = [
  {
    title: 'The Vision',
    description: 'Every great creation begins with a spark of imagination. AKSHARF emerges from the fusion of art and technology.',
    icon: '✨',
    color: 'from-indigo-600 to-blue-600',
  },
  {
    title: 'The Creation',
    description: 'Through meticulous craftsmanship and cutting-edge tools, we transform concepts into stunning interactive experiences.',
    icon: '🎨',
    color: 'from-purple-600 to-pink-600',
  },
  {
    title: 'The Innovation',
    description: 'Pushing boundaries with advanced 3D graphics, cinematic animations, and immersive storytelling techniques.',
    icon: '🚀',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'The Experience',
    description: 'Users are transported into a world where design and functionality dance together in perfect synchronization.',
    icon: '🌟',
    color: 'from-pink-600 to-purple-600',
  },
];

interface StorySectionProps {
  scene: THREE.Scene | null;
}

export const StorySection: React.FC<StorySectionProps> = ({ scene }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    frameRefs.current.forEach((frame, index) => {
      gsap.registerEffect({
        name: 'storyFrame',
        effect: (targets: any) => {
          return gsap.timeline()
            .fromTo(
              targets,
              {
                opacity: 0,
                y: 100,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
              }
            );
        },
      });

      ScrollTrigger.create({
        trigger: frame,
        onEnter: () => {
          gsap.to(frame, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
    });

    // Create a timeline for the story progression
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    frameRefs.current.forEach((frame, index) => {
      timeline.fromTo(
        frame.querySelector('.story-content'),
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
        },
        index * 0.3
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black py-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          The Story Unfolds
        </h2>

        <div className="space-y-32">
          {storyFrames.map((frame, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) frameRefs.current[index] = el;
              }}
              className="opacity-0"
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-cols-2' : 'md:grid-cols-2'
              }`}>
                {/* Text Content */}
                <div className={`story-content ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${frame.color} flex items-center justify-center text-2xl`}>
                      {frame.icon}
                    </div>
                    <h3 className={`text-4xl font-bold bg-gradient-to-r ${frame.color} bg-clip-text text-transparent`}>
                      {frame.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {frame.description}
                  </p>
                </div>

                {/* Visual Element */}
                <div className={`story-content ${index % 2 === 1 ? 'md:order-1' : ''} relative h-80`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${frame.color} rounded-2xl blur-3xl opacity-20`} />
                  <div className={`absolute inset-0 border-2 border-gradient rounded-2xl border-opacity-20`} style={{
                    borderImage: `linear-gradient(to bottom right, ${frame.color === 'from-indigo-600 to-blue-600' ? '#4f46e5, #2563eb' : frame.color === 'from-purple-600 to-pink-600' ? '#9333ea, #ec4899' : frame.color === 'from-cyan-600 to-blue-600' ? '#06b6d4, #2563eb' : '#ec4899, #9333ea'}) 1`,
                  }} />
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className={`text-6xl opacity-20`}>{frame.icon}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};