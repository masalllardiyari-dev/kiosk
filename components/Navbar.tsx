
import React from 'react';

interface NavbarProps {
  onReset: () => void;
  onOpenFeedback: () => void;
  isIframeLoading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onReset, onOpenFeedback, isIframeLoading }) => {
  return (
    <nav className="h-28 bg-[#003366] text-white flex items-center justify-between px-12 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-b-[12px] border-[#FFCC00] z-50">
      <div className="flex items-center gap-8">
        <button 
          onClick={onReset}
          className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-[#003366] font-black text-4xl border-[6px] border-[#FFCC00] active:scale-90 transition-all shadow-2xl"
        >
          Ü
        </button>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none mb-1">Üsküdar Üniversitesi</h1>
          <div className="flex items-center gap-3">
             <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></span>
             <p className="text-lg text-[#FFCC00] font-black tracking-[0.2em] uppercase">Teksifre Kiosk Portalı</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {isIframeLoading && (
          <div className="mr-8 bg-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
            <i className="fa-solid fa-circle-notch fa-spin text-[#FFCC00] text-2xl"></i>
            <span className="text-sm font-black uppercase tracking-widest text-white/80">Sistem Bağlanıyor...</span>
          </div>
        )}
        
        <button 
          onClick={onReset}
          className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 transition-all w-28 h-24 rounded-3xl border-2 border-white/10"
        >
          <i className="fa-solid fa-house-user text-3xl text-white"></i>
          <span className="text-[11px] mt-2 font-black uppercase tracking-tight">Ana Menü</span>
        </button>

        <button 
          onClick={() => window.location.reload()}
          className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 transition-all w-28 h-24 rounded-3xl border-2 border-white/10"
        >
          <i className="fa-solid fa-rotate text-3xl text-white"></i>
          <span className="text-[11px] mt-2 font-black uppercase tracking-tight">Yenile</span>
        </button>

        <button 
          onClick={onOpenFeedback}
          className="flex flex-col items-center justify-center bg-[#FFCC00] text-[#003366] hover:bg-yellow-400 active:scale-90 transition-all w-32 h-24 rounded-3xl shadow-2xl border-b-[8px] border-yellow-600"
        >
          <i className="fa-solid fa-comment-check text-3xl"></i>
          <span className="text-[11px] mt-2 font-black uppercase tracking-tight">Bildirim</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
