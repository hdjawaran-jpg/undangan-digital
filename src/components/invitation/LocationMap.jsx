import React from 'react';
import { MapPin, Navigation, Car, Train } from 'lucide-react';

const LocationMap = ({ location }) => {
  const directions = [
    {
      mode: 'car',
      title: 'Dengan Mobil',
      steps: [
        'Dari tol Jakarta Selatan, keluar di exit Pondok Indah',
        'Belok kiri ke Jl. Metro Pondok Indah',
        'Lurus 2km sampai Hotel Grand Majesty di sebelah kanan'
      ],
      time: '15 menit',
      distance: '5.2 km'
    },
    {
      mode: 'transit',
      title: 'Transportasi Umum',
      steps: [
        'Naik MRT ke stasiun Pondok Indah',
        'Transfer ke bus TransJakarta koridor 8',
        'Turun di halte Hotel Grand Majesty'
      ],
      time: '25 menit',
      distance: '5.5 km'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-rose-600 mx-auto mb-2" />
          <p className="text-gray-600">Peta lokasi akan ditampilkan di sini</p>
        </div>
        
        {/* Interactive Map would go here */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
      </div>

      {/* Location Details */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
          <MapPin className="text-rose-600" size={20} />
          <span>Lokasi Acara</span>
        </h3>
        
        <div className="space-y-2">
          <div>
            <div className="font-medium text-gray-900">{location.venue}</div>
            <div className="text-gray-600 text-sm">{location.address}</div>
          </div>
          
          <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2">
            <Navigation size={18} />
            <span>Buka di Google Maps</span>
          </button>
        </div>
      </div>

      {/* Directions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Petunjuk Arah</h3>
        
        {directions.map((direction, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {direction.mode === 'car' ? (
                  <Car className="text-blue-600" size={20} />
                ) : (
                  <Train className="text-green-600" size={20} />
                )}
                <span className="font-medium">{direction.title}</span>
              </div>
              <div className="text-sm text-gray-500">
                {direction.time} • {direction.distance}
              </div>
            </div>
            
            <ul className="space-y-2">
              {direction.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    {stepIndex + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Parking Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Informasi Parkir</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Parkir gratis untuk tamu undangan</li>
          <li>• Kapasitas parkir: 200 mobil</li>
          <li>• Area parkir terlindungi 24 jam</li>
          <li>• Valet service tersedia</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationMap;