
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Send, Sparkles } from 'lucide-react';
import './a.css';
import Countdown from './Countdown';

gsap.registerPlugin(ScrollTrigger);

export default function RSVP() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const heartRefs = useRef([]);

  // Animation de parallaxe douce au scroll avec Framer
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yRange = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    // Animation des coeurs GSAP (flottement aléatoire)
    heartRefs.current.forEach((heart, i) => {
      gsap.to(heart, {
        y: "-=100",
        x: "random(-50, 50)",
        rotation: "random(-45, 45)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });

    // Révélation de la carte au scroll
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, rotateX: 20 },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  const message = "Votre présence est le plus beau des cadeaux.\nConfirmez votre venue pour ce jour inoubliable.";

  return (
    <section
      ref={sectionRef}
      className="rsvp-section relative py-24 sm:py-40 px-6 overflow-hidden flex flex-col items-center"
    >
      {/* Background Decor : Coeurs et étincelles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => (heartRefs.current[i] = el)}
            className="absolute text-amber-200/30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          >
            <Heart size={20 + i * 10} fill="currentColor" strokeWidth={0} />
          </div>
        ))}
      </div>

      {/* Titre Editorial */}
      <motion.div
        style={{ y: yRange }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="font-script text-7xl sm:text-9xl text-gray-900 mb-4">
          RSVP
        </h2>
        <div className="flex items-center justify-center gap-4 text-amber-600">
          <div className="h-[1px] w-12 bg-amber-200" />
          <Sparkles size={16} className="animate-pulse" />
          <div className="h-[1px] w-12 bg-amber-200" />
        </div>
      </motion.div>

      {/* Carte d'invitation Glassmorphism */}
      <div
        ref={cardRef}
        className="rsvp-card relative z-10 w-full max-w-2xl p-8 sm:p-20 rounded-[3rem] text-center"
      >
        <motion.p
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="font-serif-premium text-xl sm:text-3xl text-gray-800 leading-relaxed mb-12 italic"
>
  {message.split(" ").map((word, i) => (
    <motion.span
      key={i}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ delay: i * 0.03 }}
      className="inline-block"
    >
      {word}&nbsp;
    </motion.span>
  ))}
</motion.p>

        {/* Bouton de confirmation Noir & Or */}
        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSek_vOcfDBKhKOx4HSg4jVJcoDoa9U87Fo4DoM3GnKORtQdXA/viewform?usp=publish-editor/"
          target="_blank"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="btn-shimmer inline-flex items-center gap-4 px-12 py-4 rounded-[6px] text-white shadow-2xl group"
        >
          <span className="relative z-10 font-serif-premium font-bold tracking-[0.2em] uppercase text-sm sm:text-base flex items-center gap-3">
            Confirmer ma présence
            <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
          </span>
        </motion.a>

        <p className="mt-12 font-lora text-gray-400 text-sm tracking-widest uppercase">
          Réponse souhaitée avant le 15 Mars 2026
        </p>
      </div>

      {/* Footer ultra-minimaliste */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-32 text-center"
      >
        <p className="font-script text-4xl text-amber-900/40">Clémence & Elias</p>
        <div className="mt-4 flex justify-center gap-2">
           {[...Array(3)].map((_,i) => (
             <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-200" />
           ))}
        </div>
        <Countdown/>
      </motion.div>
    </section>
  );
}
