// import { useForm, usePage } from '@inertiajs/react';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Gift, Mail, User, CheckCircle, X, Loader2 } from 'lucide-react';

// export default function Home({ gifts: initialGifts }) {
//   const [gifts, setGifts] = useState(initialGifts || []);
//   const [selectedGiftId, setSelectedGiftId] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const { data, setData, post, processing, reset } = useForm({
//     name: '',
//     email: '',
//     password: 'password', // Valeur par défaut si non requise par l'utilisateur
//     password_confirmation: 'password',
//     gift_id: null,
//   });

//   const successMessage = usePage().props.success;

//   useEffect(() => {
//     if (successMessage) {
//       setShowSuccess(true);
//       const timer = setTimeout(() => setShowSuccess(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const handleReserve = (gift) => {
//     setSelectedGiftId(gift.id);
//     setData('gift_id', gift.id);
//   };

//   const handleQuickRegister = (e) => {
//     e.preventDefault();
//     post('/person', {
//       preserveState: true,
//       onSuccess: () => {
//         setGifts(prev => prev.filter(g => g.id !== selectedGiftId));
//         setSelectedGiftId(null);
//         reset();
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFCFB] py-12 px-6 font-sans">
//       <div className="max-w-5xl mx-auto">

//         {/* Header */}
//         <header className="text-center mb-16">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-5xl font-serif italic text-slate-800 mb-4"
//           >
//             Liste de Mariage
//           </motion.h1>
//           <p className="text-slate-500 tracking-widest uppercase text-sm">Cadeaux disponibles</p>
//           <div className="w-16 h-1 bg-amber-200 mx-auto mt-4 rounded-full"></div>
//         </header>

//         {/* Grille de cadeaux */}
//         {gifts.length === 0 ? (
//           <p className="text-center text-gray-400 italic">Tous les cadeaux ont été réservés. Merci !</p>
//         ) : (
//           <motion.div
//             layout
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             <AnimatePresence>
//               {gifts.map((gift, index) => (
//                 <motion.div
//                   key={gift.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center"
//                 >
//                   <div className="mb-6 inline-flex p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
//                     <Gift size={28} />
//                   </div>
//                   <h3 className="text-xl font-serif text-slate-800 mb-6">{gift.name}</h3>
//                   <button
//                     onClick={() => handleReserve(gift)}
//                     disabled={processing}
//                     className="w-full py-3 px-6 bg-slate-900 text-white rounded-[7px] font-medium hover:bg-slate-700 transition-colors active:scale-95 disabled:opacity-50"
//                   >
//                     Réserver
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* Modal Formulaire */}
//         <AnimatePresence>
//           {selectedGiftId && (
//             <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setSelectedGiftId(null)}
//                 className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
//               />

//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                 className="relative bg-white p-8 md:p-10 rounded-[2rem] w-full max-w-md shadow-2xl"
//               >
//                 <button
//                   onClick={() => setSelectedGiftId(null)}
//                   className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
//                 >
//                   <X size={24} />
//                 </button>

//                 <h2 className="text-2xl font-serif text-center mb-2">Réserver ce cadeau</h2>
//                 <p className="text-center text-slate-500 text-sm mb-8">Veuillez entrer vos coordonnées</p>

//                 <form onSubmit={handleQuickRegister} className="space-y-5">
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                     <input
//                       type="text"
//                       placeholder="Ex: Frank Kamgang"
//                       value={data.name}
//                       onChange={e => setData('name', e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-200 transition-all"
//                       required
//                     />
//                   </div>

//                   <div className="relative">
//                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                     <input
//                       type="email"
//                       placeholder="Ex: frankamdev@gmail.com"
//                       value={data.email}
//                       onChange={e => setData('email', e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-200 transition-all"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={processing}
//                     className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold shadow-lg shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-2"
//                   >
//                     {processing ? <Loader2 className="animate-spin" /> : "Confirmer la réservation"}
//                   </button>
//                 </form>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Message de Succès */}
//         <AnimatePresence>
//           {showSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: 100, x: '-50%' }}
//               animate={{ opacity: 1, y: 0, x: '-50%' }}
//               exit={{ opacity: 0, y: 20, x: '-50%' }}
//               className="fixed bottom-10 left-1/2 z-[100] w-full max-w-sm px-4"
//             >
//               <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
//                 <div className="bg-white/20 p-2 rounded-full">
//                   <CheckCircle size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold">Merci infiniment !</p>
//                   <p className="text-sm opacity-90">{successMessage || "Votre réservation a été enregistrée."}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// }


// import { useForm, usePage } from '@inertiajs/react';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Gift, Mail, User, CheckCircle, X, Loader2, ChevronDown } from 'lucide-react';

// export default function Home({ gifts: initialGifts }) {
//   const [gifts, setGifts] = useState(initialGifts || []);
//   const [selectedGiftId, setSelectedGiftId] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false); // État pour le déroulement

//   const { data, setData, post, processing, reset } = useForm({
//     name: '',
//     email: '',
//     password: 'password',
//     password_confirmation: 'password',
//     gift_id: null,
//   });

