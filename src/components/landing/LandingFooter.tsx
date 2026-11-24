import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#051f1e] text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Newsletter */}
        <div className="mb-20 max-w-xl mx-auto text-center p-8 sm:p-10 rounded-3xl bg-[#073B3A]/80 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Stay in the Loop
          </h3>
          <p className="text-sm text-white/60 font-light mb-6 max-w-sm mx-auto">
            Be first to explore Mango, Apple and more. Each fruit brings its own 3D cinematic experience.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You're on the FruitWise priority list!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-[#051f1e] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-400 transition-all"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#051f1e] font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Notify Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-white/40">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-600 to-lime-400 flex items-center justify-center">
              <span className="text-xs">🍃</span>
            </div>
            <span className="font-serif text-sm font-bold text-white">
              Fruit<span className="text-emerald-400">Wise</span>
            </span>
            <span className="font-mono">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button onClick={() => navigate('/orange')} className="hover:text-emerald-400 transition-colors">🍊 Orange</button>
            <a href="#all-fruits" className="hover:text-white transition-colors">All Fruits</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>

          <p className="text-center md:text-right text-[11px] text-emerald-400/70 max-w-xs">
            <strong className="text-white">Disclaimer:</strong> General information only, not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
