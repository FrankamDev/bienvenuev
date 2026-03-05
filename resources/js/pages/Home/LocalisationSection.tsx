import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Car } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationSection = () => {

  // 📍 Bafoussam – Belle Vue (coordonnées approximatives)
  const position = [5.4787, 10.4165];

  const address = "Salle de Fête – Belle Vue, Bafoussam, Cameroun";

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 font-sans">

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">
          Le Lieu de la Cérémonie
        </h2>
        <div className="w-20 h-1 bg-amber-200 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

        {/* Infos */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-8 bg-slate-50 p-8 rounded-2xl border border-slate-100">

          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <MapPin className="text-amber-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-800">
                Adresse
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {address}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Car className="text-amber-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-800">
                Parking
              </h3>
              <p className="text-slate-600">
                Parking disponible sur place pour les invités.
              </p>
            </div>
          </div>

          {/* Bouton */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-xl font-medium group"
          >
            <Navigation size={18} className="group-hover:translate-x-1 transition-transform" />
            Ouvrir dans Google Maps
          </a>

        </div>

        {/* Carte */}
        <div className="lg:col-span-3 h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Salle de Fête – Belle Vue, Bafoussam
                <br />
                Cameroun 🇨🇲
              </Popup>
            </Marker>
          </MapContainer>
        </div>

      </div>
    </section>
  );
};

export default LocationSection;

