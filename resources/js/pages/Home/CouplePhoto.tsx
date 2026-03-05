
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './couple.css';

export default function CouplePhoto() {
  const containerRef = useRef(null);

  // Effet de parallaxe : l'image bouge à une vitesse différente du scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (

    <motion.section
  ref={containerRef}
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
>

  <div className="film-grain absolute inset-0 z-10 pointer-events-none" />
  <div className="inner-frame absolute inset-0 z-10 pointer-events-none" />

  {/* Background Parallax */}
  <motion.div
    style={{ y: imageY }}
    className="absolute inset-0 w-full h-full"
  >
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/cool.jpg')" }}
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
  </motion.div>

  {/* Content */}
  <motion.div
    style={{ y: textY, opacity: opacityText }}
    className="relative z-20 text-center text-white px-6 max-w-5xl"
  >
    <motion.div
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="mb-8"
    >
      <span className="font-serif-premium uppercase text-xs tracking-[0.6em] text-amber-200/80 mb-4 block">
        Notre Promesse
      </span>

      <h2 className="text-5xl mt-16 md:text-8xl font-script text-shadow-premium leading-tight">
        Clémence & Elias
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="space-y-8"
    >
      <p className="text-xl md:text-3xl italic leading-tight max-w-3xl mx-auto">
        « L’amour n’est pas seulement regarder l’un vers l’autre, c’est regarder ensemble dans la même direction. »
      </p>

      <div className="flex items-center justify-center gap-6 opacity-60">
        <div className="w-12 h-[1px] bg-white" />
        <span className="text-lg italic uppercase tracking-widest">
          Antoine de Saint-Exupéry
        </span>
        <div className="w-12 h-[1px] bg-white" />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, delay: 1 }}
        className="pt-12"
      >
        <p className="text-amber-200 tracking-[0.3em] text-sm uppercase">
          À très bientôt • 11 . 04 . 2026
        </p>
      </motion.div>
    </motion.div>
  </motion.div>

  {/* Side Decoration */}
  <div className="absolute bottom-12 right-12 z-20 hidden md:block">
    <p className="text-white/20 text-xs tracking-widest uppercase rotate-90 origin-right">
      Célébration à Bafoussam
    </p>
  </div>
</motion.section>
  );
}
