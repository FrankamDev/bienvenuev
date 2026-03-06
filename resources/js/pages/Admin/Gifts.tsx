// export default function AdminGifts({ reservedGifts }) {
//     return (
//         <div>
//             <h1>Cadeaux sélectionnés</h1>
//             <ul>
//                 {reservedGifts.map(gift => (
//                     <li key={gift.id}>
//                         {gift.name} - Réservé par {gift.user.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


// import { router } from '@inertiajs/react';
// import { useState } from 'react';

// export default function Gifts({ gifts }) {

//     const [name, setName] = useState('');

//     const addGift = (e: any) => {
//         e.preventDefault();

//         router.post('/admin/gifts', { name }, {
//             preserveScroll: true,
//             onSuccess: () => setName('')
//         });
//     };

//     const deleteGift = (id: number) => {
//         router.delete(`/admin/gifts/${id}`, {
//             preserveScroll: true
//         });
//     };

//     return (
//         <div>
//             <h1>Gestion des cadeaux</h1>

//             <form onSubmit={addGift}>
//                 <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Nom du cadeau"
//                 />
//                 <button type="submit">Ajouter</button>
//             </form>

//             <hr />

//             {gifts.map((gift: any) => (
//                 <div key={gift.id}>
//                     {gift.name}

//                     <button
//                         onClick={() => deleteGift(gift.id)}
//                     >
//                         Supprimer
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }



import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Trash2, Gift, LayoutGrid } from 'lucide-react';

export default function Gifts({ gifts }: { gifts: any }) {
    const [name, setName] = useState('');

    const addGift = (e: any) => {
        e.preventDefault();
        if (!name.trim()) return;

        router.post('/admin/gifts', { name }, {
            preserveScroll: true,
            onSuccess: () => setName('')
        });
    };

    const deleteGift = (id: number) => {
        if (confirm('Voulez-vous vraiment supprimer ce cadeau ?')) {
            router.delete(`/admin/gifts/${id}`, {
                preserveScroll: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                        <LayoutGrid className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Gestion des cadeaux
                        </h1>
                        <p className="text-slate-500 text-sm">Organisez la liste des présents pour l'événement</p>
                    </div>
                </div>

                {/* Formulaire d'ajout */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                    <form onSubmit={addGift} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Gift className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Machine à café, Voyage..."
                                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 rounded-xl text-slate-700 placeholder:text-slate-400 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-md shadow-indigo-100"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Ajouter</span>
                        </button>
                    </form>
                </div>

                {/* Liste des cadeaux */}
                <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider ml-1">
                        Cadeaux enregistrés ({gifts.length})
                    </h2>

                    {gifts.length > 0 ? (
                        gifts.map((gift: any) => (
                            <div
                                key={gift.id}
                                className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        <Gift className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-700 text-lg">
                                        {gift.name}
                                    </span>
                                </div>

                                <button
                                    onClick={() => deleteGift(gift.id)}
                                    className="p-2 text-black hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    title="Supprimer"
                                >

                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400">Aucun cadeau pour le moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
