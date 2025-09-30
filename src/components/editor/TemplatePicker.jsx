import React from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';

const TemplatePicker = ({ selectedTemplate, onTemplateSelect }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua Template', count: templates.length },
    { id: 'wedding', name: 'Pernikahan', count: templates.filter(t => t.category === 'wedding').length },
    { id: 'birthday', name: 'Ulang Tahun', count: templates.filter(t => t.category === 'birthday').length },
    { id: 'corporate', name: 'Perusahaan', count: templates.filter(t => t.category === 'corporate').length },
    { id: 'islamic', name: 'Islami', count: templates.filter(t => t.category === 'islamic').length },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pilih Template</h3>
        
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
          
          <Filter size={18} className="text-gray-400" />
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
      </div>

      {/* Templates Grid */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 gap-4' 
          : 'space-y-4'
      }`}>
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
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              {template.premium && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Premium
                </span>
              )}
            </div>
            <div className="p-3">
              <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
              <p className="text-xs text-gray-600">{template.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{template.category}</span>
                {template.premium ? (
                  <span className="text-xs font-medium text-yellow-600">Premium</span>
                ) : (
                  <span className="text-xs font-medium text-green-600">Gratis</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Tidak ada template yang ditemukan</p>
        </div>
      )}
    </div>
  );
};

// Sample templates data
const templates = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    category: 'wedding',
    description: 'Desain klasik yang elegan dan timeless',
    thumbnail: '/images/templates/classic.jpg',
    premium: false
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    category: 'wedding',
    description: 'Desain modern dengan sentuhan minimalis',
    thumbnail: '/images/templates/modern.jpg',
    premium: false
  },
  {
    id: 'luxury',
    name: 'Luxury Gold',
    category: 'wedding',
    description: 'Kemewahan dengan aksen emas',
    thumbnail: '/images/templates/luxury.jpg',
    premium: true
  },
  {
    id: 'islamic',
    name: 'Islamic Green',
    category: 'islamic',
    description: 'Desain islami dengan dominan hijau',
    thumbnail: '/images/templates/islamic.jpg',
    premium: false
  },
  {
    id: 'birthday1',
    name: 'Colorful Birthday',
    category: 'birthday',
    description: 'Ceria dan penuh warna',
    thumbnail: '/images/templates/birthday1.jpg',
    premium: false
  },
  {
    id: 'corporate1',
    name: 'Professional Business',
    category: 'corporate',
    description: 'Formal dan profesional',
    thumbnail: '/images/templates/corporate.jpg',
    premium: true
  },
];

export default TemplatePicker;