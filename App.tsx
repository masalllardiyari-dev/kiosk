
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import FeedbackForm from './components/FeedbackForm';
import LandingPage from './components/LandingPage';
import { KioskView } from './types';

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
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const onFeedbackSuccess = (message: string) => {
    setSuccessMessage(message);
    setView(KioskView.SUCCESS);
    setTimeout(() => setView(KioskView.MAIN), 5000);
  };

  useEffect(() => {
    // Kiosk engelleme: Sağ tık ve seçimleri engelle
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#2b59c3] select-none font-sans">
      {/* Landing Page Layer */}
      {view === KioskView.LANDING && (
        <LandingPage onSelect={handleActionSelection} />
      )}

      {/* Main Kiosk Content */}
      {view !== KioskView.LANDING && (
        <div className="flex flex-col w-full h-full bg-white">
          <Navbar 
            onReset={handleReset} 
            onOpenFeedback={() => setView(KioskView.FEEDBACK)} 
            isIframeLoading={isLoading}
          />

          <main className="flex-1 w-full relative bg-gray-50 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
                <div className="w-24 h-24 border-[12px] border-[#003366] border-t-[#FFCC00] rounded-full animate-spin shadow-xl"></div>
                <div className="mt-8 text-center">
                  <h2 className="text-[#003366] text-3xl font-black uppercase tracking-widest">Yükleniyor</h2>
                  <p className="text-gray-400 font-bold uppercase mt-2">Güvenli Bağlantı Kuruluyor</p>
                </div>
              </div>
            )}
            
            <iframe
              ref={iframeRef}
              src={currentUrl}
              className="absolute inset-0 w-full h-full border-none"
              onLoad={handleIframeLoad}
              title="Teksifre Kiosk Frame"
              allow="camera; geolocation; microphone"
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-4 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] p-12 max-w-xl w-full text-center space-y-8 shadow-2xl border-t-[12px] border-[#FFCC00]">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-[#003366]">Teşekkürler!</h3>
              <p className="text-gray-400 text-xl font-bold uppercase tracking-tight">Geri bildiriminiz başarıyla alındı.</p>
            </div>
            {successMessage && (
              <p className="text-gray-600 italic text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                "{successMessage}"
              </p>
            )}
            <button 
              onClick={() => setView(KioskView.MAIN)}
              className="bg-[#003366] text-white px-10 py-5 rounded-2xl font-black text-xl w-full active:scale-95 transition-all shadow-lg"
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
