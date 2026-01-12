
import React from 'react';

interface NavbarProps {
  onReset: () => void;
  onGoBack: () => void;
  onRefresh: () => void;
  onOpenFeedback: () => void;
  isIframeLoading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onReset, onGoBack, onRefresh, onOpenFeedback, isIframeLoading }) => {
  return (
    <nav className="h-28 bg-[#003366] text-white flex items-center justify-between px-10 shadow-2xl border-b-[8px] border-[#FFCC00] z-50">
      <div className="flex items-center gap-6">
        <button 
          onClick={onReset}
          className="w-16 h-16 bg-[#FFCC00] rounded-2xl flex items-center justify-center text-[#003366] font-black text-3xl shadow-lg active:scale-90 transition-all"
        >
          Ü
        </button>
        <div className="hidden lg:block">
          <h1 className="text-2xl font-black uppercase tracking-tight leading-none">Üsküdar Üniversitesi</h1>
          <p className="text-sm text-[#FFCC00] font-bold tracking-[0.2em] uppercase mt-1 opacity-80">Teksifre Kiosk</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isIframeLoading && (
          <div className="mr-4 bg-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 border border-white/10">
            <i className="fa-solid fa-spinner fa-spin text-[#FFCC00] text-xl"></i>
            <span className="text-sm font-black uppercase tracking-widest text-white/80">Yükleniyor</span>
          </div>
        )}
        
        <button 
          onClick={onGoBack}
          className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 transition-all w-28 h-20 rounded-2xl border-2 border-white/10"
        >
          <i className="fa-solid fa-arrow-left text-2xl text-white"></i>
          <span className="text-[11px] mt-1 font-black uppercase tracking-widest">Geri</span>
        </button>

        <button 
          onClick={onReset}
          className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 transition-all w-28 h-20 rounded-2xl border-2 border-white/10"
        >
          <i className="fa-solid fa-home text-2xl text-white"></i>
          <span className="text-[11px] mt-1 font-black uppercase tracking-widest">Başlangıç</span>
        </button>

        <button 
          onClick={onRefresh}
          className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 transition-all w-28 h-20 rounded-2xl border-2 border-white/10"
        >
          <i className="fa-solid fa-rotate text-2xl text-white"></i>
          <span className="text-[11px] mt-1 font-black uppercase tracking-widest">Yenile</span>
        </button>

        <div className="w-[2px] h-12 bg-white/10 mx-2"></div>

        <button 
          onClick={onOpenFeedback}
          className="flex flex-col items-center justify-center bg-[#FFCC00] text-[#003366] active:scale-90 transition-all w-32 h-20 rounded-2xl shadow-xl border-b-4 border-yellow-600"
        >
          <i className="fa-solid fa-message text-2xl"></i>
          <span className="text-[11px] mt-1 font-black uppercase tracking-widest">Destek</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
