import { useWishlist } from '../context/WishlistContext';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ui/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold uppercase tracking-tighter">Wishlist Empty</h2>
          <p className="text-gray-500 text-sm">Save the items you love to keep an eye on them better.</p>
        </div>
        <Link 
          to="/shop" 
          className="inline-block bg-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
        >
          Discover New Styles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-tighter">Your Favorites</h1>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{wishlist.length} Items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {wishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
