

import { motion } from 'framer-motion';
import { Sparkles, Shirt } from 'lucide-react';

const colors = [
  {
    name: "Lime Zest",
    hex: "#CDE6C5",
    description: "Une touche de fraîcheur printanière pour illuminer nos souvenirs.",
    height: "h-64",
    delay: 0.1
  },
  {
    name: "Soleil d'Avril",
    hex: "#FB9D42",
    description: "La chaleur de l'instant, capturée dans une nuance dorée.",
    height: "h-80",
    delay: 0.3
  },
  {
    name: "Noir Doux",
    hex: "#2F3132",
    description: "L'élégance intemporelle pour une soirée sous les étoiles.",
    height: "h-72",
    delay: 0.5
  }
];

export default function Colors() {
  return (
    <section className="py-24 px-6 bg-[#fffcf9]">
      <div className="max-w-4xl mx-auto">

        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mb-4 text-amber-800"
          >
            <Shirt className="w-5 h-5" strokeWidth={1.5} />
            <span className="uppercase tracking-[0.4em] text-xs font-bold">Dress Code</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl sm:text-7xl font-light mb-6 text-gray-900"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            L'Harmonie des Couleurs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            className="max-w-md mx-auto text-gray-600 italic font-serif"
          >
            Pour sublimer cette journée, nous vous invitons à composer vos tenues selon cette palette inspirée.
          </motion.p>
        </div>

        {/* Layout Pinterest-style (Grille asymétrique) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: color.delay,
                ease: [0.21, 1.11, 0.81, 0.99]
              }}
              className={`relative group break-inside-avoid rounded-3xl overflow-hidden shadow-sm transition-shadow hover:shadow-xl`}
            >
              {/* Carré de couleur */}
              <div
                className={`w-full ${color.height} transition-transform duration-700 group-hover:scale-105`}
                style={{ backgroundColor: color.hex }}
              >
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Infos couleur */}
              <div className="p-6 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-serif text-xl text-gray-900 font-semibold">{color.name}</h3>
                  <div className="w-4 h-4 rounded-full border border-gray-100" style={{ backgroundColor: color.hex }} />
                </div>
                <p className="text-sm text-gray-500 font-light leading-relaxed italic">
                  {color.description}
                </p>
              </div>

              {/* Petit Sparkle décoratif en bas à droite */}
              <Sparkles className="absolute top-4 right-4 w-4 h-4 text-white/50 mix-blend-overlay" />
            </motion.div>
          ))}
        </div>

        {/* Note Finale */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-900/40">
            Votre présence est notre plus bel éclat
          </p>
        </motion.div>
      </div>
    </section>
  );
}
