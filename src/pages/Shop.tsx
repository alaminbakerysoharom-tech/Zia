import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryFilter = searchParams.get('category') || 'All';
  const sort = searchParams.get('sort') || 'newest';

  const filteredProducts = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    if (categoryFilter !== 'All') {
      products = products.filter(p => p.category === categoryFilter);
    }

    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [categoryFilter, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4">Shop Collections</h1>
          <p className="text-gray-500 max-w-md">Browse our curated selection of luxury apparel and accessories, crafted for those who value timeless quality.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <div className="relative group">
            <select 
              value={sort}
              onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value })}
              className="appearance-none border border-gray-200 px-4 py-2 pr-10 text-sm outline-none cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50 p-6 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4">Category</h4>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), category: cat })}
                    className={`block text-sm ${categoryFilter === cat ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* Add more filter sections like Price Range, Size, etc. */}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center text-gray-400">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
