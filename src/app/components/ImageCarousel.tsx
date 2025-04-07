'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 이미지 데이터 타입 정의
interface ImageData {
  id: number;
  src: string;
  alt: string;
  description: string;
}

// 샘플 이미지 데이터
const sampleImages: ImageData[] = [
  {
    id: 1,
    src: '/jpg/carousel-img1.jpg',
    alt: '이미지 1',
    description: '첫 번째 이미지에 대한 간단한 소개글입니다.'
  },
  {
    id: 2,
    src: '/jpg/carousel-img2.jpg',
    alt: '이미지 2',
    description: '두 번째 이미지에 대한 간단한 소개글입니다.'
  },
  {
    id: 3,
    src: '/jpg/carousel-img3.jpg',
    alt: '이미지 3',
    description: '세 번째 이미지에 대한 간단한 소개글입니다.'
  },
  {
    id: 4,
    src: '/jpg/carousel-img4.jpg',
    alt: '이미지 4',
    description: '네 번째 이미지에 대한 간단한 소개글입니다.'
  },
  {
    id: 5,
    src: '/jpg/carousel-img5.jpg',
    alt: '이미지 5',
    description: '다섯 번째 이미지에 대한 간단한 소개글입니다.'
  },
  {
    id: 6,
    src: '/jpg/carousel-img6.jpg',
    alt: '이미지 6',
    description: '여섯 번째 이미지에 대한 간단한 소개글입니다.'
  },
  {
    id: 7,
    src: '/jpg/carousel-img7.jpg',
    alt: '이미지 7',
    description: '일곱 번째 이미지에 대한 간단한 소개글입니다.'
  }
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 스크롤 애니메이션을 위한 설정
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const imageWidth = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], ['5px', '100vw', '100vw', '50%']);
  const imageHeight = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], ['50px', '100vh', '100vh', '60%']);

  // 스크롤에 따른 UI 요소 투명도 변환
  const carouselOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.75], [0, 0.5, 1]);

  // 이전 이미지로 이동
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? sampleImages.length - 1 : prev - 1));
  };

  // 다음 이미지로 이동
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === sampleImages.length - 1 ? 0 : prev + 1));
  };

  // 현재 이미지와 좌우 이미지 계산
  const leftIndex = currentIndex === 0 ? sampleImages.length - 1 : currentIndex - 1;
  const rightIndex = currentIndex === sampleImages.length - 1 ? 0 : currentIndex + 1;

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* 이미지 컨테이너 */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1], // 부드러운 베지어 곡선 사용
            staggerChildren: 0.1
          }}
        >
          {/* 좌측 화살표 */}
          <motion.button
            style={{ opacity: carouselOpacity }}
            className="absolute left-[-90] z-10 flex h-16 w-16 items-center justify-center"
            onClick={prevImage}
            aria-label="이전 이미지"
          >
            <ChevronLeft size={48} className="cursor-pointer text-black" />
          </motion.button>

          {/* 우측 화살표 */}
          <motion.button
            style={{ opacity: carouselOpacity }}
            className="absolute right-[-90] z-10 flex h-16 w-16 items-center justify-center"
            onClick={nextImage}
            aria-label="다음 이미지"
          >
            <ChevronRight size={48} className="cursor-pointer text-black" />
          </motion.button>

          {/* 좌측 이미지 */}
          <motion.div
            style={{ opacity: carouselOpacity }}
            className="absolute left-[-25%] h-full w-[15%] overflow-hidden"
          >
            <Image src={sampleImages[leftIndex].src} alt={sampleImages[leftIndex].alt} fill className="object-cover" />
          </motion.div>

          {/* 메인 이미지 */}
          <motion.div className="relative h-full w-full">
            <Image
              src={sampleImages[currentIndex].src}
              alt={sampleImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />

            {/* 하단 정보*/}
            <motion.div
              style={{ opacity: carouselOpacity }}
              className="absolute bottom-[-50] left-0 z-10 flex w-full items-center justify-between"
            >
              {/* 왼쪽 - 설명 */}
              <motion.div className="text-left text-lg font-light text-black drop-shadow-md">
                {sampleImages[currentIndex].description}
              </motion.div>

              {/* 오른쪽 - 인디케이터 */}
              <motion.div className="text-right font-medium text-black drop-shadow-md">
                {String(currentIndex + 1).padStart(2, '0')} / {String(sampleImages.length).padStart(2, '0')}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 우측 이미지 */}
          <motion.div
            style={{ opacity: carouselOpacity }}
            className="absolute right-[-25%] h-full w-[15%] overflow-hidden"
          >
            <Image
              src={sampleImages[rightIndex].src}
              alt={sampleImages[rightIndex].alt}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