//   const successMessage = usePage().props.success;

//   useEffect(() => {
//     if (successMessage) {
//       setShowSuccess(true);
//       const timer = setTimeout(() => setShowSuccess(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const handleReserve = (gift) => {
//     setSelectedGiftId(gift.id);
//     setData('gift_id', gift.id);
//   };

//   const handleQuickRegister = (e) => {
//     e.preventDefault();
//     post('/person', {
//       preserveState: true,
//       onSuccess: () => {
//         setGifts(prev => prev.filter(g => g.id !== selectedGiftId));
//         setSelectedGiftId(null);
//         reset();
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFCFB] py-20 px-6 font-sans text-slate-900">
//       <div className="max-w-5xl mx-auto">

//         {/* Header Prestige */}
//         <header className="text-center mb-12">
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-[#B89D64] tracking-[0.4em] uppercase text-xs mb-4 block font-medium"
//           >
//             Gifts Registry
//           </motion.span>
//           <motion.h1
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-7xl font-serif italic mb-6"
//           >
//             Liste de Mariage
//           </motion.h1>
//           <p className="max-w-lg mx-auto text-slate-500 font-serif italic text-lg leading-relaxed">
//             Votre présence est notre plus beau cadeau, mais si vous souhaitez nous gâter, voici quelques idées qui nous touchent.
//           </p>
//         </header>

//         {/* Bouton de Déroulement (Trigger) */}
//         <div className="flex justify-center mb-12">
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="group flex flex-col items-center gap-3 transition-all duration-500 outline-none"
//           >
//             <div className={`flex items-center gap-4 px-10 py-5 bg-white border border-[#B89D64]/20 rounded-full shadow-lg transition-all duration-500 ${isExpanded ? 'bg-slate-900 text-white border-transparent scale-105' : 'hover:border-[#B89D64] shadow-amber-100/50'}`}>
//               <Gift className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-[#B89D64]'}`} />
//               <span className="font-medium tracking-wide uppercase text-sm">
//                 {isExpanded ? "Réduire la liste" : "Découvrir les cadeaux"}
//               </span>
//               <motion.div
//                 animate={{ rotate: isExpanded ? 180 : 0 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 <ChevronDown className="w-5 h-5 opacity-50" />
//               </motion.div>
//             </div>
//             {!isExpanded && (
//                 <span className="text-[10px] text-slate-400 uppercase tracking-widest animate-pulse">
//                   Cliquez pour explorer
//                 </span>
//             )}
//           </button>
//         </div>

//         {/* Conteneur des cadeaux avec Animation de déroulement */}
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//               className="overflow-hidden"
//             >
//               {gifts.length === 0 ? (
//                 <div className="text-center py-20 bg-white/50 rounded-[3rem] border border-dashed border-slate-200">
//                   <p className="text-slate-400 font-serif italic text-xl">Tous les cadeaux ont déjà trouvé preneur...</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
//                     {gifts.map((gift, index) => (
//                       <motion.div
//                         key={gift.id}
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center"
//                       >
//                         <div className="mb-8 inline-flex p-5 bg-[#FAF9F6] rounded-full text-[#B89D64] group-hover:bg-[#B89D64] group-hover:text-white transition-all duration-500">
//                           <Gift size={32} strokeWidth={1.5} />
//                         </div>
//                         <h3 className="text-2xl font-serif text-slate-800 mb-8 px-2 leading-tight">
//                           {gift.name}
//                         </h3>
//                         <button
//                           onClick={() => handleReserve(gift)}
//                           disabled={processing}
//                           className="w-full py-4 px-8 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B89D64] transition-all active:scale-95 disabled:opacity-30"
//                         >
//                           Réserver
//                         </button>
//                       </motion.div>
//                     ))}
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Modal Formulaire (Design Haute Couture) */}
//         <AnimatePresence>
//           {selectedGiftId && (
//             <div className="fixed inset-0 flex items-center justify-center z-[100] p-6">
//               <motion.div
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                 onClick={() => setSelectedGiftId(null)}
//                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
//               />

//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 40 }}
//                 className="relative bg-white p-10 md:p-14 rounded-[3rem] w-full max-w-lg shadow-2xl"
//               >
//                 <button onClick={() => setSelectedGiftId(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
//                   <X size={28} />
//                 </button>

//                 <div className="text-center mb-10">
//                   <span className="text-[#B89D64] uppercase text-[10px] tracking-[0.3em] font-bold">Confirmation</span>
//                   <h2 className="text-3xl font-serif mt-2">Réserver ce cadeau</h2>
//                   <div className="w-10 h-[1px] bg-slate-200 mx-auto mt-4"></div>
//                 </div>

//                 <form onSubmit={handleQuickRegister} className="space-y-6">
//                   <div className="group border-b border-slate-100 focus-within:border-[#B89D64] transition-all py-2">
//                     <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Votre Nom</label>
//                     <div className="flex items-center gap-3 px-1">
//                       <User className="text-slate-300 group-focus-within:text-[#B89D64]" size={20} />
//                       <input
//                         type="text" placeholder="ex: Jean Dupont"
//                         value={data.name} onChange={e => setData('name', e.target.value)}
//                         className="w-full py-2 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-200" required
//                       />
//                     </div>
//                   </div>

