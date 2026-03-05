import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Gift {
  id: number;
  name: string;
  reserved: boolean;
  reserved_by?: number;
  user?: { name: string };
}

interface Props {
  gifts: Gift[];
}

export default function AdminGiftsIndex({ gifts }: Props) {
  const [newGiftName, setNewGiftName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAdd = () => {
    router.post(route('admin.gifts.store'), { name: newGiftName }, {
      onSuccess: () => setNewGiftName(''),
    });
  };

  const startEdit = (gift: Gift) => {
    setEditingId(gift.id);
    setEditingName(gift.name);
  };

  const handleUpdate = (id: number) => {
    router.put(route('admin.gifts.update', id), { name: editingName }, {
      onSuccess: () => setEditingId(null),
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Supprimer ce cadeau ?')) {
      router.delete(route('admin.gifts.destroy', id));
    }
  };

  return (
    <div>
      <h1>Gestion des cadeaux (Admin)</h1>

      {/* Ajout */}
      <div>
        <input
          type="text"
          value={newGiftName}
          onChange={(e) => setNewGiftName(e.target.value)}
          placeholder="Nom du nouveau cadeau"
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      {/* Liste */}
      <table>
        <thead>
          <tr><th>ID</th><th>Nom</th><th>Réservé par</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {gifts.map((gift) => (
            <tr key={gift.id}>
              <td>{gift.id}</td>
              <td>
                {editingId === gift.id ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  gift.name
                )}
              </td>
              <td>{gift.reserved ? gift.user?.name || 'Inconnu' : 'Disponible'}</td>
              <td>
                {editingId === gift.id ? (
                  <button onClick={() => handleUpdate(gift.id)}>Sauvegarder</button>
                ) : (
                  <button onClick={() => startEdit(gift)}>Modifier</button>
                )}
                <button onClick={() => handleDelete(gift.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}