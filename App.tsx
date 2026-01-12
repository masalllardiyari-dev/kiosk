
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
    // CSRF hatalarını önlemek için temiz bir başlangıç URL'si
    const cleanUrl = url.includes('?') ? `${url}&kiosk=1` : `${url}?kiosk=1`;
    setCurrentUrl(cleanUrl);
    setView(KioskView.MAIN);
  };

  const handleReset = () => {
    setView(KioskView.LANDING);
    setIsLoading(false);
    setCurrentUrl('about:blank');
  };

  const handleHardRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      // 419 hatası alındığında oturumu tazelemek için URL'yi timestamp ile yeniler
      const refreshUrl = `https://teksifre.uskudar.edu.tr/?reload=${Date.now()}`;
      setCurrentUrl(refreshUrl);
    }
  };

  const handleGoBack = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.history.back();
      } catch (e) {
        handleReset();
      }
    }
  };

  const handleIframeLoad = () => {
    if (currentUrl !== 'about:blank') {
      setIsLoading(false);
    }
  };

  const onFeedbackSuccess = (message: string) => {
    setSuccessMessage(message);
    setView(KioskView.SUCCESS);
    setTimeout(() => setView(KioskView.MAIN), 5000);
  };

  useEffect(() => {
    // Kiosk modunda sağ tık engelleme
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#003366] select-none font-sans">
      {/* Giriş Ekranı */}
      {view === KioskView.LANDING && (
        <LandingPage onSelect={handleActionSelection} />
      )}

      {/* Ana Kiosk Alanı */}
      {view !== KioskView.LANDING && (
        <div className="flex flex-col w-full h-full bg-white">
          <Navbar 
            onReset={handleReset} 
            onGoBack={handleGoBack}
            onRefresh={handleHardRefresh}
            onOpenFeedback={() => setView(KioskView.FEEDBACK)} 
            isIframeLoading={isLoading}
          />

          <main className="flex-1 w-full relative bg-gray-100 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white">
                <div className="w-24 h-24 border-[10px] border-slate-100 border-t-[#003366] rounded-full animate-spin"></div>
                <div className="mt-8 text-center">
                  <h2 className="text-[#003366] text-3xl font-black uppercase">Sistem Yükleniyor</h2>
                  <p className="text-slate-400 font-bold mt-2">Lütfen Bekleyiniz...</p>
                </div>
              </div>
            )}
            
            <iframe
              ref={iframeRef}
              src={currentUrl}
              className="absolute inset-0 w-full h-full border-none"
              onLoad={handleIframeLoad}
              title="Kiosk Portal"
              // allow-popups EKLENMEDİ: Bu sayede yeni sekme açılması engellenir, her şey bu frame içinde kalır.
              sandbox="allow-forms allow-modals allow-scripts allow-same-origin allow-top-navigation allow-downloads"
              allow="camera; microphone; geolocation; clipboard-write"
              referrerPolicy="strict-origin"
            />
          </main>
        </div>
      )}

      {/* Geri Bildirim ve Başarı Mesajları */}
      {view === KioskView.FEEDBACK && (
        <FeedbackForm 
          onClose={() => setView(KioskView.MAIN)} 
          onSuccess={onFeedbackSuccess}
        />
      )}

      {view === KioskView.SUCCESS && (
        <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-[200] p-6 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] p-12 max-w-xl w-full text-center space-y-8 shadow-2xl border-t-[12px] border-[#FFCC00]">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-4xl font-black text-[#003366]">Teşekkür Ederiz</h3>
            <p className="text-slate-500 text-xl font-bold uppercase tracking-widest">Mesajınız başarıyla iletildi.</p>
            <button 
              onClick={() => setView(KioskView.MAIN)}
              className="bg-[#003366] text-white px-10 py-5 rounded-2xl font-black text-xl w-full active:scale-95 transition-all"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
