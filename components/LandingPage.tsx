
import React, { useState } from 'react';

interface LandingPageProps {
  onSelect: (url: string) => void;
}

type Lang = 'TR' | 'EN';

const BASE_URL = 'https://teksifre.uskudar.edu.tr';

const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  const [lang, setLang] = useState<Lang>('TR');

  const handleEntry = () => {
    onSelect(BASE_URL);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#003366] transition-all duration-700 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
          <i className="fa-solid fa-building-columns text-[900px] text-white"></i>
        </div>
      </div>

      {/* Language Toggle - Premium Glass Style */}
      <div className="absolute top-12 right-12 z-[60]">
        <div className="flex p-1.5 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <button 
            onClick={() => setLang('TR')}
            className={`px-12 py-4 rounded-[1.5rem] text-xl font-black transition-all duration-300 ${lang === 'TR' ? 'bg-[#FFCC00] text-[#003366] shadow-[0_0_30px_rgba(255,204,0,0.4)] scale-105' : 'text-white/40 hover:text-white/80'}`}
          >
            TR
          </button>
          <button 
            onClick={() => setLang('EN')}
            className={`px-12 py-4 rounded-[1.5rem] text-xl font-black transition-all duration-300 ${lang === 'EN' ? 'bg-[#FFCC00] text-[#003366] shadow-[0_0_30px_rgba(255,204,0,0.4)] scale-105' : 'text-white/40 hover:text-white/80'}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl px-12 text-center space-y-24 relative z-10">
        {/* Brand Header */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full backdrop-blur-md border border-white/10 mb-4">
             <div className="w-3 h-3 bg-[#FFCC00] rounded-full animate-pulse"></div>
             <p className="text-white/80 text-xl font-bold tracking-[0.5em] uppercase">
               Üsküdar University
             </p>
          </div>
          <h1 className="text-[140px] font-black text-white leading-none tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {lang === 'TR' ? 'TEKSİFRE' : 'PASSPORT'}
          </h1>
          <p className="text-3xl text-white/60 font-medium tracking-[0.2em] uppercase max-w-3xl mx-auto leading-relaxed">
            {lang === 'TR' ? 'Güvenli Şifre Yönetim Sistemi' : 'Secure Password Management System'}
          </p>
        </div>

        {/* Selection Cards */}
        <div className="flex flex-row gap-16 justify-center">
          {/* Student Card */}
          <button 
            onClick={handleEntry}
            className="group relative w-full max-w-md aspect-[4/5] bg-white/[0.03] backdrop-blur-2xl rounded-[5rem] flex flex-col items-center justify-center gap-14 hover:bg-white/[0.07] active:scale-95 border border-white/10 transition-all duration-500 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFCC00]/50 group-hover:h-4 transition-all"></div>
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-[3rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5">
              <i className="fa-solid fa-graduation-cap text-[140px] text-blue-400 group-hover:text-blue-300 drop-shadow-[0_10px_30px_rgba(96,165,250,0.4)]"></i>
            </div>
            <div className="text-center space-y-4">
              <span className="text-7xl font-black text-white uppercase block tracking-tight">
                {lang === 'TR' ? 'ÖĞRENCİ' : 'STUDENT'}
              </span>
              <span className="text-2xl text-white/40 font-bold tracking-[0.3em] uppercase group-hover:text-[#FFCC00] transition-colors">
                {lang === 'TR' ? 'Giriş Yap' : 'Login'}
              </span>
            </div>
          </button>

          {/* Staff Card */}
          <button 
            onClick={handleEntry}
            className="group relative w-full max-w-md aspect-[4/5] bg-white/[0.03] backdrop-blur-2xl rounded-[5rem] flex flex-col items-center justify-center gap-14 hover:bg-white/[0.07] active:scale-95 border border-white/10 transition-all duration-500 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFCC00]/50 group-hover:h-4 transition-all"></div>
            <div className="w-64 h-64 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-[3rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5">
              <i className="fa-solid fa-id-card-clip text-[140px] text-amber-400 group-hover:text-amber-300 drop-shadow-[0_10px_30px_rgba(251,191,36,0.4)]"></i>
            </div>
            <div className="text-center space-y-4">
              <span className="text-7xl font-black text-white uppercase block tracking-tight">
                {lang === 'TR' ? 'PERSONEL' : 'STAFF'}
              </span>
              <span className="text-2xl text-white/40 font-bold tracking-[0.3em] uppercase group-hover:text-[#FFCC00] transition-colors">
                {lang === 'TR' ? 'Giriş Yap' : 'Login'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Footer Tip */}
      <div className="absolute bottom-16 flex flex-col items-center gap-4 animate-bounce opacity-40">
        <div className="w-10 h-16 rounded-full border-2 border-white/40 flex justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full"></div>
        </div>
        <p className="text-xl text-white font-medium uppercase tracking-[0.4em]">
          {lang === 'TR' ? 'Dokunmatik Ekran' : 'Touch Screen'}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
