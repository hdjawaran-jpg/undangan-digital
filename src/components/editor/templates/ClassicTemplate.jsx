import React from 'react';

const ClassicTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 font-serif">
      {/* Cover Section */}
      <div className="relative h-80 bg-gradient-to-r from-rose-400 to-amber-400">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <div className="text-sm tracking-widest mb-2">THE WEDDING OF</div>
            <h1 className="text-4xl font-light mb-4">{data.bride.name}</h1>
            <div className="text-2xl mb-4">&</div>
            <h1 className="text-4xl font-light">{data.groom.name}</h1>
          </div>
        </div>
      </div>

      {/* Couple Section */}
      <div className="py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center space-x-12 mb-8">
            <div>
              <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👰</span>
              </div>
              <h3 className="text-xl font-semibold text-rose-600">{data.bride.name}</h3>
              <p className="text-gray-600 text-sm">Putri dari {data.bride.parents}</p>
            </div>
            
            <div className="text-rose-400 text-4xl self-center">&</div>
            
            <div>
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🤵</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-600">{data.groom.name}</h3>
              <p className="text-gray-600 text-sm">Putra dari {data.groom.parents}</p>
            </div>
          </div>

          <div className="w-20 h-1 bg-rose-300 mx-auto my-8"></div>

          {/* Event Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-light text-gray-800 mb-4">Save The Date</h2>
              <div className="text-lg text-rose-600 font-semibold">{data.event.date}</div>
              <div className="text-gray-600">{data.event.time}</div>
            </div>

            <div>
              <div className="text-lg font-semibold text-gray-800">{data.event.venue}</div>
              <div className="text-gray-600">{data.event.address}</div>
            </div>
          </div>

          {/* Message */}
          <div className="mt-8 text-gray-700 leading-relaxed">
            {data.message}
          </div>

          {/* RSVP Section */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Kehadiran</h3>
            <p className="text-gray-600 mb-4">
              Mohon konfirmasi kehadiran Anda sebelum {data.rsvp.deadline}
            </p>
            <button className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
              Konfirmasi Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;