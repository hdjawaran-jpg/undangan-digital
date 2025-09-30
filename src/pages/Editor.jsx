import React, { useState } from 'react'
import { Save, Eye, Download, Palette, Settings } from 'lucide-react'
import TemplatePicker from '../components/TemplatePicker'

const Editor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [activeTab, setActiveTab] = useState('content')
  const [invitationData, setInvitationData] = useState({
    // Basic Info
    brideName: 'Sarah Putri',
    groomName: 'Rizki Pratama',
    brideParents: 'Bapak Budi & Ibu Ani',
    groomParents: 'Bapak Joko & Ibu Siti',
    
    // Event Details
    date: 'Sabtu, 15 Juni 2024',
    time: '08:00 - Selesai',
    venue: 'Ballroom Hotel Grand Majesty',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    
    // Message
    message: 'Dengan penuh syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami. Kehadiran dan doa restu merupakan kehormatan yang sangat besar bagi kami.',
    
    // Design
    themeColor: '#3B82F6',
    fontFamily: 'inter'
  })

  const handleChange = (field, value) => {
    setInvitationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const renderPreview = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={invitationData} />
      case 'modern':
        return <ModernTemplate data={invitationData} />
      case 'luxury':
        return <LuxuryTemplate data={invitationData} />
      default:
        return <ClassicTemplate data={invitationData} />
    }
  }

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
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Eye size={18} />
                <span>Preview</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                <Save size={18} />
                <span>Simpan</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-4">
            {[
              { id: 'content', label: 'Konten', icon: Settings },
              { id: 'design', label: 'Desain', icon: Palette }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Panel - Template Picker */}
          <div className="lg:col-span-1">
            <TemplatePicker 
              onTemplateSelect={setSelectedTemplate}
              selectedTemplate={selectedTemplate}
            />
          </div>

          {/* Middle Panel - Customization */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Kustomisasi</h3>
              
              {activeTab === 'content' ? (
                <ContentTab data={invitationData} onChange={handleChange} />
              ) : (
                <DesignTab data={invitationData} onChange={handleChange} />
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                {renderPreview()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// Tab Components
const ContentTab = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nama Mempelai Wanita
      </label>
      <input
        type="text"
        value={data.brideName}
        onChange={(e) => onChange('brideName', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nama Mempelai Pria
      </label>
      <input
        type="text"
        value={data.groomName}
        onChange={(e) => onChange('groomName', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tanggal Acara
      </label>
      <input
        type="text"
        value={data.date}
        onChange={(e) => onChange('date', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Pesan Undangan
      </label>
      <textarea
        value={data.message}
        onChange={(e) => onChange('message', e.target.value)}
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>
)

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
            onClick={() => onChange('themeColor', color)}
            className={`w-8 h-8 rounded-full border-2 ${
              data.themeColor === color ? 'border-gray-800' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Font Family
      </label>
      <select
        value={data.fontFamily}
        onChange={(e) => onChange('fontFamily', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="inter">Inter (Modern)</option>
        <option value="serif">Serif (Klasik)</option>
        <option value="cursive">Cursive (Romantis)</option>
      </select>
    </div>
  </div>
)

// Template Components
const ClassicTemplate = ({ data }) => (
  <div className="min-h-96 bg-gradient-to-br from-rose-50 to-amber-50 p-8 font-serif">
    <div className="text-center">
      <h1 className="text-3xl text-gray-800 mb-2">Pernikahan Kami</h1>
      <div className="w-20 h-1 bg-rose-300 mx-auto mb-6"></div>
      
      <div className="text-4xl text-rose-600 mb-2">{data.brideName}</div>
      <div className="text-xl text-gray-600 mb-4">&</div>
      <div className="text-4xl text-rose-600 mb-8">{data.groomName}</div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="space-y-3 text-gray-700">
          <div>
            <div className="font-semibold">Hari & Tanggal</div>
            <div>{data.date}</div>
          </div>
          <div>
            <div className="font-semibold">Waktu</div>
            <div>{data.time}</div>
          </div>
          <div>
            <div className="font-semibold">Tempat</div>
            <div>{data.venue}</div>
          </div>
        </div>
      </div>

      <div className="text-gray-600 leading-relaxed">
        {data.message}
      </div>
    </div>
  </div>
)

const ModernTemplate = ({ data }) => (
  <div className="min-h-96 bg-white p-8 font-sans">
    <div className="text-center">
      <h1 className="text-4xl font-light text-gray-900 mb-4">
        {data.brideName} & {data.groomName}
      </h1>
      <div className="text-lg text-gray-500 mb-8">We're Getting Married</div>

      <div className="mb-8">
        <div className="text-2xl text-indigo-600 font-medium">{data.date}</div>
        <div className="text-gray-500">{data.time}</div>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="text-lg font-medium text-gray-900 mb-2">{data.venue}</div>
        <div className="text-gray-600 text-sm">{data.address}</div>
      </div>
    </div>
  </div>
)

const LuxuryTemplate = ({ data }) => (
  <div className="min-h-96 bg-gradient-to-br from-amber-900 to-rose-900 text-white p-8 font-serif">
    <div className="text-center">
      <div className="border-b border-amber-400 pb-4 mb-8">
        <h1 className="text-4xl mb-2">The Wedding Of</h1>
        <div className="text-3xl font-light">{data.brideName}</div>
        <div className="text-xl my-2">&</div>
        <div className="text-3xl font-light">{data.groomName}</div>
      </div>

      <div className="mb-8">
        <div className="text-2xl font-serif mb-2">{data.date}</div>
        <div className="text-amber-300">{data.time}</div>
      </div>

      <div className="mb-8">
        <div className="text-xl font-serif mb-2">{data.venue}</div>
        <div className="text-amber-200 text-sm">{data.address}</div>
      </div>
    </div>
  </div>
)

export default Editor