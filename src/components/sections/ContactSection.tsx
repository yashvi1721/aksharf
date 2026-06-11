import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    // Animate form elements on scroll
    const inputs = inputRefs.current;
    inputs.forEach((input, index) => {
      gsap.set(input, {
        opacity: 0,
        y: 30,
      });

      ScrollTrigger.create({
        trigger: input,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(input, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
      });

      // Focus animation
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          duration: 0.3,
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          boxShadow: 'none',
          duration: 0.3,
        });
      });
    });

    // Animate title
    const title = containerRef.current?.querySelector('h2');
    if (title) {
      gsap.set(title, { opacity: 0, y: -50 });
      ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Button animation
    const button = e.currentTarget.querySelector('button');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }

    // Form submission animation
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0.5,
        duration: 0.3,
      });

      setTimeout(() => {
        gsap.to(formRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      }, 500);
    }

    console.log('Form submitted:', formData);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-24 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-pink-900/20" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 w-full">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Let's Create Together
        </h2>
        <p className="text-center text-gray-400 mb-20 text-lg">
          Share your vision and let's bring it to life
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  📍
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-1">Location</h3>
                  <p className="text-gray-400">Creative Studios, Digital Valley</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-1">Email</h3>
                  <p className="text-gray-400">hello@aksharf.com</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">Chat</h3>
                  <p className="text-gray-400">Available 24/7 on social media</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name Input */}
            <div>
              <input
                ref={(el) => {
                  if (el) inputRefs.current[0] = el;
                }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-all backdrop-blur-lg"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                ref={(el) => {
                  if (el) inputRefs.current[1] = el;
                }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-all backdrop-blur-lg"
              />
            </div>

            {/* Subject Input */}
            <div>
              <input
                ref={(el) => {
                  if (el) inputRefs.current[2] = el;
                }}
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-all backdrop-blur-lg"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                ref={(el) => {
                  if (el) inputRefs.current[3] = el;
                }}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-all backdrop-blur-lg resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:scale-105 active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};