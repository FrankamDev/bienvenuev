import React from 'react';
import { GlassWater, Music, Utensils, Sparkles } from 'lucide-react'; // Si tu utilises lucide-react

interface PartyStep {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PartySection: React.FC = () => {
  const steps: PartyStep[] = [
    {
      time: "22:00",
      title: "Cocktail de Bienvenue",
      description: "Rafraîchissements et amuses-bouches sur la terrasse.",
      icon: <GlassWater className="w-6 h-6" />,
    },
    {
      time: "20:30",
      title: "Dîner de Gala",
      description: "Un voyage culinaire pour célébrer notre union.",
      icon: <Utensils className="w-6 h-6" />,
    },
    {
      time: "22:30",
      title: "Ouverture du Bal",
      description: "Préparez vos plus beaux pas de danse !",
      icon: <Music className="w-6 h-6" />,
    },
    {
      time: "Minuit",
      title: "Soirée Dansante & Surprise",
      description: "La fête continue jusqu'au bout de la nuit.",
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-[#faf9f6] overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <span className="text-[15rem] font-serif">Party</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a4a4a] mb-4">
            La Soirée
          </h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6"></div>
          <p className="text-gray-600 italic font-light">
            Célébrons ensemble ce nouveau chapitre à partir de <span className="font-semibold">22h00</span>.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-b-4 border-b-transparent hover:border-b-[#d4af37]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#faf4e6] text-[#b08d26] rounded-full group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <div>
                  <span className="text-[#d4af37] font-medium tracking-widest text-sm uppercase">
                    {step.time}
                  </span>
                  <h3 className="text-xl font-serif text-gray-800 mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm tracking-[0.2em] text-gray-400 uppercase">
            Dress Code : Élégant & Festif
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartySection;
