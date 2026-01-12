
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import FeedbackForm from './components/FeedbackForm';
import LandingPage from './components/LandingPage';
import { KioskView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<KioskView>(KioskView.LANDING);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUrl, setCurrentUrl] = useState('https://teksifre.uskudar.edu.tr/');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleActionSelection = (url: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    setView(KioskView.MAIN);
    // Explicitly update iframe src if it already exists
    if (iframeRef.current) {
        iframeRef.current.src = url;
    }
  };

  const handleReset = () => {
    setView(KioskView.LANDING);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const onFeedbackSuccess = (message: string) => {
    setSuccessMessage(message);
    setView(KioskView.SUCCESS);
    setTimeout(() => setView(KioskView.MAIN), 6000);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      {/* Landing Page Layer */}
      {view === KioskView.LANDING && (
        <LandingPage onSelect={handleActionSelection} />
      )}

      {/* Main Kiosk Content */}
      {view !== KioskView.LANDING && (
        <>
          <Navbar 
            onReset={handleReset} 
            onOpenFeedback={() => setView(KioskView.FEEDBACK)} 
            isIframeLoading={isLoading}
          />

          <main className="flex-1 w-full relative bg-white overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white">
                <div className="w-32 h-32 border-[16px] border-[#003366] border-t-[#FFCC00] rounded-full animate-spin shadow-2xl"></div>
                <div className="mt-12 text-center space-y-4">
                  <h2 className="text-[#003366] text-4xl font-black uppercase tracking-[0.3em]">Sistem Hazırlanıyor</h2>
                  <p className="text-gray-400 text-xl font-bold">Lütfen bekleyiniz...</p>
                </div>
              </div>
            )}
            
            <iframe
              ref={iframeRef}
              src={currentUrl}
              className="w-full h-full border-none block"
              onLoad={handleIframeLoad}
              title="Teksifre Kiosk Frame"
              allow="camera; geolocation; microphone"
            />
          </main>
        </>
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
          <div className="bg-white rounded-[4rem] p-16 max-w-2xl w-full text-center space-y-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-t-[16px] border-[#FFCC00]">
            <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-7xl mx-auto shadow-inner">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-[#003366]">İşlem Tamamlandı</h3>
              <p className="text-gray-400 text-2xl font-bold uppercase tracking-widest">Geri bildiriminiz için teşekkürler</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border-4 border-dashed border-gray-200">
              <p className="text-gray-700 italic text-2xl leading-relaxed font-medium">
                "{successMessage}"
              </p>
            </div>
            <button 
              onClick={() => setView(KioskView.MAIN)}
              className="bg-[#003366] text-white px-12 py-6 rounded-3xl font-black text-2xl w-full active:scale-95 transition-all shadow-2xl hover:bg-[#002244]"
            >
              Devam Et
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
