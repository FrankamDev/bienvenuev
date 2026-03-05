import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

interface Gift {
  id: number;
  name: string;
}

interface Props {
  gifts: Gift[];
}

export default function ListGift({ gifts = [] }: Props) {
  const [availableGifts, setAvailableGifts] = useState<Gift[]>(gifts);

  const handleReserve = (id: number) => {
    if (!confirm('Voulez-vous vraiment réserver ce cadeau ?')) return;

    router.post(
      `/gifts/${id}/reserve`,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setAvailableGifts((prev) => prev.filter((g) => g.id !== id));
          alert('Cadeau réservé avec succès ! Merci ❤️');
        },
        onError: (errors) => {
          alert(errors.error || 'Ce cadeau a déjà été pris par quelqu’un d’autre.');
        },
        onFinish: () => {
          // optionnel : scroll vers le haut ou autre
        },
      }
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Bienvenue sur notre liste de mariage
      </h1>

      <section>
        <h2>Cadeaux encore disponibles</h2>

        {availableGifts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {availableGifts.map((gift) => (
              <li
                key={gift.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  background: '#fafafa',
                }}
              >
                <h3 style={{ margin: '0 0 1rem 0' }}>{gift.name}</h3>
                <button
                  onClick={() => handleReserve(gift.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Je réserve ce cadeau
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '1.2rem', color: '#555', textAlign: 'center' }}>
            Tous les cadeaux ont déjà trouvé preneur ! Merci infiniment ❤️
          </p>
        )}
      </section>

      {/* Ajoute ici le reste de ta page d'accueil : photos, texte, FAQ, etc. */}
    </div>
  );
}