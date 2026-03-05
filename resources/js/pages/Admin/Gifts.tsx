export default function AdminGifts({ reservedGifts }) {
    return (
        <div>
            <h1>Cadeaux sélectionnés</h1>
            <ul>
                {reservedGifts.map(gift => (
                    <li key={gift.id}>
                        {gift.name} - Réservé par {gift.user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
