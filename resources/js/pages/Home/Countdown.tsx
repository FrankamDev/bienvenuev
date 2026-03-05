


// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './count.css';

// const targetDate = new Date('2026-04-10T00:00:00');

// const calculateTimeLeft = () => {
//   const difference = +targetDate - +new Date();
//   let timeLeft = {};

//   if (difference > 0) {
//     timeLeft = {
//       jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / 1000 / 60) % 60),
//       secondes: Math.floor((difference / 1000) % 60),
//     };
//   }

//   return timeLeft;
// };

// const Countdown = () => {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const TimeUnit = ({ value, label }) => (
//     <div className="flex flex-col items-center">
//       <div className="digit-box gold-glow rounded-2xl p-4 sm:p-6 mb-3 overflow-hidden">
//         <AnimatePresence mode="popLayout">
//           <motion.span
//             key={value}
//             initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
//             animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
//             exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
//             transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
//             className="block font-serif-premium text-3xl sm:text-5xl text-gray-800"
//           >
//             {value < 10 ? `0${value}` : value}
//           </motion.span>
//         </AnimatePresence>
//       </div>
//       <span className="font-serif-premium text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-700 font-bold">
//         {label}
//       </span>
//     </div>
//   );

//   return (
//     <section className="countdown-container py-24 px-6 overflow-hidden">
//       <div className="max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <span className="font-script text-4xl text-amber-800/60 block mb-2">
//             Chaque seconde nous rapproche...
//           </span>
//           <h2 className="font-serif-premium text-2xl sm:text-4xl text-gray-800 tracking-tight">
//             Le Grand Jour
//           </h2>
//           <div className="w-16 h-[1px] bg-amber-300 mx-auto mt-6" />
//         </motion.div>

//         <div className="flex justify-center items-center gap-2 sm:gap-6">
//           <TimeUnit value={timeLeft.jours || 0} label="Jours" />
//           <div className="separator-dot mb-8 text-amber-400 text-xl font-serif">•</div>
//           <TimeUnit value={timeLeft.heures || 0} label="Heures" />
//           <div className="separator-dot mb-8 text-amber-400 text-xl font-serif">•</div>
//           <TimeUnit value={timeLeft.minutes || 0} label="Min" />
//           <div className="separator-dot mb-8 text-amber-400 text-xl font-serif">•</div>
//           <TimeUnit value={timeLeft.secondes || 0} label="Sec" />
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-16"
//         >
//           <p className="font-lora italic text-gray-500 text-sm sm:text-base">
//             Bafoussam vous attend pour une célébration inoubliable.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Countdown;






import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './count.css';

const targetDate = new Date('2026-04-10T00:00:00');

const calculateTimeLeft = () => {
  const difference = +targetDate - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
      heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      secondes: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="digit-box gold-glow rounded-2xl p-4 sm:p-6 mb-3 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="block font-serif-premium text-3xl sm:text-5xl text-gray-800"
          >
            {value < 10 ? `0${value}` : value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-serif-premium text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-700 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <section className="countdown-container py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-script text-4xl text-amber-800/60 block mb-2">
            Chaque seconde nous rapproche...
          </span>
          <h2 className="font-serif-premium text-2xl sm:text-4xl text-gray-800 tracking-tight">
            Le Grand Jour
          </h2>
          <div className="w-16 h-[1px] bg-amber-300 mx-auto mt-6" />
        </motion.div>

        <div className="flex justify-center items-center gap-2 sm:gap-6">
          <TimeUnit value={timeLeft.jours || 0} label="Jours" />
          <div className="separator-dot mb-8 text-amber-400 text-xl font-serif">•</div>
          <TimeUnit value={timeLeft.heures || 0} label="Heures" />
          <div className="separator-dot mb-8 text-amber-400 text-xl font-serif">•</div>
          <TimeUnit value={timeLeft.minutes || 0} label="Min" />
          <div className="separator-dot mb-8 text-amber-400 text-xl font-serif">•</div>
          <TimeUnit value={timeLeft.secondes || 0} label="Sec" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <p className="font-lora italic text-gray-500 text-sm sm:text-base">
            Bafoussam vous attend pour une célébration inoubliable.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
