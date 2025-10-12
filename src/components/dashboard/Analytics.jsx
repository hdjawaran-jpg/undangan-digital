import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, Users, Heart, Share2, Calendar } from 'lucide-react';

const Analytics = ({ invitationId }) => {
  // Sample data
  const viewData = [
    { day: 'Sen', views: 45 },
    { day: 'Sel', views: 78 },
    { day: 'Rab', views: 56 },
    { day: 'Kam', views: 89 },
    { day: 'Jum', views: 67 },
    { day: 'Sab', views: 94 },
    { day: 'Min', views: 120 }
  ];

  const deviceData = [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 25 },
    { name: 'Tablet', value: 10 }
  ];

  const rsvpData = [
    { status: 'Hadir', count: 45, color: '#10B981' },
    { status: 'Tidak Hadir', count: 12, color: '#EF4444' },
    { status: 'Belum Konfirm', count: 23, color: '#6B7280' }
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981'];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          title="Total Views"
          value="1,245"
          change="+12%"
          trend="up"
        />
        <StatCard
          icon={Users}
          title="Total Tamu"
          value="80"
          change="+5"
          trend="up"
        />
        <StatCard
          icon={Heart}
          title="Engagement Rate"
          value="68%"
          change="+8%"
          trend="up"
        />
        <StatCard
          icon={Share2}
          title="Shares"
          value="45"
          change="+15%"
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Views per Hari</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Perangkat Pengunjung</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RSVP Breakdown */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-4">Status Konfirmasi Tamu</h3>
        <div className="space-y-3">
          {rsvpData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-medium">{item.status}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">{item.count} orang</span>
                <span className="text-gray-500 text-sm">
                  {Math.round((item.count / 80) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-3">
          {[
            { name: 'Sarah Wijaya', action: 'mengirim ucapan', time: '2 menit lalu' },
            { name: 'Ahmad Santoso', action: 'konfirmasi kehadiran', time: '1 jam lalu' },
            { name: 'Lisa Permata', action: 'membagikan undangan', time: '3 jam lalu' },
            { name: 'Budi Raharjo', action: 'memberi like', time: '5 jam lalu' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {activity.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <span className="font-medium">{activity.name}</span>
                <span className="text-gray-600"> {activity.action}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, change, trend }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Icon className="text-white w-6 h-6" />
      </div>
    </div>
    <div className={`mt-2 text-sm ${
      trend === 'up' ? 'text-green-600' : 'text-red-600'
    }`}>
      {change} dari minggu lalu
    </div>
  </div>
);

export default Analytics;