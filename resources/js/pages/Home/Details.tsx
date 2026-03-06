
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Users, Sparkles, Heart } from 'lucide-react';
import Index from '../Gifts/ListGift';
import Cadeaux from '../Cadeaux';

gsap.registerPlugin(ScrollTrigger);

const details = [
  { icon: CalendarDays, title: "La Date", text: "Samedi 11 Avril 2026" },
  { icon: Clock, title: "L'Instant", text: "Mairie 10h00\nSoirée 22h00" },
  { icon: MapPin, title: "Le Lieu", text: "Bafoussam, BelleVue\n #Maison  Blanche" },
  { icon: Users, title: "Dress Code", text: "Chic & Élégant | Glamour\nUne touche de Vert sauge" },
];

const TimelineItem = ({ detail, index }) => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.03, 0.96]);

  // Alternance : pair → gauche, impair → droite
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`
  relative flex items-center justify-between
  mb-28 sm:mb-40 lg:mb-52 w-full
  ${isLeft ? 'flex-row' : 'flex-row-reverse'}
`}
    >
      {/* Contenu (gauche ou droite selon index) */}
      <motion.div
        style={{ y, scale }}
        initial={{ opacity: 0, x: isLeft ? -140 : 140, filter: "blur(12px)" }}
        animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.1, delay: index * 0.18, type: "spring", stiffness: 70, damping: 15 }}
        className={`
  w-[45%] sm:w-[42%] lg:w-[40%]
  ${isLeft
    ? 'text-right pr-4 sm:pr-8 lg:pr-16'
    : 'text-left pl-4 sm:pl-8 lg:pl-16'}
`}
      >
        <div className="relative inline-block">
          <motion.div
            whileHover={{ scale: 1.28, rotate: isLeft ? -10 : 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 12 }}
            className="mb-5 inline-block"
          >
            <detail.icon className="w-7 h-7 sm:w-9 sm:h-9 text-amber-600 drop-shadow-md" strokeWidth={1.4} />
          </motion.div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-gray-900 mb-3 tracking-tight">
            {detail.title}
          </h3>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-light italic leading-relaxed whitespace-pre-line">
            {detail.text}
          </p>
        </div>
      </motion.div>

      {/* Point central + particules */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <motion.div
          animate={isInView ? { scale: [1, 1.65, 1], opacity: [0.55, 1, 0.55] } : {}}
          transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 shadow-[0_0_28px_rgba(245,158,11,0.65),inset_0_0_9px_rgba(255,255,255,0.45)]"
        />

        {/* Étincelles autour du point */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [0, 1.8, 0],
              opacity: [0, 0.85, 0],
              x: [0, (i - 1.5) * 45, 0],
              y: [0, -35 - i * 12, 0],
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Espace vide pour l'autre côté (seulement visible sur sm+) */}
     <div className="w-[45%] sm:w-[42%] lg:w-[40%]" />
    </div>
  );
};

export default function Details() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    gsap.utils.toArray(".side-line").forEach((line, i) => {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: i % 2 === 0 ? "left center" : "right center" },
        {
          scaleX: 1,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            scrub: 1.3,
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-40 lg:py-52 px-5 sm:px-8 lg:px-12 bg-[#fffcf9] overflow-hidden"
    >
      {/* Fond glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[15%] left-[10%] w-[35%] h-[35%] bg-amber-50/60 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[8%] w-[28%] h-[28%] bg-rose-50/50 rounded-full blur-[140px] opacity-60 animate-pulse-slow delay-1000" />
      </div>

      {/* Titre */}
      <div className="max-w-6xl mx-auto text-center mb-24 sm:mb-32 lg:mb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="flex justify-center items-center gap-3 mb-6"
        >
         <div className="flex justify-center items-center gap-4 mb-6">
  {/* Étincelle de gauche */}
  <motion.div
    animate={{
      y: [0, -8, 0],
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.2, 1],
      rotate: [0, 15, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
  </motion.div>

  {/* Texte central */}
  <span className="uppercase tracking-[0.6em] text-xs sm:text-sm font-semibold text-amber-800/90">
    Moments Précieux
  </span>

  {/* Étincelle de droite (avec désordre : durée et rotation différentes) */}
  <motion.div
    animate={{
      y: [0, -10, 0], // Flotte un peu plus haut
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.1, 1],
      rotate: [0, -20, 0] // Tourne dans le sens opposé
    }}
    transition={{
      duration: 3.5, // Plus lente pour briser la symétrie parfaite
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.2 // Petit décalage pour ne pas être des robots
    }}
  >
    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
  </motion.div>
</div>
        </motion.div>

       <motion.h2
  initial={{ opacity: 0, scale: 0.88, y: 40 }}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
  /* Ajout de la police ici */
  className="text-7xl sm:text-8xl lg:text-9xl text-gray-900 drop-shadow-sm"
  style={{
    fontFamily: "'Great Vibes', cursive",
    fontWeight: 400,
    paddingBottom: "20px"
  }}
>
  Détails
</motion.h2>
      </div>

      {/* Ligne centrale */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200/40 -translate-x-1/2 pointer-events-none">
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/80 to-transparent origin-top shadow-[0_0_30px_rgba(245,158,11,0.5)]"
        />
      </div>

      {/* Lignes latérales décoratives */}
      <div className="side-line absolute top-[18%] left-[8%] w-[22%] h-[1px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent hidden sm:block" />
      <div className="side-line absolute bottom-[22%] right-[10%] w-[20%] h-[1px] bg-gradient-to-l from-transparent via-amber-300/50 to-transparent hidden sm:block" />

      {/* Timeline items */}
      <div className="relative flex-col items-center justify-center max-w-5xl mx-auto">
        {details.map((detail, index) => (
          <TimelineItem key={index} detail={detail} index={index} />
        ))}
      </div>

      {/* Fermeture */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.6 }}
        className="text-center mt-28 sm:mt-40 lg:mt-52"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-amber-600 mx-auto mb-6 drop-shadow-lg" strokeWidth={1} fill="currentColor" opacity={0.9} />
        </motion.div>
        <p className="font-serif italic text-xl sm:text-2xl text-gray-500/90">
          À très bientôt, dans la magie de ce jour...
        </p>
      </motion.div>

    </section>
  );
}
