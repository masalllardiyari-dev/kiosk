
import React from 'react';

interface NavbarProps {
  onReset: () => void;
  onGoBack: () => void;
  onOpenFeedback: () => void;
  isIframeLoading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onReset, onGoBack, onOpenFeedback, isIframeLoading }) => {
  return (
    <nav className="h-28 bg-[#003366] text-white flex items-center justify-between px-10 shadow-2xl border-b-[8px] border-[#FFCC00] z-50">
      <div className="flex items-center gap-6">
        <button 
          onClick={onReset}
          className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#003366] font-black text-3xl border-4 border-[#FFCC00] active:scale-90 transition-all"
        >
          Ü
        </button>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-black uppercase tracking-tight leading-none">Üsküdar Üniversitesi</h1>
          <p className="text-sm text-[#FFCC00] font-bold tracking-[0.2em] uppercase mt-1 opacity-80">Teksifre Kiosk</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isIframeLoading && (
          <div className="mr-4 bg-white/5 px-4 py-2 rounded-xl flex items-center gap-3 border border-white/10">
            <i className="fa-solid fa-circle-notch fa-spin text-[#FFCC00]"></i>
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Yükleniyor</span>
          </div>
        )}
        
        <button 
          onClick={onGoBack}
          className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 transition-all w-24 h-20 rounded-2xl border-2 border-white/10"
        >
          <i className="fa-solid fa-chevron-left text-2xl text-white"></i>
          <span className="text-[10px] mt-1 font-black uppercase">Geri</span>
        </button>

        <button 
          onClick={onReset}
          className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 transition-all w-24 h-20 rounded-2xl border-2 border-white/10"
        >
          <i className="fa-solid fa-house text-2xl text-white"></i>
          <span className="text-[10px] mt-1 font-black uppercase">Ana Menü</span>
        </button>

        <button 
          onClick={() => window.location.reload()}
          className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 transition-all w-24 h-20 rounded-2xl border-2 border-white/10"
        >
          <i className="fa-solid fa-rotate-right text-2xl text-white"></i>
          <span className="text-[10px] mt-1 font-black uppercase">Yenile</span>
        </button>

        <button 
          onClick={onOpenFeedback}
          className="flex flex-col items-center justify-center bg-[#FFCC00] text-[#003366] active:scale-90 transition-all w-28 h-20 rounded-2xl shadow-lg border-b-4 border-yellow-600"
        >
          <i className="fa-solid fa-comment-dots text-2xl"></i>
          <span className="text-[10px] mt-1 font-black uppercase">Geri Bildirim</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
