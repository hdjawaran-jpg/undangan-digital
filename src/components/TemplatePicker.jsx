import React, { useState } from 'react'
import { Search, Grid, List, Star } from 'lucide-react'

const TemplatePicker = ({ onTemplateSelect, selectedTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [category, setCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Semua Template', count: 12 },
    { id: 'wedding', name: 'Pernikahan', count: 6 },
    { id: 'birthday', name: 'Ulang Tahun', count: 3 },
    { id: 'corporate', name: 'Perusahaan', count: 2 },
    { id: 'islamic', name: 'Islami', count: 1 }
  ]

  const templates = [
    {
      id: 'classic',
      name: 'Classic Elegance',
      category: 'wedding',
      description: 'Desain klasik yang elegan dan timeless',
      premium: false,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 'modern',
      name: 'Modern Minimalist',
      category: 'wedding',
      description: 'Desain modern dengan sentuhan minimalis',
      premium: false,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 'luxury',
      name: 'Luxury Gold',
      category: 'wedding',
      description: 'Kemewahan dengan aksen emas',
      premium: true,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 'islamic',
      name: 'Islamic Green',
      category: 'islamic',
      description: 'Desain islami dengan dominan hijau',
      premium: false,
      thumbnail: '/api/placeholder/300/200'
    }
  ]

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || template.category === category)
  )

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Pilih Template</h3>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari template..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              category === cat.id
                ? 'bg-indigo-100 text-indigo-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{cat.name}</span>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                {cat.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-indigo-500 shadow-md'
                : 'border-gray-200'
            }`}
          >
            <div className="relative">
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              {template.premium && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  <Star size={12} className="inline mr-1" />
                  Premium
                </span>
              )}
            </div>
            <div className="p-3">
              <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
              <p className="text-xs text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplatePicker