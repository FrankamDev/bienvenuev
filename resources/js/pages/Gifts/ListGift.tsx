// import { useState } from 'react';
// import { router, usePage } from '@inertiajs/react';

// interface Gift {
//   id: number;
//   name: string;
// }

// interface Props {
//   gifts: Gift[];
// }

// export default function ListGift({ gifts = [] }: Props) {
//   const [availableGifts, setAvailableGifts] = useState<Gift[]>(gifts);

//   const handleReserve = (id: number) => {
//     if (!confirm('Voulez-vous vraiment réserver ce cadeau ?')) return;

//     router.post(
//       `/gifts/${id}/reserve`,
//       {},
//       {
//         preserveState: true,
//         preserveScroll: true,
//         onSuccess: () => {
//           setAvailableGifts((prev) => prev.filter((g) => g.id !== id));
//           alert('Cadeau réservé avec succès ! Merci ❤️');
//         },
//         onError: (errors) => {
//           alert(errors.error || 'Ce cadeau a déjà été pris par quelqu’un d’autre.');
//         },
//         onFinish: () => {
//           // optionnel : scroll vers le haut ou autre
//         },
//       }
//     );
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
//         Bienvenue sur notre liste de mariage
//       </h1>

//       <section>
//         <h2>Cadeaux encore disponibles</h2>

//         {availableGifts.length > 0 ? (
//           <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
//             {availableGifts.map((gift) => (
//               <li
//                 key={gift.id}
//                 style={{
//                   padding: '1.5rem',
//                   border: '1px solid #e0e0e0',
//                   borderRadius: '12px',
//                   background: '#fafafa',
//                 }}
//               >
//                 <h3 style={{ margin: '0 0 1rem 0' }}>{gift.name}</h3>
//                 <button
//                   onClick={() => handleReserve(gift.id)}
//                   style={{
//                     padding: '0.75rem 1.5rem',
//                     background: '#4CAF50',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '1rem',
//                   }}
//                 >
//                   Je réserve ce cadeau
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p style={{ fontSize: '1.2rem', color: '#555', textAlign: 'center' }}>
//             Tous les cadeaux ont déjà trouvé preneur ! Merci infiniment ❤️
//           </p>
//         )}
//       </section>

//       {/* Ajoute ici le reste de ta page d'accueil : photos, texte, FAQ, etc. */}
//     </div>
//   );
// }






import { useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Home({ gifts: initialGifts, auth }) {
  const [gifts, setGifts] = useState(initialGifts || []);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const { data, setData, post, processing, errors, reset } = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      gift_id: null,
    });
    // const {auth} = usePage().props;

//   const handleReserve = (gift) => {

//       router.post(`/gifts/${gift.id}/reserve`, {}, {
//         preserveState: true,
//         onSuccess: () => {
//           setGifts(prev => prev.filter(g => g.id !== gift.id));
//         },
//         onError: (err) => {
//           console.error('Erreur réservation', err);
//         },
//       });

//   };
const handleReserve = (gift) => {
  setSelectedGiftId(gift.id);
  setData('gift_id', gift.id);
};
  const handleQuickRegister = (e) => {
    e.preventDefault();
    // POST vers l'URL en dur (comme défini dans routes/web.php)
   post('/person', {
       preserveState: true,
  onSuccess: () => {
      setGifts(prev => prev.filter(g => g.id !== selectedGiftId));
      setSelectedGiftId(null);
    reset();
  }
});
  };


//    post('/people', {
//       onSuccess: () => {
//         reset();
//       },
//       onError: (err) => {
//         console.error('Erreur inscription + réservation', err);
//       },
//     });
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Cadeaux disponibles</h1>

      {gifts.length === 0 && (
        <p className="text-center text-gray-600">Aucun cadeau disponible pour le moment.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map(gift => (
          <div key={gift.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-medium mb-4">{gift.name}</h3>
            <button
              onClick={() => handleReserve(gift)}
              className="bg-green-600 text-white px-6 py-3 rounded w-full hover:bg-green-700"
              disabled={processing}
            >
              Réserver
            </button>
          </div>
        ))}
      </div>


      {usePage().props.success && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-8 py-4 rounded-lg shadow-lg max-w-xl text-center z-50">

        </div>
      )}


      {selectedGiftId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-8 rounded-xl w-full max-w-md">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Réserver ce cadeau
      </h2>

      <form onSubmit={handleQuickRegister} className="space-y-4">

        <input
          type="text"
          placeholder="Votre nom"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          className="w-full px-4 py-3 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Votre email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          className="w-full px-4 py-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Réserver
        </button>

        <button
          type="button"
          onClick={() => setSelectedGiftId(null)}
          className="w-full text-gray-500 underline"
        >
          Annuler
        </button>

      </form>

    </div>

  </div>
)}
    </div>
  );
}
