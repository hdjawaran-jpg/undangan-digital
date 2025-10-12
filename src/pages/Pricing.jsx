import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { paymentService } from '../services/paymentService';
import { loadStripe } from '@stripe/stripe-js';
import { Check, Star, Zap, Crown, Gem, Loader, CreditCard } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Pricing = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    loadPlansAndSubscription();
  }, []);

  const loadPlansAndSubscription = async () => {
    try {
      setLoading(true);
      
      // Load plans
      const plansResponse = await paymentService.getPlans();
      setPlans(Object.values(plansResponse.plans));
      
      // Load user subscription if logged in
      if (user) {
        const subResponse = await paymentService.getSubscription();
        setSubscription(subResponse.subscription);
      }
    } catch (error) {
      console.error('Failed to load plans:', error);
      // Fallback to default plans
      setPlans(getDefaultPlans());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPlans = () => {
    return [
      {
        id: 'free',
        name: 'Gratis',
        price: 0,
        features: [
          '1 Undangan aktif',
          'Template dasar',
          'Hingga 50 tamu',
          'RSVP dasar',
          'Dukungan email'
        ],
        popular: false
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 49900,
        features: [
          '5 Undangan aktif',
          'Semua template premium',
          'Hingga 500 tamu',
          'RSVP lengkap',
          'Prioritas support',
          'Analytics lengkap',
          'Custom domain'
        ],
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 149900,
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
        popular: false
      }
    ];
  };

  const handleUpgrade = async (planId) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (planId === 'free') {
      window.location.href = '/editor';
      return;
    }

    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    try {
      const { sessionId } = await paymentService.createCheckoutSession(selectedPlan);
      const stripe = await stripePromise;
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('Terjadi kesalahan saat proses pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Gagal memproses pembayaran. Silakan coba lagi.');
    }
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis';
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'free': return Zap;
      case 'premium': return Crown;
      case 'enterprise': return Gem;
      default: return Zap;
    }
  };

  const isCurrentPlan = (planId) => {
    if (!subscription) return user?.plan === planId;
    return subscription.plan === planId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Memuat paket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket yang Tepat
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upgrade untuk mendapatkan fitur premium dan batasan yang lebih longgar
          </p>
        </div>

        {/* Subscription Status */}
        {subscription && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Paket {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Aktif
                  </h3>
                  <p className="text-gray-600">
                    {subscription.status === 'active' ? 'Aktif' : 'Menunggu pembayaran'}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      const { url } = await paymentService.createPortalSession();
                      window.location.href = url;
                    } catch (error) {
                      console.error('Failed to create portal session:', error);
                    }
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Kelola Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = getPlanIcon(plan.id);
            const currentPlan = isCurrentPlan(plan.id);
            
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

                {currentPlan && (
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
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {formatPrice(plan.price)}
                  </div>
                  {plan.price > 0 && (
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
                  disabled={currentPlan}
                  className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-all flex items-center justify-center space-x-2 ${
                    currentPlan
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-gray-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {currentPlan ? (
                    <>
                      <Check size={20} />
                      <span>Paket Aktif</span>
                    </>
                  ) : plan.price === 0 ? (
                    <span>Mulai Gratis</span>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      <span>Upgrade Sekarang</span>
                    </>
                  )}
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
          onPayment={handlePayment}
          plans={plans}
        />

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Umum</h2>
          <div className="space-y-6">
            {[
              {
                question: 'Apakah bisa upgrade paket nanti?',
                answer: 'Ya, Anda bisa upgrade kapan saja. Hanya bayar selisih harga untuk sisa periode berlangganan.'
              },
              {
                question: 'Apakah ada kontrak jangka panjang?',
                answer: 'Tidak. Semua paket bisa dibatalkan kapan saja tanpa biaya penalty.'
              },
              {
                question: 'Apakah data saya aman?',
                answer: 'Ya, kami menggunakan enkripsi SSL dan backup rutin untuk memastikan data Anda aman.'
              },
              {
                question: 'Bagaimana cara pembayaran?',
                answer: 'Kami menerima kartu kredit/debit melalui Stripe yang aman dan terpercaya.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;