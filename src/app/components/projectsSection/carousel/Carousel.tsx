'use client';
import useEmblaCarousel from 'embla-carousel-react';
import CarouselItem from './CarouselItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NextButton, PrevButton, usePrevNextButtons } from './CarouselButton';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';

const projects = [
  { id: 0, title: 'title 1', bg: '/projects/img1.jpg' },
  { id: 1, title: 'title 2', bg: '/projects/img2.jpg' },
  { id: 2, title: 'title 3', bg: '/projects/img3.jpg' },
  { id: 3, title: 'title 4', bg: '/projects/img4.jpg' },
  { id: 4, title: 'title 5', bg: '/projects/img5.jpg' }
];

export default function Carousel() {
  const [carouselRef, carouselApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false });
  const containerRef = useRef(null);
  // 현재 인덱스 상태 관리
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 스크롤 진행도에 따라 캐러셀 인덱스 계산
  const activeIndex = useSpring(useTransform(scrollYProgress, [0.3, 0.8], [0, projects.length - 1]), {
    stiffness: 50,
    damping: 15
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(carouselApi);

  // 캐러섹 인덱스 변경 이벤트 핸들러
  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    const index = carouselApi.selectedScrollSnap(); // 현재 위치 인덱스 가져오기
    setSelectedIndex(index); // 인덱스 상태 업데이트
  }, [carouselApi]);

  // 캐러셀 API 준비 시 이벤트 리스너 등록
  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on('select', onSelect);
    onSelect();
  }, [carouselApi, onSelect]);

  // 스크롤에 따라 인덱스 변경 시 캐러셀을 해당 인덱스로 이동
  useEffect(() => {
    if (!carouselApi) return;

    const unsubscribe = activeIndex.on('change', (latest) => {
      const roundedIndex = Math.round(latest);
      if (roundedIndex !== selectedIndex) {
        carouselApi.scrollTo(roundedIndex); // 캐러셀 위치 변경
      }
    });

    return () => unsubscribe();
  }, [activeIndex, carouselApi, selectedIndex]);

  return (
    <motion.section ref={containerRef} className="min-h-[300vh]">
      <div className="sticky top-0 left-0 m-auto h-screen w-full">
        {/* 캐러셀 영억 */}
        <div ref={carouselRef} className="overflow-hidden">
          <div className="flex gap-16" style={{ marginTop: 'calc(50vh - 192px)' }}>
            {projects.map((project) => (
              <CarouselItem key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* 캐러셀 제어 영역 (이전 / 다음 버튼 + 텍스트 애니메이션) */}
        <div className="my-10 flex items-center justify-between overflow-hidden px-20 whitespace-nowrap">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ y: 150 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
              exit={{ y: -150, opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="noto-serif-display mx-auto max-w-[90%] text-center text-9xl uppercase"
            >
              {projects[selectedIndex]?.title}
            </motion.div>
          </AnimatePresence>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </motion.section>
  );
}
