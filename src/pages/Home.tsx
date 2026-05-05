import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative text-center text-white space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.3em] text-xs font-semibold">Spring / Summer 2026</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mt-4 mb-8">Ethereal <br/> Elegance</h1>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/shop?category=Women" 
                className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Shop Women
              </Link>
              <Link 
                to="/shop?category=Men" 
                className="bg-transparent border border-white text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Shop Men
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/shop?category=Men" className="relative h-[600px] group overflow-hidden bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1516257984879-05c99a33bb61?q=80&w=1000&auto=format&fit=crop" 
            alt="Men's" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-white text-4xl font-bold uppercase tracking-tighter mb-4">The Modern Man</h2>
            <p className="text-white/80 text-sm max-w-sm mb-6">Tailored silhouettes and technical fabrics for the contemporary gentleman.</p>
            <div className="flex items-center text-white space-x-2 text-xs font-bold uppercase tracking-widest border-b border-white w-fit pb-1 group-hover:pr-4 transition-all">
              <span>View Collection</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link to="/shop?category=Women" className="relative h-[600px] group overflow-hidden bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop" 
            alt="Women's" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-white text-4xl font-bold uppercase tracking-tighter mb-4">Sculpted Grace</h2>
            <p className="text-white/80 text-sm max-w-sm mb-6">Effortless designs that celebrate the fluid movement of the modern woman.</p>
            <div className="flex items-center text-white space-x-2 text-xs font-bold uppercase tracking-widest border-b border-white w-fit pb-1 group-hover:pr-4 transition-all">
              <span>View Collection</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-gray-400">Curated Selection</span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mt-2">New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:pr-4 transition-all inline-flex items-center space-x-2">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Loyalty Banner */}
      <section className="bg-black py-24">
        <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-8">
          <div className="flex justify-center space-x-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-white" />)}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Lumina Circle</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our exclusive loyalty program rewards your refined taste. Earn 10 points for every ৳100 spent. Unlock early access, private sales, and personalized styling services.
          </p>
          <button className="bg-white text-black px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
            Join the Circle
          </button>
        </div>
      </section>
    </div>
  );
}
