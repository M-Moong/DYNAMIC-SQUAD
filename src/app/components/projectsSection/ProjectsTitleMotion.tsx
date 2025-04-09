import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectsTitleMorionProps {
  scrollYProgress: MotionValue<number>;
}

export default function ProjectsTitleMotion({ scrollYProgress }: ProjectsTitleMorionProps) {
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const firstTextX = useSpring(useTransform(scrollYProgress, [0, 0.4], [-100, 0]), {
    stiffness: 50,
    damping: 20
  });
  const secondTextX = useSpring(useTransform(scrollYProgress, [0, 0.4], [100, 0]), {
    stiffness: 50,
    damping: 20
  });
  const firstTextScale = useTransform(scrollYProgress, [0.65, 0.7, 0.75], [1, 10, 35]);

  const containerBackground = useTransform(
    scrollYProgress,
    [0, 0.6, 0.7, 0.8],
    ['#fff', '#fff', 'rgba(0, 0, 0, 0.1)', '#000']
  );

  return (
    <motion.div className="h-screen overflow-hidden" style={{ backgroundColor: containerBackground }}>
      <div>
        <motion.p
          className="montserrat bg-gradient-to-b from-black to-black/10 bg-clip-text text-[18rem] font-bold text-transparent"
          style={{ opacity: textOpacity, x: firstTextX, scale: firstTextScale }}
        >
          PROJECTS
        </motion.p>
      </div>
      <motion.p
        className="montserrat bg-gradient-to-b from-black to-black/10 bg-clip-text text-right text-[18rem] font-bold text-transparent"
        style={{ opacity: textOpacity, x: secondTextX }}
      >
        PROJECTS
      </motion.p>
    </motion.div>
  );
}
