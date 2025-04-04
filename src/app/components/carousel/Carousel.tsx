'use client';

import useEmblaCarousel from 'embla-carousel-react';
import CarouselItem from './CarouselItem';
import { useCallback, useEffect, useState } from 'react';

const projects = [
  { id: 0, title: 'title 1', bg: 'bg-pink-100' },
  { id: 1, title: 'title 2', bg: 'bg-pink-200' },
  { id: 2, title: 'title 3', bg: 'bg-fuchsia-100' },
  { id: 3, title: 'title 4', bg: 'bg-fuchsia-200' },
  { id: 4, title: 'title 5', bg: 'bg-violet-100' }
];

export default function Carousel() {
  const [carouselRef, carouselApi] = useEmblaCarousel({ slidesToScroll: 'auto' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    const index = carouselApi.selectedScrollSnap();
    setSelectedIndex(index);
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on('select', onSelect);
    onSelect();
  }, [carouselApi, onSelect]);

  return (
    <section className="min-h-[300vh]">
      <div className="sticky top-0 left-0 m-auto h-screen w-full">
        <div ref={carouselRef} className="overflow-hidden">
          <div className="flex items-center justify-center gap-10">
            {projects.map((project) => (
              <CarouselItem key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="my-10 whitespace-nowrap">
          <div className="mx-auto max-w-[90%] text-center text-9xl uppercase">{projects[selectedIndex]?.title}</div>
        </div>
      </div>
    </section>
  );
}
