import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { formatPrice } from '../lib/utils';
import { Award, Package, Heart, LogOut, Settings, Bell } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSignOut = () => auth.signOut();

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-12">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              {profile?.photoURL && <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />}
            </div>
            <div>
              <h2 className="font-bold uppercase tracking-tighter text-xl">{profile?.displayName || 'Guest User'}</h2>
              <p className="text-xs text-gray-400 font-mono tracking-tighter uppercase">{profile?.loyaltyPoints} Circle Points</p>
            </div>
          </div>

          <nav className="space-y-4">
            {[
              { label: 'Wishlist', icon: Heart, path: '/wishlist' },
              { label: 'Order History', icon: Package, path: '/orders' },
              { label: 'Notifications', icon: Bell, path: '/notifications' },
              { label: 'Account Settings', icon: Settings, path: '/settings' },
            ].map(item => (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-3 w-full text-left text-sm text-gray-500 hover:text-black transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="uppercase tracking-widest text-[11px] font-bold">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-3 w-full text-left text-sm text-red-400 hover:text-red-600 transition-colors pt-8"
            >
              <LogOut className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[11px] font-bold">Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-16">
           {/* Loyalty Card */}
           <div className="bg-black p-12 rounded-2xl text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-2">
                   <Award className="w-6 h-6 text-amber-400" />
                   <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Lumina Elite Tier</span>
                </div>
                <div>
                   <h3 className="text-4xl font-bold uppercase tracking-tighter">Gold Circle Member</h3>
                   <p className="text-white/40 text-sm mt-2">Member since May 2026</p>
                </div>
                <div className="flex items-end justify-between pt-8 border-t border-white/10">
                   <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Available Points</p>
                      <p className="text-3xl font-mono">{profile?.loyaltyPoints}</p>
                   </div>
                   <button className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
                      Redeem Points
                   </button>
                </div>
              </div>
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150 pointer-events-none" />
           </div>

           {/* Stats / Info */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-100 p-8 rounded-xl space-y-2">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Active Orders</h4>
                 <p className="text-2xl font-bold">02</p>
              </div>
              <div className="border border-gray-100 p-8 rounded-xl space-y-2">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Wishlist Items</h4>
                 <p className="text-2xl font-bold">{profile?.wishlist?.length || 0}</p>
              </div>
              <div className="border border-gray-100 p-8 rounded-xl space-y-2">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Spent</h4>
                 <p className="text-2xl font-bold">{formatPrice(45000)}</p>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
