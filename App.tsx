
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import FeedbackForm from './components/FeedbackForm.tsx';
import LandingPage from './components/LandingPage.tsx';
import { KioskView } from './types.ts';

const App: React.FC = () => {
  const [view, setView] = useState<KioskView>(KioskView.LANDING);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUrl, setCurrentUrl] = useState('https://teksifre.uskudar.edu.tr/');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleActionSelection = (url: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    setView(KioskView.MAIN);
  };

  const handleReset = () => {
    setView(KioskView.LANDING);
    setIsLoading(false);
    setCurrentUrl('https://teksifre.uskudar.edu.tr/');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    console.log("Portal loaded.");
  };

  const onFeedbackSuccess = (message: string) => {
    setSuccessMessage(message);
    setView(KioskView.SUCCESS);
    setTimeout(() => setView(KioskView.MAIN), 5000);
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-slate-900 select-none font-sans">
      {/* Landing Screen */}
      {view === KioskView.LANDING && (
        <LandingPage onSelect={handleActionSelection} />
      )}

      {/* Main Kiosk View */}
      {view !== KioskView.LANDING && (
        <div className="flex flex-col w-full h-full bg-white">
          <Navbar 
            onReset={handleReset} 
            onOpenFeedback={() => setView(KioskView.FEEDBACK)} 
            isIframeLoading={isLoading}
          />

          <main className="flex-1 w-full relative bg-gray-100 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white">
                <div className="w-24 h-24 border-[12px] border-slate-100 border-t-[#003366] rounded-full animate-spin"></div>
                <div className="mt-8 text-center">
                  <h2 className="text-[#003366] text-3xl font-black uppercase tracking-widest">Sistem Hazırlanıyor</h2>
                  <p className="text-slate-400 font-bold mt-2 uppercase tracking-tight">Güvenli Bağlantı Kuruluyor...</p>
                </div>
              </div>
            )}
            
            <iframe
              ref={iframeRef}
              src={currentUrl}
              className="absolute inset-0 w-full h-full border-none"
              onLoad={handleIframeLoad}
              title="Kiosk Portal"
              allow="camera; microphone; display-capture; autoplay; encrypted-media"
              // Sandbox ayarları: allow-top-navigation eklendi, böylece site kendi içinde yönlendirme yapabilir.
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation"
            />
          </main>
        </div>
      )}

      {/* Overlays */}
      {view === KioskView.FEEDBACK && (
        <FeedbackForm 
          onClose={() => setView(KioskView.MAIN)} 
          onSuccess={onFeedbackSuccess}
        />
      )}

      {view === KioskView.SUCCESS && (
        <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-[200] p-6 backdrop-blur-xl">
          <div className="bg-white rounded-[4rem] p-16 max-w-2xl w-full text-center space-y-10 shadow-2xl border-t-[16px] border-[#FFCC00]">
            <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-6xl mx-auto shadow-inner">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-[#003366] tracking-tighter">Bildirim Alındı</h3>
              <p className="text-slate-400 text-2xl font-bold uppercase tracking-widest">Geri bildiriminiz için teşekkür ederiz.</p>
            </div>
            {successMessage && (
              <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 max-h-[200px] overflow-y-auto">
                <p className="text-slate-600 italic text-xl leading-relaxed">"{successMessage}"</p>
              </div>
            )}
            <button 
              onClick={() => setView(KioskView.MAIN)}
              className="bg-[#003366] text-white px-12 py-6 rounded-3xl font-black text-2xl w-full active:scale-95 transition-all shadow-xl"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
