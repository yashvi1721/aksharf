import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FooterSection: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Animate footer on scroll
    gsap.set(footerRef.current, { opacity: 0 });
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(footerRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
    });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-t from-black to-gray-950/50 border-t border-gray-800/50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-4">
              AKSHARF
            </h3>
            <p className="text-gray-400 text-sm">
              Crafting digital experiences that inspire and captivate.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Showcase', 'Pricing', 'Updates'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Team', 'Blog', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Contact', 'Support'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} AKSHARF. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-3xl" />
      </div>
    </footer>
  );
};