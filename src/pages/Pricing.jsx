import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, Star, Zap, Crown, Gem } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const Pricing = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Gratis',
      price: { monthly: 0, yearly: 0 },
      description: 'Cocok untuk acara personal',
      icon: Zap,
      features: [
        '1 Undangan aktif',
        'Template dasar',
        'Hingga 50 tamu',
        'RSVP dasar',
        'Dukungan email'
      ],
      cta: 'Mulai Gratis',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 49900, yearly: 449000 },
      description: 'Cocok untuk pernikahan',
      icon: Crown,
      features: [
        '5 Undangan aktif',
        'Semua template premium',
        'Hingga 500 tamu',
        'RSVP lengkap',
        'Prioritas support',
        'Analytics lengkap',
        'Custom domain'
      ],
      cta: 'Mulai Premium',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 149900, yearly: 1499000 },
      description: 'Cocok untuk perusahaan',
      icon: Gem,
      features: [
        'Undangan tidak terbatas',
        'Template eksklusif',
        'Tamu tidak terbatas',
        'RSVP advanced',
        'Dedicated support',
        'Advanced analytics',
        'Multiple domains',
        'API access'
      ],
      cta: 'Kontak Sales',
      popular: false
    }
  ];

  const handleUpgrade = (planId) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    if (planId === 'free') {
      // Handle free plan selection
      window.location.href = '/editor';
      return;
    }

    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket yang Tepat
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mulai dari gratis sampai enterprise, temukan paket yang sesuai dengan kebutuhan acara Anda
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = user?.plan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl transform scale-105'
                    : 'bg-white text-gray-900 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star size={14} fill="currentColor" />
                      <span>Paling Populer</span>
                    </div>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Aktif
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    plan.popular
                      ? 'bg-white/20'
                      : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={plan.popular ? 'text-indigo-100' : 'text-gray-600'}>
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {plan.price.monthly === 0 
                      ? 'Gratis' 
                      : formatPrice(plan.price.monthly)
                    }
                  </div>
                  {plan.price.monthly > 0 && (
                    <div className={plan.popular ? 'text-indigo-200' : 'text-gray-500'}>
                      per bulan
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check
                        size={20}
                        className={plan.popular ? 'text-green-300' : 'text-green-500'}
                      />
                      <span className={plan.popular ? 'text-indigo-100' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrentPlan}
                  className={`block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all ${
                    isCurrentPlan
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-gray-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isCurrentPlan ? 'Paket Aktif' : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          plan={selectedPlan}
        />
      </div>
    </div>
  );
};

export default Pricing;