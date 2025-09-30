import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Download, Share2, Eye } from 'lucide-react';
import TemplatePicker from './TemplatePicker';
import CustomizationPanel from './CustomizationPanel';
import Preview from './Preview';

const InvitationEditor = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [invitationData, setInvitationData] = useState({
    // Bride & Groom
    bride: { 
      name: 'Sarah Putri', 
      parents: 'Bapak Budi & Ibu Ani',
      nickname: 'Sarah'
    },
    groom: { 
      name: 'Rizki Pratama', 
      parents: 'Bapak Joko & Ibu Siti',
      nickname: 'Rizki'
    },
    
    // Event Details
    event: {
      title: 'Pernikahan Kami',
      date: 'Sabtu, 15 Juni 2024',
      time: '08:00 - Selesai',
      venue: 'Ballroom Hotel Grand Majesty',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan'
    },
    
    // Additional Info
    message: `Dengan penuh syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami. Kehadiran dan doa restu merupakan kehormatan yang sangat besar bagi kami.`,
    
    // Gallery
    gallery: [
      '/images/gallery/1.jpg',
      '/images/gallery/2.jpg'
    ],
    
    // RSVP
    rsvp: {
      deadline: '10 Juni 2024',
      phone: '+62 812-3456-7890',
      showPhone: true
    }
  });

  const updateField = useCallback((field, value) => {
    setInvitationData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = () => {
    // Save logic here
    console.log('Saving invitation:', invitationData);
    alert('Undangan berhasil disimpan!');
  };

  const handlePreview = () => {
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Editor Undangan</h1>
              <p className="text-gray-600">Buat dan sesuaikan undangan Anda</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreview}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Eye size={18} />
                <span>Preview</span>
              </button>
              
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <Save size={18} />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Template Picker Sidebar */}
          <div className="lg:col-span-1">
            <TemplatePicker 
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
          </div>
          
          {/* Main Editor Area */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Customization Panel */}
              <div className="xl:col-span-1">
                <CustomizationPanel
                  data={invitationData}
                  onUpdate={updateField}
                />
              </div>
              
              {/* Preview Panel */}
              <div className="xl:col-span-2">
                <Preview
                  template={selectedTemplate}
                  data={invitationData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationEditor;