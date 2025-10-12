import React, { useState } from 'react';
import { X, Check, Shield, CreditCard, Loader } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, plan, onPayment, plans }) => {
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const selectedPlan = plans.find(p => p.id === plan);

  const handlePaymentClick = async () => {
    setProcessing(true);
    try {
      await onPayment();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Upgrade ke {selectedPlan?.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={processing}
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Details */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {selectedPlan?.price === 0 ? 'Gratis' : 
                new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(selectedPlan?.price)
              }
            </div>
            <div className="text-gray-600">
              {selectedPlan?.price > 0 ? 'per bulan' : 'selamanya'}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {selectedPlan?.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check size={16} className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-blue-800">
              <Shield size={16} />
              <span className="text-sm font-medium">Pembayaran Aman</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">
              Pembayaran diproses secara aman melalui Stripe. Data kartu Anda tidak disimpan di server kami.
            </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePaymentClick}
            disabled={processing}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {processing ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <CreditCard size={20} />
            )}
            <span>
              {processing ? 'Memproses...' : 'Lanjutkan Pembayaran'}
            </span>
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Dengan melanjutkan, Anda menyetujui{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Syarat Layanan
            </a>{' '}
            dan{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Kebijakan Privasi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;