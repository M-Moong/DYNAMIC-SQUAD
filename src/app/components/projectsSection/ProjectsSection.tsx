'use client';
import { useRef } from 'react';
import ProjectsTitleMotion from './ProjectsTitleMotion';
import { useScroll } from 'framer-motion';

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section ref={containerRef} className="min-h-[250vh]">
      <div className="sticky top-0 left-0 m-auto h-screen w-full">
        <ProjectsTitleMotion scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
