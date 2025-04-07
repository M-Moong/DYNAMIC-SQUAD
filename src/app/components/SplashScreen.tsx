'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from './CountUp';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const duration = 1000;
    const interval = 10;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setLoadingComplete(true);
          setTimeout(() => setShowSplash(false), 1000);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!showSplash) return <>{children}</>;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black"
          animate={loadingComplete ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          exit={{ opacity: 0 }}
          aria-live="polite"
          aria-label={`로딩 중, ${progress}% 완료`}
        >
          {/* 로딩바 */}
          <div className="relative h-3 w-full bg-gray-800">
            <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>

          {/* 숫자 카운터 (오른쪽 하단) */}
          <div className="absolute right-10 bottom-2 text-white">
            <CountUp
              from={0}
              to={100}
              separator=""
              direction="up"
              duration={1}
              className="text-[160px] font-bold"
              value={progress}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
