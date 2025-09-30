import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Plus, Eye, Edit, Share2, BarChart3 } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  // Sample data
  const invitations = [
    {
      id: 1,
      title: 'Pernikahan Sarah & Rizki',
      created: '15 Jan 2024',
      views: 124,
      rsvp: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Ulang Tahun Ke-30 Andi',
      created: '10 Jan 2024',
      views: 89,
      rsvp: 23,
      status: 'active'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Selamat datang kembali, {user?.name}!</p>
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
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BarChart3}
            title="Total Undangan"
            value={invitations.length}
            color="blue"
          />
          <StatCard
            icon={Eye}
            title="Total Dilihat"
            value={invitations.reduce((sum, invite) => sum + invite.views, 0)}
            color="green"
          />
          <StatCard
            icon={Share2}
            title="Total RSVP"
            value={invitations.reduce((sum, invite) => sum + invite.rsvp, 0)}
            color="purple"
          />
          <StatCard
            title="Template Tersedia"
            value="12"
            color="orange"
          />
        </div>

        {/* Invitations List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Undangan Saya</h2>
          </div>
          
          {invitations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">Belum ada undangan</div>
              <Link to="/editor" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Buat undangan pertama Anda
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {invitations.map((invite) => (
                <div key={invite.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{invite.title}</h3>
                      <p className="text-sm text-gray-500">Dibuat: {invite.created}</p>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="text-white w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard