import { signInWithGoogle } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Auth Error:", error);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border border-gray-100 p-12 text-center space-y-8 shadow-sm"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter">Welcome to Lumina</h1>
          <p className="text-gray-500 text-sm">Sign in to sync your wishlist, manage orders, and access exclusive luxury benefits.</p>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 py-4 hover:bg-gray-50 transition-all group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pwa_site/google.svg" className="w-5 h-5" alt="Google" />
          <span className="text-xs font-bold uppercase tracking-widest">Connect With Google</span>
        </button>

        <div className="pt-8 border-t border-gray-100 flex items-center justify-center space-x-2 text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Secure Global Authentication</span>
        </div>
      </motion.div>
    </div>
  );
}
