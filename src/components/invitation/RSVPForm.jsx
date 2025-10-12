import React, { useState } from 'react';
import { User, Users, Phone, Mail, MessageCircle } from 'lucide-react';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attendance: 'yes',
    guests: 1,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('RSVP Data:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Terima Kasih!</h3>
        <p className="text-gray-600">Konfirmasi kehadiran Anda telah berhasil dikirim.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Masukkan nama lengkap"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor HP
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="08xxx"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah Tamu
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={formData.guests}
              onChange={(e) => handleChange('guests', parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} orang</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Konfirmasi Kehadiran
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'yes', label: 'Ya, saya akan hadir', color: 'bg-green-500' },
            { value: 'no', label: 'Tidak bisa hadir', color: 'bg-red-500' },
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange('attendance', option.value)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                formData.attendance === option.value
                  ? `${option.color} text-white border-transparent`
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ucapan & Doa (Opsional)
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          placeholder="Tulis ucapan dan doa untuk mempelai..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors"
      >
        Kirim Konfirmasi
      </button>
    </form>
  );
};

export default RSVPForm;