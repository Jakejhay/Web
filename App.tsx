import { useState, useRef } from 'react';
import { Copy, Flame, TrendingUp, Zap, Skull, AlertTriangle, Menu, X, Mail, Send } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const homeRef = useRef(null);
  const tokenomicsRef = useRef(null);
  const roadmapRef = useRef(null);
  const contactRef = useRef(null);

  const contractAddress = "FUDz1LLa...SoL4N4dEg3N";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-500 overflow-hidden">
      <div
        className="fixed inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          filter: 'contrast(1.5) brightness(0.4)'
        }}
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 py-6 px-4 md:px-8 flex justify-between items-center border-b-4 border-red-600 bg-black/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Skull className="w-8 h-8 text-red-600" />
            <span className="military-font text-2xl md:text-3xl text-red-600">$FUDZILLA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection(homeRef)}
              className="text-red-400 hover:text-red-500 font-bold military-font transition-all hover:scale-110"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection(tokenomicsRef)}
              className="text-red-400 hover:text-red-500 font-bold military-font transition-all hover:scale-110"
            >
              TOKENOMICS
            </button>
            <button
              onClick={() => scrollToSection(roadmapRef)}
              className="text-red-400 hover:text-red-500 font-bold military-font transition-all hover:scale-110"
            >
              ROADMAP
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-red-400 hover:text-red-500 font-bold military-font transition-all hover:scale-110"
            >
              CONTACT
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-black font-bold rounded border-2 border-red-400 hover:bg-red-500 transition-all pulse-red military-font text-sm md:text-base"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'COPIED!' : 'CA'}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-red-600 hover:text-red-500 transition-all"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {menuOpen && (
          <nav className="md:hidden bg-black border-b-4 border-red-600 py-4 px-4 space-y-4">
            <button
              onClick={() => scrollToSection(homeRef)}
              className="block w-full text-left text-red-400 hover:text-red-500 font-bold military-font py-2 transition-all"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection(tokenomicsRef)}
              className="block w-full text-left text-red-400 hover:text-red-500 font-bold military-font py-2 transition-all"
            >
              TOKENOMICS
            </button>
            <button
              onClick={() => scrollToSection(roadmapRef)}
              className="block w-full text-left text-red-400 hover:text-red-500 font-bold military-font py-2 transition-all"
            >
              ROADMAP
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="block w-full text-left text-red-400 hover:text-red-500 font-bold military-font py-2 transition-all"
            >
              CONTACT
            </button>
          </nav>
        )}

        <section ref={homeRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="text-center space-y-8 max-w-6xl mx-auto">
            <div className="relative">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold military-font glitch-text text-red-600 text-stroke mb-4">
                THE KING OF FUD
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold horror-font text-red-500 glitch-hard">
                HAS ARRIVED
              </h2>
            </div>

            <div className="flex justify-center my-8">
              <Flame className="w-16 h-16 md:w-24 md:h-24 text-red-600 float" />
            </div>

            <p className="text-xl md:text-3xl military-font text-red-400 max-w-3xl mx-auto leading-relaxed">
              THE MOST CHAOTIC MEMECOIN ON SOLANA. SPREADING FUD, DESTROYING PORTFOLIOS, AND CAUSING ABSOLUTE MAYHEM.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <button className="w-full sm:w-auto px-12 py-6 bg-red-600 text-black text-2xl md:text-3xl font-bold rounded-lg border-4 border-red-400 hover:bg-red-500 hover:scale-110 transition-all pulse-red military-font flex items-center justify-center gap-3">
                <TrendingUp className="w-8 h-8" />
                BUY NOW
              </button>
              <button className="w-full sm:w-auto px-12 py-6 bg-black text-red-600 text-2xl md:text-3xl font-bold rounded-lg border-4 border-red-600 hover:bg-red-950 hover:scale-110 transition-all military-font flex items-center justify-center gap-3">
                <Zap className="w-8 h-8" />
                JOIN THE MADNESS
              </button>
            </div>

            <div className="mt-8 p-4 bg-red-950 border-2 border-red-600 rounded-lg inline-block">
              <p className="text-sm md:text-base military-font text-red-400">
                CONTRACT ADDRESS: <span className="text-red-300">{contractAddress}</span>
              </p>
            </div>
          </div>
        </section>

        <section ref={tokenomicsRef} className="py-20 px-4 bg-gradient-to-b from-black via-red-950 to-black border-y-4 border-red-600">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold military-font text-center mb-16 glitch-text text-red-600">
              TOKENOMICS
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 spin-explode">
                  <svg viewBox="0 0 200 200" className="w-full h-full transform rotate-0">
                    <circle cx="100" cy="100" r="80" fill="#dc2626" stroke="#991b1b" strokeWidth="4"/>
                    <path d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z" fill="#7f1d1d" stroke="#991b1b" strokeWidth="4"/>
                    <path d="M 100 100 L 180 100 A 80 80 0 0 1 100 180 Z" fill="#450a0a" stroke="#991b1b" strokeWidth="4"/>
                    <circle cx="100" cy="100" r="30" fill="#000000" stroke="#dc2626" strokeWidth="4"/>
                    <text x="100" y="65" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">50%</text>
                    <text x="140" y="110" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">30%</text>
                    <text x="60" y="150" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">20%</text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AlertTriangle className="w-12 h-12 text-red-600 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-black border-4 border-red-600 p-6 rounded-lg fade-in-up">
                  <h3 className="text-2xl md:text-3xl font-bold military-font text-red-500 mb-2">50% - DEGEN SUPPLY</h3>
                  <p className="text-red-400 text-lg">STRAIGHT TO THE DEGENS. NO MERCY.</p>
                </div>

                <div className="bg-black border-4 border-red-600 p-6 rounded-lg fade-in-up" style={{animationDelay: '0.2s'}}>
                  <h3 className="text-2xl md:text-3xl font-bold military-font text-red-500 mb-2">30% - LIQUIDITY POOL</h3>
                  <p className="text-red-400 text-lg">LOCKED AND LOADED FOR MAXIMUM CHAOS.</p>
                </div>

                <div className="bg-black border-4 border-red-600 p-6 rounded-lg fade-in-up" style={{animationDelay: '0.4s'}}>
                  <h3 className="text-2xl md:text-3xl font-bold military-font text-red-500 mb-2">20% - MARKETING</h3>
                  <p className="text-red-400 text-lg">SPREADING FUD ACROSS THE BLOCKCHAIN.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={roadmapRef} className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold military-font text-center mb-16 glitch-text text-red-600">
              THE ROADMAP TO CHAOS
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-950 to-black border-4 border-red-600 p-8 rounded-lg transform hover:scale-105 transition-all hover:shadow-2xl hover:shadow-red-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold military-font text-red-600">1</span>
                  <Flame className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold military-font text-red-500 mb-4">SPREAD FUD</h3>
                <p className="text-red-400 text-lg leading-relaxed">
                  UNLEASH CHAOS ON CRYPTO TWITTER. MAKE EVERYONE PANIC. CREATE MAXIMUM FUD.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-950 to-black border-4 border-red-600 p-8 rounded-lg transform hover:scale-105 transition-all hover:shadow-2xl hover:shadow-red-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold military-font text-red-600">2</span>
                  <TrendingUp className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold military-font text-red-500 mb-4">MOON</h3>
                <p className="text-red-400 text-lg leading-relaxed">
                  PUMP IT TO THE MOON. THEN BEYOND. NO BRAKES ON THIS ROCKET.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-950 to-black border-4 border-red-600 p-8 rounded-lg transform hover:scale-105 transition-all hover:shadow-2xl hover:shadow-red-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold military-font text-red-600">3</span>
                  <Skull className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold military-font text-red-500 mb-4">WORLD DOMINATION</h3>
                <p className="text-red-400 text-lg leading-relaxed">
                  TAKE OVER THE CRYPTO WORLD. BECOME THE KING OF ALL MEMECOINS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-black via-red-950 to-black border-t-4 border-red-600">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold horror-font text-red-600 glitch-hard">
              READY TO EMBRACE THE CHAOS?
            </h2>

            <p className="text-2xl md:text-3xl military-font text-red-400">
              JOIN THE ARMY OF DEGENS. SPREAD THE FUD. RULE THE BLOCKCHAIN.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="w-full sm:w-auto px-16 py-8 bg-red-600 text-black text-3xl md:text-4xl font-bold rounded-lg border-4 border-red-400 hover:bg-red-500 hover:scale-110 transition-all pulse-red military-font flex items-center justify-center gap-4">
                <TrendingUp className="w-10 h-10" />
                BUY NOW
              </button>
              <button className="w-full sm:w-auto px-16 py-8 bg-black text-red-600 text-3xl md:text-4xl font-bold rounded-lg border-4 border-red-600 hover:bg-red-950 hover:scale-110 transition-all military-font flex items-center justify-center gap-4">
                <Zap className="w-10 h-10" />
                JOIN THE MADNESS
              </button>
            </div>
          </div>
        </section>

        <section ref={contactRef} className="py-20 px-4 bg-gradient-to-b from-black via-red-950 to-black border-t-4 border-red-600">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-red-600" />
              <h2 className="text-4xl md:text-6xl font-bold horror-font text-red-600 glitch-hard">
                CONTACT THE FUD LORD
              </h2>
            </div>

            <p className="text-red-400 text-center text-lg md:text-xl military-font mb-12">
              HAVE SOMETHING CHAOTIC TO SAY? REACH OUT TO US AND SPREAD THE MADNESS!
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-red-500 font-bold military-font mb-2">YOUR NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black border-3 border-red-600 text-red-400 placeholder-red-700 focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-600 rounded-lg military-font transition-all"
                  placeholder="ENTER YOUR NAME"
                />
              </div>

              <div>
                <label className="block text-red-500 font-bold military-font mb-2">YOUR EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black border-3 border-red-600 text-red-400 placeholder-red-700 focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-600 rounded-lg military-font transition-all"
                  placeholder="YOUR@EMAIL.COM"
                />
              </div>

              <div>
                <label className="block text-red-500 font-bold military-font mb-2">MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border-3 border-red-600 text-red-400 placeholder-red-700 focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-600 rounded-lg military-font transition-all resize-none"
                  placeholder="SPREAD YOUR FUD HERE..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-6 py-4 bg-red-600 text-black text-xl md:text-2xl font-bold rounded-lg border-4 border-red-400 hover:bg-red-500 hover:scale-105 transition-all pulse-red military-font flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-6 h-6" />
                {formStatus === 'sending' ? 'SENDING...' : 'SEND CHAOS'}
              </button>

              {formStatus === 'success' && (
                <div className="p-4 bg-green-950 border-2 border-green-600 rounded-lg text-green-400 font-bold military-font text-center">
                  MESSAGE SENT! CHAOS RECEIVED!
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 bg-red-950 border-2 border-red-600 rounded-lg text-red-400 font-bold military-font text-center">
                  ERROR SPREADING FUD. TRY AGAIN!
                </div>
              )}
            </form>
          </div>
        </section>

        <footer className="py-8 px-4 border-t-4 border-red-600 bg-black">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-500 military-font text-lg md:text-xl">
              $FUDZILLA - THE KING OF FUD. ALL RIGHTS DESTROYED.
            </p>
            <p className="text-red-600 mt-2 text-sm md:text-base">
              THIS IS NOT FINANCIAL ADVICE. THIS IS PURE CHAOS.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
