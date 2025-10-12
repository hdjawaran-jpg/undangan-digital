import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Play, Users, Zap, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Buat Undangan Digital
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Yang Tak Terlupakan
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Desain profesional, mudah digunakan, dan terjangkau. 
              Buat undangan pernikahan, ulang tahun, atau acara khusus dalam hitungan menit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Mulai Sekarang - Gratis
              </Link>
              <button className="inline-flex items-center space-x-2 border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition duration-300">
                <Play size={20} />
                <span>Lihat Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih UndanganKu?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform undangan digital terbaik dengan fitur lengkap untuk semua kebutuhan acara Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Membuat Undangan Pertama Anda?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Bergabung dengan ribuan pengguna yang sudah mempercayai UndanganKu
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Daftar Sekarang - Gratis Selamanya
          </Link>
        </div>
      </section>
    </div>
  );
};

const stats = [
  { value: '10K+', label: 'Undangan Terbuat' },
  { value: '500+', label: 'Template Profesional' },
  { value: '99%', label: 'Kepuasan Pengguna' },
];

const features = [
  {
    icon: Zap,
    title: 'Cepat & Mudah',
    description: 'Buat undangan profesional dalam 5 menit dengan editor drag-and-drop yang intuitif'
  },
  {
    icon: Users,
    title: 'Manajemen Tamu',
    description: 'Kelola daftar tamu, kirim undangan massal, dan pantau RSVP secara real-time'
  },
  {
    icon: Shield,
    title: 'Aman & Terpercaya',
    description: 'Data Anda terlindungi dengan enkripsi SSL dan backup otomatis'
  },
];

export default Home;