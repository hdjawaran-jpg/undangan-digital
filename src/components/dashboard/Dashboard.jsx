import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Grid, List, 
  Eye, Edit, Share2, BarChart3 
} from 'lucide-react';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const invitations = [
    {
      id: 1,
      title: 'Pernikahan Sarah & Rizki',
      template: 'classic',
      created: '2024-01-15',
      views: 124,
      rsvp: 45,
      status: 'active',
      thumbnail: '/images/thumbnails/1.jpg'
    },
    {
      id: 2,
      title: 'Ulang Tahun Ke-30 Andi',
      template: 'modern',
      created: '2024-01-10',
      views: 89,
      rsvp: 23,
      status: 'active',
      thumbnail: '/images/thumbnails/2.jpg'
    },
    {
      id: 3,
      title: 'Anniversary Perusahaan',
      template: 'corporate',
      created: '2024-01-05',
      views: 156,
      rsvp: 67,
      status: 'draft',
      thumbnail: '/images/thumbnails/3.jpg'
    }
  ];

  const filteredInvitations = invitations.filter(invite => {
    const matchesSearch = invite.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || invite.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Kelola undangan digital Anda</p>
            </div>
            
            <Link
              to="/editor"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Buat Undangan Baru</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Undangan"
            value={invitations.length}
            color="blue"
            icon="invitations"
          />
          <StatCard
            title="Total Dilihat"
            value={invitations.reduce((sum, invite) => sum + invite.views, 0)}
            color="green"
            icon="views"
          />
          <StatCard
            title="Total RSVP"
            value={invitations.reduce((sum, invite) => sum + invite.rsvp, 0)}
            color="purple"
            icon="rsvp"
          />
          <StatCard
            title="Template Tersedia"
            value="12"
            color="orange"
            icon="templates"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari undangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
                <option value="archived">Arsip</option>
              </select>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invitations List/Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvitations.map(invite => (
              <InvitationCard key={invite.id} invite={invite} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredInvitations.map(invite => (
              <InvitationCard key={invite.id} invite={invite} viewMode={viewMode} />
            ))}
          </div>
        )}

        {filteredInvitations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">Tidak ada undangan ditemukan</div>
            <Link
              to="/editor"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Buat undangan pertama Anda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <BarChart3 className="text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const InvitationCard = ({ invite, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="border-b last:border-b-0 p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={invite.thumbnail}
              alt={invite.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-medium text-gray-900">{invite.title}</h3>
              <p className="text-sm text-gray-500">Dibuat: {invite.created}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-900 font-medium">{invite.views} views</div>
              <div className="text-sm text-gray-500">{invite.rsvp} RSVP</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Eye size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={invite.thumbnail}
        alt={invite.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{invite.title}</h3>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>Dibuat: {invite.created}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            invite.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {invite.status === 'active' ? 'Aktif' : 'Draft'}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="text-gray-600">
            <span className="font-medium">{invite.views}</span> views
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{invite.rsvp}</span> RSVP
          </div>
        </div>
        
        <div className="flex justify-between space-x-2">
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
            <Eye size={14} />
            <span>Lihat</span>
          </button>
          <button className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1">
            <Edit size={14} />
            <span>Edit</span>
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-1">
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;