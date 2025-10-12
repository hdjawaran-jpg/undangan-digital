import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, Share2, Calendar, MapPin, Users, MessageCircle } from 'lucide-react'

const Preview = () => {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('main')

  // Sample data - in real app this would come from API
  const invitationData = {
    id: id || '1',
    brideName: 'Sarah Putri',
    groomName: 'Rizki Pratama', 
    date: 'Sabtu, 15 Juni 2024',
    time: '08:00 - Selesai',
    venue: 'Ballroom Hotel Grand Majesty',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    message: 'Dengan penuh syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami. Kehadiran dan doa restu merupakan kehormatan yang sangat besar bagi kami.'
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Undangan ${invitationData.brideName} & ${invitationData.groomName}`,
          text: invitationData.message,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link undangan berhasil disalin!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      {/* Floating Actions */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-3 rounded-full shadow-lg transition-all ${
            isLiked ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={handleShare}
          className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Invitation Card */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
        {/* Hero Section */}
        <div className="relative h-80 bg-gradient-to-r from-rose-400 to-amber-400">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-serif mb-2">The Wedding Of</h1>
              <div className="text-3xl font-light mb-4">
                {invitationData.brideName} & {invitationData.groomName}
              </div>
              <div className="text-lg">{invitationData.date}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex border-b sticky top-0 bg-white z-10">
          {[
            { id: 'main', label: 'Undangan', icon: Users },
            { id: 'location', label: 'Lokasi', icon: MapPin },
            { id: 'rsvp', label: 'Konfirmasi', icon: Calendar },
            { id: 'guestbook', label: 'Ucapan', icon: MessageCircle },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-1 transition-colors ${
                  activeTab === tab.id
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'main' && <MainTab data={invitationData} />}
          {activeTab === 'location' && <LocationTab data={invitationData} />}
          {activeTab === 'rsvp' && <RSVPTab data={invitationData} />}
          {activeTab === 'guestbook' && <GuestbookTab data={invitationData} />}
        </div>
      </div>
    </div>
  )
}

// Tab Components
const MainTab = ({ data }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="flex justify-center space-x-8 mb-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-rose-600">👰</span>
          </div>
          <div className="font-semibold">{data.brideName}</div>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-blue-600">🤵</span>
          </div>
          <div className="font-semibold">{data.groomName}</div>
        </div>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Calendar className="text-rose-600" size={20} />
        <div>
          <div className="font-semibold">{data.date}</div>
          <div className="text-sm text-gray-600">{data.time}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <MapPin className="text-rose-600" size={20} />
        <div>
          <div className="font-semibold">{data.venue}</div>
          <div className="text-sm text-gray-600">{data.address}</div>
        </div>
      </div>
    </div>

    <div className="text-gray-700 leading-relaxed text-center">
      {data.message}
    </div>
  </div>
)

const LocationTab = ({ data }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Lokasi Acara</h3>
    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
      <MapPin size={48} className="text-gray-400" />
    </div>
    <div className="text-center">
      <div className="font-semibold">{data.venue}</div>
      <div className="text-gray-600 text-sm">{data.address}</div>
    </div>
    <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors">
      Buka di Google Maps
    </button>
  </div>
)

const RSVPTab = ({ data }) => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="font-semibold text-lg mb-2">Konfirmasi Kehadiran</h3>
      <p className="text-gray-600 text-sm">
        Mohon konfirmasi kehadiran Anda sebelum 10 Juni 2024
      </p>
    </div>
    <RSVPForm />
  </div>
)

const GuestbookTab = ({ data }) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">Buku Tamu</h3>
    <Guestbook />
  </div>
)

// Additional Components
const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    message: ''
  })

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Nama Lengkap"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="p-3 bg-green-500 text-white rounded-lg">
          Ya, Hadir
        </button>
        <button type="button" className="p-3 bg-gray-300 text-gray-700 rounded-lg">
          Tidak Bisa
        </button>
      </div>
      <textarea
        placeholder="Ucapan (opsional)"
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />
      <button type="submit" className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium">
        Kirim Konfirmasi
      </button>
    </form>
  )
}

const Guestbook = () => {
  const [messages] = useState([
    { name: 'Ahmad Wijaya', message: 'Selamat atas pernikahannya!', time: '2 jam lalu' },
    { name: 'Siti Rahayu', message: 'Barakallahu lakuma wa baraka alaikuma', time: '1 hari lalu' }
  ])

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <textarea
          placeholder="Tulis ucapan untuk mempelai..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <button className="w-full bg-rose-600 text-white py-2 rounded-lg mt-2">
          Kirim Ucapan
        </button>
      </div>

      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="bg-white border rounded-lg p-4">
            <div className="font-semibold">{msg.name}</div>
            <div className="text-gray-700">{msg.message}</div>
            <div className="text-gray-500 text-sm">{msg.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Preview