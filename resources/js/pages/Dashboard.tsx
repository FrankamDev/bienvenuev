import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard(props: any) {

    const { auth, gifts = [] } = usePage().props as any;
// const { gifts } = usePage().props as any;
    const [editingGift, setEditingGift] = useState<any>(null);
    const [name, setName] = useState('');

    const handleDelete = (id: number) => {
        router.delete(`/gifts/${id}`, {
            preserveScroll: true,
        });
    };

    // const handleUpdate = (e: any) => {
    //     e.preventDefault();

    //     router.put(`/gifts/${editingGift.id}`, {
    //         name,
    //     }, {
    //         preserveScroll: true,
    //         onSuccess: () => {
    //             setEditingGift(null);
    //         }
    //     });
    // };


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

            <div className="space-y-4">
                {gifts.map((gift: any) => (
                    <div key={gift.id} className="p-4 border rounded bg-white">
                        <p><strong>Nom :</strong> {gift.name}</p>
                        <p><strong>Hauteur :</strong> {gift.height ?? 'N/A'}</p>
                        <p><strong>Réservé :</strong> {gift.reserved ? 'Oui' : 'Non'}</p>
                        <p>
                            <strong>Par :</strong>{' '}
                            {gift.person?.name ?? '—'}
                        </p>


                    </div>
                ))}
            </div>

            {editingGift && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    Sauvegarder
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setEditingGift(null)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AppLayout>
    );
}
