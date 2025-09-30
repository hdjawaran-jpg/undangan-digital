import React from 'react';

const ModernTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Minimalist Header */}
      <div className="py-16 px-6 text-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-light text-gray-900 mb-4">
            {data.bride.name} & {data.groom.name}
          </h1>
          <div className="text-lg text-gray-600 mb-8">We're Getting Married</div>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-2xl text-indigo-600 font-medium mb-2">
            {data.event.date}
          </div>
          <div className="text-gray-500 text-lg">{data.event.time}</div>
        </div>
      </div>

      {/* Venue */}
      <div className="py-12 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Location</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="text-xl font-medium text-gray-900 mb-2">
              {data.event.venue}
            </div>
            <div className="text-gray-600 leading-relaxed">
              {data.event.address}
            </div>
          </div>
        </div>
      </div>

      {/* Couple Story */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white">👰</span>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">{data.bride.name}</h3>
              <p className="text-gray-600">Putri dari {data.bride.parents}</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white">🤵</span>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">{data.groom.name}</h3>
              <p className="text-gray-600">Putra dari {data.groom.parents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Our Story</h2>
          <div className="text-gray-700 leading-relaxed text-lg">
            {data.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;