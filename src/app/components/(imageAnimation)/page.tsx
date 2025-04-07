'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

// 더미 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: 'Dynamic Interaction System',
    description:
      'A comprehensive platform that transforms user engagement through innovative interactive elements and responsive design principles.',
    imageSrc: '/images/person/person1.webp'
  },
  {
    id: 2,
    title: 'Immersive Experience Portal',
    description:
      'Cutting-edge visualization technologies combined with intuitive navigation for creating memorable digital journeys.',
    imageSrc: '/images/person/person2.webp'
  },
  {
    id: 3,
    title: 'Advanced Analytics Dashboard',
    description:
      'Real-time data processing and visualization tools that provide actionable insights through elegant and accessible interfaces.',
    imageSrc: '/images/person/person3.webp'
  }
];

// 애니메이션 텍스트 컴포넌트
const AnimatedLetters = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.div className={`flex flex-wrap items-center justify-center ${className}`}>
      {text.split('').map((char: string, i: number) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            type: 'spring',
            stiffness: 100,
            damping: 10
          }}
          viewport={{ once: false, amount: 0.1 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 애니메이션 단어 컴포넌트
const AnimatedWords = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.div className={`flex flex-wrap items-center justify-center ${className}`}>
      {text.split(' ').map((word: string, i: number) => (
        <motion.span
          key={i}
          className="mr-2 inline-block"
          initial={{ opacity: 0, y: i % 2 === 0 ? 20 : -20, x: i % 3 === 0 ? -10 : i % 3 === 1 ? 10 : 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.07,
            type: 'spring',
            stiffness: 100
          }}
          viewport={{ once: true, amount: 1 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 스크롤 기반 애니메이션 값 추출 함수
const useScrollAnimation = (
  scrollYProgress: MotionValue<number>,
  outputRange: Array<number | string>,
  inputRange: number[] = [0, 1]
) => {
  return useTransform(scrollYProgress, inputRange, outputRange);
};

export default function ImageAnimation() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // 전체 스크롤 진행률
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 각 섹션의 시작과 끝 범위 정의 (0-1 사이의 값)
  // 섹션 간에 겹치는 부분 없이 연속적으로 배치
  const sectionRanges = [
    [0.05, 0.35], // 첫 번째 섹션 (5%~35%)
    [0.35, 0.65], // 두 번째 섹션 (35%~65%)
    [0.7, 0.95] // 세 번째 섹션 (70%~95%)
  ];

  // 가로 스크롤 효과 - 시작부터 마지막까지 부드러운 이동
  // 각 섹션의 전환 포인트를 조정하여 애니메이션이 끝난 후에 스크롤되도록 함
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.32, 0.4, 0.67, 0.7, 0.95],
    ['0vw', '0vw', '-100vw', '-100vw', '-200vw', '-200vw']
  );

  // 액티브 섹션 추적
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      for (let i = 0; i < sectionRanges.length; i++) {
        if (value >= sectionRanges[i][0] && value <= sectionRanges[i][1]) {
          setActiveSection(i);
          break;
        } else if (value < sectionRanges[0][0]) {
          setActiveSection(-1); // 인트로 영역
        } else if (value > sectionRanges[sectionRanges.length - 1][1]) {
          setActiveSection(sectionRanges.length); // 아웃트로 영역
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // 인트로 화면 투명도
  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // 아웃트로 화면 투명도
  const outroOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

  // 스크롤 표시기 투명도
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 0.95], [0, 1, 1, 0]);

  // 각 섹션별 애니메이션 값을 미리 계산 (Hook 에러 방지)
  // 첫 번째 섹션
  const section1Opacity = useTransform(scrollYProgress, [0.05, 0.08, 0.27, 0.3], [0, 1, 1, 0]);
  const section1RotateY = useTransform(scrollYProgress, [0.05, 0.1, 0.25, 0.3], [20, 0, 0, -20]);
  const section1Scale = useTransform(scrollYProgress, [0.05, 0.08, 0.27, 0.3], [0.9, 1, 1, 0.9]);
  // 첫 번째 섹션 슬라이드 효과
  const section1X = useTransform(scrollYProgress, [0.03, 0.1, 0.25, 0.33], ['120vw', '0vw', '0vw', '-10vw']);

  // 두 번째 섹션
  const section2Opacity = useTransform(scrollYProgress, [0.4, 0.43, 0.62, 0.65], [0, 1, 1, 0]);
  const section2RotateY = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [20, 0, 0, -20]);
  const section2Scale = useTransform(scrollYProgress, [0.4, 0.43, 0.62, 0.65], [0.9, 1, 1, 0.9]);
  // 두 번째 섹션 슬라이드 효과
  const section2X = useTransform(scrollYProgress, [0.37, 0.45, 0.6, 0.69], ['10vw', '0vw', '0vw', '-120vw']);

  // 세 번째 섹션 - 이미 잘 작동하는 부분
  const section3Opacity = useTransform(
    scrollYProgress,
    [sectionRanges[2][0] - 0.05, sectionRanges[2][0], sectionRanges[2][1] - 0.05, sectionRanges[2][1]],
    [0, 1, 1, 0]
  );
  const section3RotateY = useTransform(
    scrollYProgress,
    [sectionRanges[2][0] - 0.05, sectionRanges[2][0] + 0.05, sectionRanges[2][1] - 0.1, sectionRanges[2][1]],
    [20, 0, 0, -20]
  );
  const section3Scale = useTransform(
    scrollYProgress,
    [sectionRanges[2][0] - 0.05, sectionRanges[2][0], sectionRanges[2][1] - 0.05, sectionRanges[2][1]],
    [0.9, 1, 1, 0.9]
  );
  // 세 번째 섹션 슬라이드 효과
  const section3X = useTransform(scrollYProgress, [0.65, 0.73, 0.87, 0.97], ['120vw', '0vw', '0vw', '-120vw']);

  // 각 섹션별 애니메이션 배열
  const sectionsAnimation = [
    { opacity: section1Opacity, rotateY: section1RotateY, scale: section1Scale, x: section1X },
    { opacity: section2Opacity, rotateY: section2RotateY, scale: section2Scale, x: section2X },
    { opacity: section3Opacity, rotateY: section3RotateY, scale: section3Scale, x: section3X }
  ];

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full overflow-hidden bg-black">
      {/* 고정된 뷰포트 */}
      <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* 인트로 화면 */}
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black"
          style={{ opacity: introOpacity }}
        >
          <AnimatedLetters
            text="Portfolio Showcase"
            delay={0.5}
            className="mb-8 text-6xl font-bold text-white md:text-7xl lg:text-8xl"
          />
          <AnimatedWords
            text="Scroll down to explore our amazing projects"
            delay={1.5}
            className="text-xl text-gray-300"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-20 flex flex-col items-center"
          >
            <span className="mb-2 text-sm text-gray-400">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-8 w-5 rounded-full border-2 border-white/30 p-1"
            >
              <motion.div className="h-1 w-1 rounded-full bg-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 메인 컨텐츠 */}
        <motion.div className="relative flex h-full w-[300vw] items-center justify-center" style={{ x }}>
          {/* 각 프로젝트 섹션 */}
          {projects.map((project, index) => (
            <motion.section
              key={project.id}
              className="relative left-1/3 flex h-screen w-screen items-center justify-center"
              style={{
                opacity: sectionsAnimation[index].opacity,
                rotateY: sectionsAnimation[index].rotateY,
                scale: sectionsAnimation[index].scale,
                x: sectionsAnimation[index].x,
                transformPerspective: 1200,
                zIndex: activeSection === index ? 10 : 0
              }}
            >
              {/* 배경 그라데이션 */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 to-black opacity-80" />

              {/* 배경 이미지 */}
              <div className="absolute inset-0 z-0 opacity-20">
                <Image
                  src={project.imageSrc}
                  alt="Background"
                  fill
                  className="object-cover blur-sm"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* 메인 컨텐츠 - 화면 중앙에 배치 */}
              <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 md:px-12 lg:flex-row lg:justify-between lg:gap-20">
                {/* 이미지 섹션 - 정확히 중앙에 배치 */}
                <div className="flex w-full items-center justify-center lg:w-[45%]">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true, amount: 1 }}
                    className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl shadow-2xl"
                  >
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 mix-blend-overlay" />
                    <Image
                      src={project.imageSrc}
                      alt={`Project ${project.id}`}
                      fill
                      className="z-0 object-cover object-center"
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 33vw"
                      priority
                    />
                    <motion.div
                      initial={{ scaleY: 0, originY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true, amount: 1 }}
                      className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    />
                  </motion.div>
                </div>

                {/* 텍스트 섹션 */}
                <div className="w-full text-center lg:w-[45%] lg:text-left">
                  {/* 프로젝트 번호 */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true, amount: 1 }}
                    className="mb-4"
                  >
                    <span className="inline-block rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 text-sm font-medium text-white">
                      Project {index + 1}
                    </span>
                  </motion.div>

                  {/* 프로젝트 제목 */}
                  <div className="mb-6 overflow-hidden">
                    <AnimatedLetters
                      text={project.title}
                      delay={0.6}
                      className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                    />
                  </div>

                  {/* 프로젝트 설명 */}
                  <div className="mb-8 opacity-90">
                    <AnimatedWords
                      text={project.description}
                      delay={1.2}
                      className="mx-auto max-w-xl text-lg text-gray-300 lg:mx-0"
                    />
                  </div>

                  {/* 버튼 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8, type: 'spring' }}
                    viewport={{ once: true, amount: 1 }}
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg"
                    >
                      <motion.span
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 2.2, duration: 0.6 }}
                        className="relative z-10"
                      >
                        View Project
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{
                          scale: 1.5,
                          opacity: 0.1,
                          transition: { duration: 0.6 }
                        }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* 아웃트로 화면 - 모든 포트폴리오 요약 */}
        <motion.div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-black to-slate-900"
          style={{ opacity: outroOpacity }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            All Projects
          </motion.h2>

          <div className="grid w-[90%] max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.2,
                  type: 'spring',
                  stiffness: 50
                }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-1 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 h-full rounded-lg bg-slate-900 p-5">
                  {/* 썸네일 이미지 */}
                  <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={project.imageSrc}
                      alt={`Project ${project.id}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <motion.div
                      className="absolute inset-0 bg-indigo-600/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* 프로젝트 정보 */}
                  <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-indigo-400">
                    {project.title}
                  </h3>
                  <p className="mb-5 line-clamp-2 text-sm text-gray-400">{project.description}</p>

                  {/* 버튼 */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-md bg-gradient-to-r from-indigo-600/70 to-purple-600/70 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-indigo-500 hover:to-purple-500"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 스크롤 진행 표시기 */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 space-x-3"
          style={{ opacity: indicatorOpacity }}
        >
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className="h-2 w-6 rounded-full bg-white/20"
              style={{
                backgroundColor: activeSection === index ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.2)'
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