//                   <div className="group border-b border-slate-100 focus-within:border-[#B89D64] transition-all py-2">
//                     <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Votre Email</label>
//                     <div className="flex items-center gap-3 px-1">
//                       <Mail className="text-slate-300 group-focus-within:text-[#B89D64]" size={20} />
//                       <input
//                         type="email" placeholder="votre@email.com"
//                         value={data.email} onChange={e => setData('email', e.target.value)}
//                         className="w-full py-2 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-200" required
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit" disabled={processing}
//                     className="w-full mt-8 bg-slate-900 text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-200 hover:bg-[#B89D64] hover:shadow-[#B89D64]/20 transition-all flex items-center justify-center gap-3"
//                   >
//                     {processing ? <Loader2 className="animate-spin" /> : "Finaliser la réservation"}
//                   </button>
//                 </form>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Success Toast Premium */}
//         <AnimatePresence>
//           {showSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: 50, x: '-50%' }}
//               animate={{ opacity: 1, y: 0, x: '-50%' }}
//               exit={{ opacity: 0, scale: 0.9, x: '-50%' }}
//               className="fixed bottom-12 left-1/2 z-[110] w-full max-w-sm px-6"
//             >
//               <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-5 border border-white/10">
//                 <div className="bg-[#B89D64] p-2 rounded-full shadow-lg shadow-[#B89D64]/40">
//                   <CheckCircle size={24} strokeWidth={3} />
//                 </div>
//                 <div>
//                   <p className="font-serif italic text-lg">C'est merveilleux !</p>
//                   <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">{successMessage || "Réservation confirmée."}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// }



import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ChevronDown, Check, Loader2, X, Sparkles, Heart } from 'lucide-react';

export default function Home({ gifts: initialGifts }) {
  const [gifts, setGifts] = useState(initialGifts || []);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data, setData, post, processing, reset } = useForm({
    name: '',
    email: '',
    password: 'password',
    password_confirmation: 'password',
    gift_id: null,
  });

  const successMessage = usePage().props.success;

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleReserve = (gift) => {
    setSelectedGiftId(gift.id);
    setData('gift_id', gift.id);
  };

  const handleQuickRegister = (e) => {
    e.preventDefault();
    post('/person', {
      preserveState: true,
      onSuccess: () => {
        setGifts(prev => prev.filter(g => g.id !== selectedGiftId));
        setSelectedGiftId(null);
        reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 font-sans text-slate-800">
      <div className="max-w-md mx-auto">

        {/* En-tête minimaliste */}
        <div className="text-center mb-12">
          <Heart className="mx-auto text-amber-500 mb-4 opacity-50" size={24} />
          <h1 className="text-2xl font-serif italic mb-2">Nos petits présents</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Liste de mariage</p>
        </div>

        {/* Accordéon élégant */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-5 flex items-center justify-between text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            <span>cliquez Voir la liste des cadeaux ({gifts.length})</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown size={16} className="text-slate-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-2 pb-2"
              >
                <div className="space-y-1">
                  {gifts.length > 0 ? gifts.map((gift) => (
                    <div key={gift.id} className="flex items-center justify-between px-4 py-4 bg-slate-50 rounded-2xl">
                      <span className="text-sm text-slate-700 truncate mr-4">{gift.name}</span>
                      <button
                        onClick={() => handleReserve(gift)}
                        className="text-[9px] font-bold uppercase tracking-widest bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-amber-600 transition-all active:scale-95"
                      >
                        Offrir
                      </button>
                    </div>
                  )) : <p className="text-center p-6 text-xs text-slate-400 italic">Tous réservés. Merci !</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal "Haute Couture" */}
        <AnimatePresence>
          {selectedGiftId && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedGiftId(null)}
                className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-white w-full max-w-[320px] rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100"
              >
                <button onClick={() => setSelectedGiftId(null)} className="absolute top-5 right-5 text-slate-300 hover:text-slate-600 transition-colors">
                  <X size={18}/>
                </button>
                <div className="text-center mb-6">
                  <h2 className="text-lg font-serif text-slate-800">Votre attention</h2>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Réservation cadeau</p>
                </div>
                <form onSubmit={handleQuickRegister} className="space-y-3">
                  <input type="text" placeholder="Ex: Frank Kamgang" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full text-xs p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" required />
                  <input type="email" placeholder="Ex: frankamdev@gmail.com" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full text-xs p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" required />
                  <button type="submit" disabled={processing} className="w-full py-3 mt-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-900 text-white rounded-xl hover:bg-amber-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    {processing ? <Loader2 className="animate-spin" size={14}/> : "Valider"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Toast Premium */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="fixed bottom-8 left-0 right-0 mx-auto z-[70] w-max px-6"
            >
              <div className="bg-white text-slate-800 py-3 px-6 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center gap-3 border border-slate-100">
                <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[11px] font-medium tracking-wide">
                  Cadeau réservé avec succès
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
