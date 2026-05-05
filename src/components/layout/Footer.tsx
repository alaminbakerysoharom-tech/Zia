import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tighter uppercase">Lumina Luxe</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Redefining modern luxury through sustainable silhouettes and artisanal craftsmanship. Our collections are designed to empower and inspire.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/shop?category=Men" className="hover:text-black">Men's Collection</Link></li>
            <li><Link to="/shop?category=Women" className="hover:text-black">Women's Collection</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-black">Accessories</Link></li>
            <li><Link to="/shop?isNewArrival=true" className="hover:text-black">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Assistance</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/help" className="hover:text-black">Shipping & Returns</Link></li>
            <li><Link to="/help" className="hover:text-black">Size Guide</Link></li>
            <li><Link to="/help" className="hover:text-black">Account FAQ</Link></li>
            <li><Link to="/help" className="hover:text-black">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Newsletter</h4>
          <p className="text-gray-500 text-sm mb-4">Be the first to receive updates on new drops and private sales.</p>
          <div className="flex border-b border-black pb-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-transparent border-none outline-none text-sm flex-1"
            />
            <button className="p-1">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-xs text-gray-400">© 2026 Lumina Luxe Apparel Corp. All rights reserved.</p>
        <div className="flex space-x-6 text-gray-400">
          <Link to="#" className="hover:text-black">
            <Instagram className="w-4 h-4" />
          </Link>
          <Link to="#" className="hover:text-black">
            <Twitter className="w-4 h-4" />
          </Link>
          <Link to="#" className="hover:text-black">
            <Facebook className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
