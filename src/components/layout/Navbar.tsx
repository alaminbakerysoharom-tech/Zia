import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const { user, profile } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Menu/Search */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden lg:block"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tighter uppercase">Lumina Luxe</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
            )}
          </Link>

          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            onClick={() => user ? navigate('/profile') : navigate('/auth')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {user && profile?.photoURL ? (
              <img src={profile.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-gray-200" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold tracking-tighter uppercase">Menu</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                {['Men', 'Women', 'Kids', 'Accessories'].map(cat => (
                  <Link 
                    key={cat}
                    to={`/shop?category=${cat}`} 
                    className="block text-2xl font-light hover:translate-x-2 transition-transform"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg"
          >
            <div className="max-w-3xl mx-auto flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                autoFocus
                placeholder="Search premium collections..."
                className="bg-transparent border-none outline-none flex-1 text-sm py-1"
                onChange={(e) => {
                   // Handle search logic
                }}
              />
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
