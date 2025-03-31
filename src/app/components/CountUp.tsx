'use client';

import { useEffect, useState } from 'react';

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  separator?: string;
  direction?: 'up' | 'down';
  className?: string;
  value?: number;
}

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  separator = ',',
  direction = 'up',
  className = '',
  value
}: CountUpProps) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (value !== undefined) {
      setCount(value);
      return;
    }

    // 자동 카운트 로직
    const step = direction === 'up' ? 1 : -1;
    const start = direction === 'up' ? from : to;
    const end = direction === 'up' ? to : from;
    const totalSteps = Math.abs(end - start);
    const stepTime = (duration * 200) / totalSteps;

    let current = start;
    const timer = setInterval(() => {
      current += step;
      setCount(current);

      if ((direction === 'up' && current >= end) || (direction === 'down' && current <= end)) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [from, to, duration, direction, value]);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return <span className={className}>{formatNumber(count)}</span>;
}
