import React, { useState } from 'react';
import { 
  Users, Calendar, MapPin, MessageSquare, 
  Image, Palette, Settings, Save 
} from 'lucide-react';

const CustomizationPanel = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('couple');

  const handleChange = (section, field, value) => {
    if (section === 'bride' || section === 'groom' || section === 'event') {
      onUpdate(section, {
        ...data[section],
        [field]: value
      });
    } else {
      onUpdate(section, value);
    }
  };

  const tabs = [
    { id: 'couple', name: 'Pasangan', icon: Users },
    { id: 'event', name: 'Acara', icon: Calendar },
    { id: 'location', name: 'Lokasi', icon: MapPin },
    { id: 'message', name: 'Pesan', icon: MessageSquare },
    { id: 'gallery', name: 'Galeri', icon: Image },
    { id: 'design', name: 'Desain', icon: Palette },
    { id: 'settings', name: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg h-fit sticky top-8">
      {/* Tabs */}
      <div className="border-b">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {activeTab === 'couple' && (
          <CoupleTab data={data} onChange={handleChange} />
        )}
        
        {activeTab === 'event' && (
          <EventTab data={data} onChange={handleChange} />
        )}
        
        {activeTab === 'location' && (
          <LocationTab data={data} onChange={handleChange} />
        )}
        
        {activeTab === 'message' && (
          <MessageTab data={data} onChange={handleChange} />
        )}
        
        {activeTab === 'design' && (
          <DesignTab data={data} onChange={handleChange} />
        )}
      </div>

      {/* Save Button */}
      <div className="border-t p-4 bg-gray-50 rounded-b-lg">
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
          <Save size={16} />
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>
  );
};

// Tab Components
const CoupleTab = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <h4 className="font-medium text-gray-900 mb-3">Mempelai Wanita</h4>
      <div className="space-y-3">
        <InputField
          label="Nama Lengkap"
          value={data.bride.name}
          onChange={(value) => onChange('bride', 'name', value)}
          placeholder="Nama lengkap mempelai wanita"
        />
        <InputField
          label="Nama Panggilan"
          value={data.bride.nickname}
          onChange={(value) => onChange('bride', 'nickname', value)}
          placeholder="Nama panggilan"
        />
        <InputField
          label="Orang Tua"
          value={data.bride.parents}
          onChange={(value) => onChange('bride', 'parents', value)}
          placeholder="Nama orang tua"
        />
      </div>
    </div>

    <div>
      <h4 className="font-medium text-gray-900 mb-3">Mempelai Pria</h4>
      <div className="space-y-3">
        <InputField
          label="Nama Lengkap"
          value={data.groom.name}
          onChange={(value) => onChange('groom', 'name', value)}
          placeholder="Nama lengkap mempelai pria"
        />
        <InputField
          label="Nama Panggilan"
          value={data.groom.nickname}
          onChange={(value) => onChange('groom', 'nickname', value)}
          placeholder="Nama panggilan"
        />
        <InputField
          label="Orang Tua"
          value={data.groom.parents}
          onChange={(value) => onChange('groom', 'parents', value)}
          placeholder="Nama orang tua"
        />
      </div>
    </div>
  </div>
);

const EventTab = ({ data, onChange }) => (
  <div className="space-y-4">
    <InputField
      label="Judul Acara"
      value={data.event.title}
      onChange={(value) => onChange('event', 'title', value)}
      placeholder="Contoh: Pernikahan Kami"
    />
    
    <div className="grid grid-cols-2 gap-3">
      <InputField
        label="Tanggal"
        type="date"
        value={data.event.date}
        onChange={(value) => onChange('event', 'date', value)}
      />
      <InputField
        label="Waktu"
        value={data.event.time}
        onChange={(value) => onChange('event', 'time', value)}
        placeholder="08:00 - Selesai"
      />
    </div>
    
    <InputField
      label="Tempat"
      value={data.event.venue}
      onChange={(value) => onChange('event', 'venue', value)}
      placeholder="Nama venue acara"
    />
  </div>
);

const LocationTab = ({ data, onChange }) => (
  <div className="space-y-4">
    <InputField
      label="Alamat Lengkap"
      type="textarea"
      value={data.event.address}
      onChange={(value) => onChange('event', 'address', value)}
      placeholder="Alamat lengkap venue"
      rows={3}
    />
    
    <InputField
      label="Link Google Maps"
      value={data.event.mapUrl}
      onChange={(value) => onChange('event', 'mapUrl', value)}
      placeholder="https://maps.google.com/..."
    />
  </div>
);

const MessageTab = ({ data, onChange }) => (
  <div className="space-y-4">
    <InputField
      label="Pesan Undangan"
      type="textarea"
      value={data.message}
      onChange={(value) => onChange('message', value)}
      placeholder="Tulis pesan undangan Anda..."
      rows={6}
    />
  </div>
);

const DesignTab = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Warna Tema
      </label>
      <div className="flex space-x-2">
        {['#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B'].map((color) => (
          <button
            key={color}
            className="w-8 h-8 rounded-full border-2 border-gray-200"
            style={{ backgroundColor: color }}
            onClick={() => onChange('themeColor', color)}
          />
        ))}
      </div>
    </div>
    
    <InputField
      label="Font Family"
      type="select"
      value={data.fontFamily || 'inter'}
      onChange={(value) => onChange('fontFamily', value)}
      options={[
        { value: 'inter', label: 'Inter (Modern)' },
        { value: 'playfair', label: 'Playfair (Elegant)' },
        { value: 'cursive', label: 'Cursive (Romantic)' },
      ]}
    />
  </div>
);

// Reusable Input Field Component
const InputField = ({ label, type = 'text', value, onChange, options, ...props }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...props}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...props}
        />
      )}
    </div>
  );
};

export default CustomizationPanel;