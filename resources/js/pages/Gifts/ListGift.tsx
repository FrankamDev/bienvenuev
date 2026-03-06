import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail, User, CheckCircle, X, Loader2 } from 'lucide-react';

export default function Home({ gifts: initialGifts }) {
  const [gifts, setGifts] = useState(initialGifts || []);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data, setData, post, processing, reset } = useForm({
    name: '',
    email: '',
    password: 'password', // Valeur par défaut si non requise par l'utilisateur
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
    <div className="min-h-screen bg-[#FDFCFB] py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif italic text-slate-800 mb-4"
          >
            Liste de Mariage
          </motion.h1>
          <p className="text-slate-500 tracking-widest uppercase text-sm">Cadeaux disponibles</p>
          <div className="w-16 h-1 bg-amber-200 mx-auto mt-4 rounded-full"></div>
        </header>

        {/* Grille de cadeaux */}
        {gifts.length === 0 ? (
          <p className="text-center text-gray-400 italic">Tous les cadeaux ont été réservés. Merci !</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {gifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="mb-6 inline-flex p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <Gift size={28} />
                  </div>
                  <h3 className="text-xl font-serif text-slate-800 mb-6">{gift.name}</h3>
                  <button
                    onClick={() => handleReserve(gift)}
                    disabled={processing}
                    className="w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors active:scale-95 disabled:opacity-50"
                  >
                    Réserver
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Modal Formulaire */}
        <AnimatePresence>
          {selectedGiftId && (
            <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGiftId(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white p-8 md:p-10 rounded-[2rem] w-full max-w-md shadow-2xl"
              >
                <button
                  onClick={() => setSelectedGiftId(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-serif text-center mb-2">Réserver ce cadeau</h2>
                <p className="text-center text-slate-500 text-sm mb-8">Veuillez entrer vos coordonnées</p>

                <form onSubmit={handleQuickRegister} className="space-y-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-200 transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-200 transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold shadow-lg shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-2"
                  >
                    {processing ? <Loader2 className="animate-spin" /> : "Confirmer la réservation"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Message de Succès */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 100, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-10 left-1/2 z-[100] w-full max-w-sm px-4"
            >
              <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="font-bold">Merci infiniment !</p>
                  <p className="text-sm opacity-90">{successMessage || "Votre réservation a été enregistrée."}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}





// import { useForm, router, usePage } from '@inertiajs/react';
// import { useState } from 'react';

// export default function Home({ gifts: initialGifts, auth }) {
//   const [gifts, setGifts] = useState(initialGifts || []);
//   const [selectedGiftId, setSelectedGiftId] = useState(null);
//   const { data, setData, post, processing, errors, reset } = useForm({
//       name: '',
//       email: '',
//       password: '',
//       password_confirmation: '',
//       gift_id: null,
//     });

// const handleReserve = (gift) => {
//   setSelectedGiftId(gift.id);
//   setData('gift_id', gift.id);
// };
//   const handleQuickRegister = (e) => {
//     e.preventDefault();
//     // POST vers l'URL en dur (comme défini dans routes/web.php)
//    post('/person', {
//        preserveState: true,
//   onSuccess: () => {
//       setGifts(prev => prev.filter(g => g.id !== selectedGiftId));
//       setSelectedGiftId(null);
//     reset();
//   }
// });
//   };



//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8 text-center">Cadeaux disponibles</h1>

//       {gifts.length === 0 && (
//         <p className="text-center text-gray-600">Aucun cadeau disponible pour le moment.</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {gifts.map(gift => (
//           <div key={gift.id} className="border rounded-lg p-6 bg-white shadow-sm">
//             <h3 className="text-xl font-medium mb-4">{gift.name}</h3>
//             <button
//               onClick={() => handleReserve(gift)}
//               className="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700"
//               disabled={processing}
//             >
//               Réserver
//             </button>
//           </div>
//         ))}
//       </div>


//       {usePage().props.success && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-8 py-4 rounded-lg shadow-lg max-w-xl text-center z-50">

//         </div>
//       )}


//       {selectedGiftId && (
//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//     <div className="bg-white p-8 rounded-xl w-full max-w-md">

//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Réserver ce cadeau
//       </h2>

//       <form onSubmit={handleQuickRegister} className="space-y-4">

//         <input
//           type="text"
//           placeholder="Votre nom"
//           value={data.name}
//           onChange={e => setData('name', e.target.value)}
//           className="w-full px-4 py-3 border rounded"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Votre email"
//           value={data.email}
//           onChange={e => setData('email', e.target.value)}
//           className="w-full px-4 py-3 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded"
//         >
//           Réserver
//         </button>

//         <button
//           type="button"
//           onClick={() => setSelectedGiftId(null)}
//           className="w-full text-gray-500 underline"
//         >
//           Annuler
//         </button>

//       </form>

//     </div>

//   </div>
// )}
//     </div>
//   );
// }
