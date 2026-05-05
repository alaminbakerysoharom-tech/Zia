import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ShoppingBag, ArrowLeft, Ruler, Truck, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <div className="h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, 1, selectedSize, selectedColor || product.colors[0]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-sm text-gray-500 hover:text-black mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-[3/4] rounded-md overflow-hidden bg-gray-100 border-2 transition-all ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col h-full py-4">
          <div className="space-y-2 mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</p>
            <h1 className="text-4xl font-bold uppercase tracking-tighter">{product.name}</h1>
            <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-12">{product.description}</p>

          <div className="space-y-8 mb-12">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest">Select Size</h4>
                <button className="flex items-center space-x-1 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black">
                  <Ruler className="w-3 h-3" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm border transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Select Color</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm border rounded-full transition-all ${selectedColor === color ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 border transition-all ${isInWishlist(product.id) ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8 mt-auto">
            <div className="flex items-start space-x-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Express Delivery</h5>
                <p className="text-[10px] text-gray-500">Ships within 24-48 hours. Secure Dhaka transit.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Authenticity Guaranteed</h5>
                <p className="text-[10px] text-gray-500">Every piece is verified by our specialist curators.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
