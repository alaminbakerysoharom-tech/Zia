import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm">New Arrival</span>
          )}
          {product.isSale && (
            <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm">Sale</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full shadow-lg ${isInWishlist(product.id) ? 'bg-black text-white' : 'bg-white text-black'} hover:scale-110 active:scale-95 transition-all`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => addToCart(product, 1)}
            className="p-2 bg-white text-black rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm text-gray-900 leading-tight">
            <Link to={`/product/${product.id}`} className="hover:underline underline-offset-4 Decoration-gray-200">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-tighter">{product.category}</p>
      </div>
    </motion.div>
  );
}
