import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, User, Clock } from 'lucide-react';

const GuestBook = ({ invitationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample initial messages
  useEffect(() => {
    const sampleMessages = [
      {
        id: 1,
        name: 'Ahmad Wijaya',
        message: 'Selamat atas pernikahannya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
        timestamp: '2024-01-15 14:30:00',
        likes: 3
      },
      {
        id: 2,
        name: 'Siti Rahayu',
        message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fi khair. 💕',
        timestamp: '2024-01-15 16:45:00',
        likes: 5
      }
    ];
    setMessages(sampleMessages);
  }, [invitationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const message = {
        id: Date.now(),
        name: 'Tamu', // In real app, this would be from user profile
        message: newMessage,
        timestamp: new Date().toISOString(),
        likes: 0
      };
      
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
      setLoading(false);
    }, 500);
  };

  const handleLike = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full flex items-center justify-center">
              <User className="text-white w-5 h-5" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa untuk mempelai..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
              disabled={loading}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {messages.length} ucapan
              </span>
              <button
                type="submit"
                disabled={loading || !newMessage.trim()}
                className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Send size={16} />
                <span>{loading ? 'Mengirim...' : 'Kirim'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {message.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{message.name}</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleLike(message.id)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  message.likes > 0 
                    ? 'text-rose-600 bg-rose-50' 
                    : 'text-gray-400 hover:text-rose-600'
                }`}
              >
                <Heart 
                  size={12} 
                  fill={message.likes > 0 ? 'currentColor' : 'none'} 
                />
                <span>{message.likes}</span>
              </button>
            </div>
            
            <div className="text-gray-700 leading-relaxed">
              {message.message}
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p>Belum ada ucapan. Jadilah yang pertama mengucapkan!</p>
        </div>
      )}
    </div>
  );
};

export default GuestBook;