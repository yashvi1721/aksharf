import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Creative Director',
    text: 'AKSHARF transformed our vision into an interactive masterpiece. The cinematic animations are absolutely stunning.',
    gradient: 'from-indigo-600 to-purple-600',
  },
  {
    name: 'Sarah Williams',
    role: 'Product Manager',
    text: 'The synchronization between 3D elements and animations is seamless. A truly world-class experience.',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Mike Chen',
    role: 'UX Designer',
    text: 'Every detail is carefully crafted. The storytelling through motion design is exceptional and engaging.',
    gradient: 'from-cyan-600 to-blue-600',
  },
];

export const TestimonialsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        rotationY: 90,
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out',
          });
        },
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-indigo-950/20 to-black py-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          What People Say
        </h2>
        <p className="text-center text-gray-400 mb-20 text-lg">
          Hear from creators and innovators who've experienced AKSHARF
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div className={`relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-500/50 transition-all duration-300`}>
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Stars */}
                <div className="relative z-10 flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400 text-lg transform group-hover:scale-125 transition-transform"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Text */}
                <p className="relative z-10 text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient}`} />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Decorative quote */}
                <div className="absolute top-4 right-4 text-5xl text-gray-700/20 group-hover:text-gray-600/40 transition-colors">
                  "
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};