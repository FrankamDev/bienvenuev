import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import Gifts from './Admin/Gifts';
import { Edit2, User, Ruler, CheckCircle2, Circle, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard(props: any) {

    const { auth, gifts = [] } = usePage().props as any;

    const [editingGift, setEditingGift] = useState<any>(null);
    const [name, setName] = useState('');

    const handleDelete = (id: number) => {
        router.delete(`/gifts/${id}`, {
            preserveScroll: true,
        });
    };

    const handleUpdate = (e: any) => {
    e.preventDefault();

    if (!editingGift) return;

    router.put(`/gifts/${editingGift.id}`, {
        name,
    }, {
        preserveScroll: true,
        onSuccess: () => {
            setEditingGift(null);
        }
    });
};
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <h1 className="text-2xl font-bold mb-6">
                Hello {auth?.user?.name}
            </h1>



<div className="max-w-4xl mx-auto p-4">
        {/* Liste des cadeaux */}
        <div className="grid gap-4">
            {gifts.map((gift: any) => (
                <motion.div
                    layout
                    key={gift.id}
                    className="group bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Info Principale */}
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${gift.reserved ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                <CheckCircle2 size={24} className={gift.reserved ? 'opacity-100' : 'opacity-20'} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{gift.name}</h3>
                                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Ruler size={14} /> {gift.height ?? 'N/A'} cm
                                    </span>
                                    <span>•</span>
                                    <span className={`flex items-center gap-1 font-medium ${gift.reserved ? 'text-emerald-600' : 'text-amber-500'}`}>
                                        {gift.reserved ? 'Réservé' : 'Disponible'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Réservataire & Actions */}
                        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                            {gift.reserved && (
                                <div className="flex items-center gap-3 text-right">
                                    <div className="">
                                        <p className="text-sm font-semibold text-black">Par - <span className='text-[.9rem]'>{gift.person?.name}</span></p>
                                        <p className="text-xs text-black">{gift.person?.email}</p>
                                    </div>
                                    <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center">
                                        <User size={16} />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setEditingGift(gift)}
                                className="p-2.5 bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm"
                            >
                                <Edit2 size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Modal d'édition */}
        <AnimatePresence>
            {editingGift && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEditingGift(null)}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Modifier le cadeau</h2>
                                <button onClick={() => setEditingGift(null)} className="text-slate-400 hover:text-slate-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2 ml-1">Nom du cadeau</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-slate-700 font-medium"
                                        placeholder="Nom du cadeau"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-grow flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                    >
                                        <Save size={20} />
                                        Sauvegarder
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditingGift(null)}
                                        className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>


            <Gifts gifts={gifts}/>


        </AppLayout>
    );
}
