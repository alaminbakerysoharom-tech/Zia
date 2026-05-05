import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold uppercase tracking-tighter">Your bag is empty</h2>
          <p className="text-gray-500">It seems you haven't added any luxury pieces to your cart yet.</p>
        </div>
        <Link 
          to="/shop" 
          className="inline-block bg-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
              <div className="w-24 h-32 bg-gray-100 rounded-md overflow-hidden shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-tight">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                  </div>
                  <p className="font-semibold text-sm">{formatPrice(item.price)}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 p-8 rounded-lg space-y-6">
            <h3 className="font-bold text-xs uppercase tracking-widest">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 uppercase text-[10px] font-bold">Complimentary</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between">
                <span className="font-bold text-sm uppercase tracking-widest">Total</span>
                <span className="font-bold text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
              Earn {(total / 10).toFixed(0)} points on this order
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 grayscale opacity-50">
             <span className="text-[10px] font-bold uppercase tracking-widest">We Accept</span>
             {/* Payment Icons would go here */}
             <div className="bg-gray-200 h-6 w-10 rounded"></div>
             <div className="bg-gray-200 h-6 w-10 rounded"></div>
             <div className="bg-gray-200 h-6 w-10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
