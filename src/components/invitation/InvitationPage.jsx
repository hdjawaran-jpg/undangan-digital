import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Calendar, MapPin, Users, Clock } from 'lucide-react';
import RSVPForm from './RSVPForm';
import GuestBook from './GuestBook';
import LocationMap from './LocationMap';

const InvitationPage = () => {
  const { id } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [activeTab, setActiveTab] = useState('main');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch invitation data
    const fetchInvitation = async () => {
      // In real app, this would be an API call
      const data = {
        id: id,
        bride: { name: 'Sarah Putri', parents: 'Bapak Budi & Ibu Ani' },
        groom: { name: 'Rizki Pratama', parents: 'Bapak Joko & Ibu Siti' },
        event: {
          title: 'Pernikahan Kami',
          date: 'Sabtu, 15 Juni 2024',
          time: '08:00 - Selesai',
          venue: 'Ballroom Hotel Grand Majesty',
          address: 'Jl. Sudirman No. 123, Jakarta Selatan',
          mapUrl: '#'
        },
        message: `Dengan penuh syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami. Kehadiran dan doa restu merupakan kehormatan yang sangat besar bagi kami.`,
        gallery: [
          '/images/gallery/1.jpg',
          '/images/gallery/2.jpg',
          '/images/gallery/3.jpg'
        ],
        rsvp: {
          deadline: '10 Juni 2024',
          phone: '+62 812-3456-7890'
        }
      };
      setInvitation(data);
    };

    fetchInvitation();
  }, [id]);

  if (!invitation) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: invitation.event.title,
          text: `Undangan ${invitation.bride.name} & ${invitation.groom.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link undangan berhasil disalin!');
    }
  };

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

      {/* Main Content */}
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
        {/* Hero Section */}
        <div className="relative h-80 bg-gradient-to-r from-rose-400 to-amber-400">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-serif mb-2">The Wedding Of</h1>
              <div className="text-3xl font-light mb-4">
                {invitation.bride.name} & {invitation.groom.name}
              </div>
              <div className="text-lg">{invitation.event.date}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex border-b sticky top-0 bg-white z-10">
          {[
            { id: 'main', label: 'Undangan', icon: Users },
            { id: 'location', label: 'Lokasi', icon: MapPin },
            { id: 'rsvp', label: 'Konfirmasi', icon: Calendar },
            { id: 'guestbook', label: 'Ucapan', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
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
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'main' && <MainTab invitation={invitation} />}
          {activeTab === 'location' && <LocationTab invitation={invitation} />}
          {activeTab === 'rsvp' && <RSVPTab invitation={invitation} />}
          {activeTab === 'guestbook' && <GuestBookTab invitation={invitation} />}
        </div>
      </div>
    </div>
  );
};

const MainTab = ({ invitation }) => (
  <div className="space-y-6">
    {/* Couple Section */}
    <div className="text-center">
      <div className="flex justify-center space-x-8 mb-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-rose-600">👰</span>
          </div>
          <div className="font-semibold">{invitation.bride.name}</div>
          <div className="text-sm text-gray-600">Putri dari {invitation.bride.parents}</div>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-blue-600">🤵</span>
          </div>
          <div className="font-semibold">{invitation.groom.name}</div>
          <div className="text-sm text-gray-600">Putra dari {invitation.groom.parents}</div>
        </div>
      </div>
    </div>

    {/* Event Details */}
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Calendar className="text-rose-600" size={20} />
        <div>
          <div className="font-semibold">{invitation.event.date}</div>
          <div className="text-sm text-gray-600">{invitation.event.time}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <MapPin className="text-rose-600" size={20} />
        <div>
          <div className="font-semibold">{invitation.event.venue}</div>
          <div className="text-sm text-gray-600">{invitation.event.address}</div>
        </div>
      </div>
    </div>

    {/* Message */}
    <div className="text-gray-700 leading-relaxed text-center">
      {invitation.message}
    </div>
  </div>
);

const LocationTab = ({ invitation }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Lokasi Acara</h3>
    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
      <MapPin size={48} className="text-gray-400" />
    </div>
    <div className="text-center">
      <div className="font-semibold">{invitation.event.venue}</div>
      <div className="text-gray-600 text-sm">{invitation.event.address}</div>
    </div>
    <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors">
      Buka di Google Maps
    </button>
  </div>
);

const RSVPTab = ({ invitation }) => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="font-semibold text-lg mb-2">Konfirmasi Kehadiran</h3>
      <p className="text-gray-600 text-sm">
        Mohon konfirmasi kehadiran Anda sebelum {invitation.rsvp.deadline}
      </p>
    </div>
    <RSVPForm />
  </div>
);

const GuestBookTab = ({ invitation }) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">Buku Tamu</h3>
    <GuestBook invitationId={invitation.id} />
  </div>
);

export default InvitationPage;