import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn, Eyebrow, Parallax, Reveal } from "@/components/motion-primitives";
import { PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshar Foshan — Hospitality FF&E, Cinematic Furniture Stories" },
      { name: "description", content: "Akshar Foshan crafts complete hotel furniture solutions — casegoods, upholstery, lighting and bespoke FF&E for hospitality projects worldwide." },
      { property: "og:title", content: "Akshar Foshan — Hospitality FF&E" },
      { property: "og:description", content: "Cinematic storytelling for complete hotel furniture solutions." },
    ],
  }),
  component: Home,
});

interface Scene3DProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const Scene3D: React.FC<Scene3DProps> = ({ containerRef }) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfaf8f5);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3a1a4a, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating cubes with brand colors
    const cubes: THREE.Mesh[] = [];
    const colors = [0x3a1a4a, 0xd4a574, 0xfaf8f5];
    
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const material = new THREE.MeshPhongMaterial({ color: colors[i] });
      const cube = new THREE.Mesh(geometry, material);
      
      cube.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      );
      
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(cube);
      cubes.push(cube);

      // Animate
      gsap.to(cube.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 8 + i * 2,
        repeat: -1,
        ease: "none",
      });

      gsap.to(cube.position, {
        y: cube.position.y + 0.5,
        duration: 3 + i,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      cubes.forEach((cube) => {
        gsap.to(cube.rotation, {
          x: mouseY * 0.3,
          y: mouseX * 0.3,
          duration: 0.5,
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current?.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return null;
};

function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero fade in
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Gallery items parallax
    const galleryItems = galleryRef.current?.querySelectorAll("[data-gallery-item]");
    if (galleryItems) {
      galleryItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item as Element,
          start: "top 80%",
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power3.out",
            });
          },
        });

        gsap.set(item, { opacity: 0, y: 30 });
      });
    }
  }, []);

  return (
    <>
      {/* 3D Background */}
      <div ref={sceneRef} className="fixed inset-0 pointer-events-none">
        <Scene3D containerRef={sceneRef} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,oklch(0.92_0.06_310/0.5),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20">
          <FadeIn>
            <Eyebrow>Foshan, Guangdong · Hospitality FF&E</Eyebrow>
            <h1 className="mt-6 text-balance text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]">
              <Reveal>We build the rooms</Reveal> <Reveal className="italic text-primary">guests remember.</Reveal>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Akshar Foshan is a Foshan-based hospitality FF&E house. We work alongside hotel owners, interior
              designers, brand teams and contractors to land complete furniture programs.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">Cinematic 3D Experience</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4">
          {[
            { v: "13+", l: "Cooperating facilities" },
            { v: "5+", l: "Years in hospitality" },
            { v: "40", l: "Frames in the 2026 reel" },
            { v: "21 days", l: "Fastest 240-key turn" },
          ].map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.06}>
              <div>
                <div className="font-display text-5xl text-primary md:text-6xl">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Eyebrow>From the 2026 catalog</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-tight">
              Every frame is a <span className="italic text-primary">property.</span>
            </h2>
          </FadeIn>

          <div ref={galleryRef} className="mt-14 grid gap-6 md:grid-cols-3">
            {PROJECTS.slice(0, 3).map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <div
                  data-gallery-item
                  className="group relative overflow-hidden rounded-2xl bg-muted hover:shadow-lg transition-all duration-500"
                >
                  <div className="overflow-hidden h-80">
                    <img
                      src={project.url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-cream opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold">
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="mt-1 font-display text-xl leading-tight">{project.title}</div>
                    <div className="mt-1 text-xs text-cream/70">{project.location}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[oklch(0.14_0.02_290)] py-20 text-cream md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.3_0.08_290/0.3),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="text-balance text-[clamp(2rem,5vw,3.2rem)] leading-tight">
              Ready to build your next property?
            </h2>
            <p className="mt-4 text-cream/70 text-lg">
              Let's discuss your hospitality FF&E requirements.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink hover:shadow-[0_20px_50px_-20px_rgba(212,165,116,0.6)] transition-all"
            >
              Request Catalog →
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
