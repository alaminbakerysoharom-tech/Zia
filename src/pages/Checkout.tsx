import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { ShieldCheck, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [address, setAddress] = useState({
    fullName: profile?.displayName || '',
    email: profile?.email || '',
    phone: '',
    street: '',
    city: 'Dhaka',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'bkash' | 'nagad'>('visa');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !mobileNumber) {
      alert(`Please enter your ${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} number`);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment gateway processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      // 1. Create order record
      const orderData = {
        userId: user.uid,
        items: cart,
        totalAmount: total,
        status: 'pending',
        paymentMethod: paymentMethod,
        shippingAddress: `${address.street}, ${address.city}, ${address.zipCode}`,
        createdAt: serverTimestamp(),
        pointsEarned: Math.floor(total / 10),
      };

      await addDoc(collection(db, 'orders'), orderData);

      // 2. Update user loyalty points
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        loyaltyPoints: increment(orderData.pointsEarned)
      });

      // 3. Clear cart and show success
      clearCart();
      setIsSuccess(true);
    } catch (error) {
      console.error("Checkout Fail:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto"
        >
          <ShieldCheck className="w-12 h-12" />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Order Confirmed</h2>
          <p className="text-gray-500">Thank you for choosing Lumina Luxe. Your order is being processed for artisanal verification.</p>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          className="bg-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
        >
          Track My Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-sm text-gray-500 hover:text-black mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Bag</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <form onSubmit={handleCheckout} className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tighter border-b border-gray-100 pb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Full Name</label>
                <input 
                  required
                  value={address.fullName}
                  onChange={e => setAddress({...address, fullName: e.target.value})}
                  className="w-full border-b border-gray-200 outline-none pb-2 text-sm focus:border-black transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Email</label>
                <input 
                  required
                  type="email"
                  value={address.email}
                  onChange={e => setAddress({...address, email: e.target.value})}
                  className="w-full border-b border-gray-200 outline-none pb-2 text-sm focus:border-black transition-colors" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Address Line</label>
                <input 
                  required
                  value={address.street}
                  onChange={e => setAddress({...address, street: e.target.value})}
                  placeholder="Street, House No, Area"
                  className="w-full border-b border-gray-200 outline-none pb-2 text-sm focus:border-black transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">City</label>
                <input 
                  required
                  value={address.city}
                  readOnly
                  className="w-full border-b border-gray-200 outline-none pb-2 text-sm text-gray-400" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Postal Code</label>
                <input 
                  required
                  value={address.zipCode}
                  onChange={e => setAddress({...address, zipCode: e.target.value})}
                  className="w-full border-b border-gray-200 outline-none pb-2 text-sm focus:border-black transition-colors" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tighter border-b border-gray-100 pb-4">Payment Method</h3>
            <div className="space-y-4">
              {/* Visa Option */}
              <button 
                type="button"
                onClick={() => setPaymentMethod('visa')}
                className={`w-full text-left border p-6 rounded-lg flex items-center justify-between transition-all ${paymentMethod === 'visa' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center p-2 border border-gray-100 rounded bg-white">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="w-full text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest">Visa / Mastercard</p>
                    <p className="text-[10px] text-gray-400 uppercase">Secure Global Transaction</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'visa' ? 'border-black' : 'border-gray-300'}`}>
                  {paymentMethod === 'visa' && <div className="w-2 h-2 bg-black rounded-full" />}
                </div>
              </button>

              {/* bKash Option */}
              <button 
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`w-full text-left border p-6 rounded-lg flex items-center justify-between transition-all ${paymentMethod === 'bkash' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center p-1 border border-gray-100 rounded bg-[#E2125E]">
                    <span className="text-white font-bold text-[10px]">bKash</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest">bKash Payment</p>
                    <p className="text-[10px] text-gray-400 uppercase">Instant Mobile Payment</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bkash' ? 'border-black' : 'border-gray-300'}`}>
                  {paymentMethod === 'bkash' && <div className="w-2 h-2 bg-black rounded-full" />}
                </div>
              </button>

              {/* Nagad Option */}
              <button 
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`w-full text-left border p-6 rounded-lg flex items-center justify-between transition-all ${paymentMethod === 'nagad' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center p-1 border border-gray-100 rounded bg-[#ED1C24]">
                    <span className="text-white font-bold text-[10px]">Nagad</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest">Nagad Wallet</p>
                    <p className="text-[10px] text-gray-400 uppercase">Seamless Mobile Transfer</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'nagad' ? 'border-black' : 'border-gray-300'}`}>
                  {paymentMethod === 'nagad' && <div className="w-2 h-2 bg-black rounded-full" />}
                </div>
              </button>

              <AnimatePresence>
                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 border-x border-b border-gray-100 rounded-b-lg space-y-2">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Mobile Wallet Number</label>
                       <input 
                         type="tel"
                         placeholder="01XXXXXXXXX"
                         value={mobileNumber}
                         onChange={(e) => setMobileNumber(e.target.value)}
                         className="w-full bg-white border border-gray-200 px-4 py-2 text-sm outline-none focus:border-black"
                       />
                       <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">A verification OTP will be sent to this number by the gateway.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">All transactions are encrypted and secured by SSLCommerz</p>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Complete Transaction — {formatPrice(total)}</span>
              </>
            )}
          </button>
        </form>

        <div className="space-y-8 bg-gray-50 p-12 rounded-2xl h-fit sticky top-24">
            <h4 className="font-bold text-xs uppercase tracking-widest border-b border-gray-200 pb-4">Items Overview</h4>
            <div className="space-y-4 max-h-[400px] overflow-auto">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 bg-white rounded border border-gray-100 overflow-hidden">
                         <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <p className="font-bold uppercase tracking-tighter text-xs">{item.name}</p>
                         <p className="text-[8px] text-gray-400 uppercase tracking-widest">{item.quantity}x — {item.selectedSize}</p>
                      </div>
                   </div>
                   <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                 <span>Subtotal</span>
                 <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-bold uppercase tracking-[0.2em] pt-4">
                 <span>Total Payable</span>
                 <span className="text-xl">{formatPrice(total)}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
