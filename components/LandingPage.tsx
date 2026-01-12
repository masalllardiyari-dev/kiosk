
import React, { useState } from 'react';

interface LandingPageProps {
  onSelect: (url: string) => void;
}

type Role = 'student' | 'staff' | null;
type Lang = 'TR' | 'EN';

const BASE_URL = 'https://teksifre.uskudar.edu.tr';

const LandingPage: React.FC<LandingPageProps> = ({ onSelect }) => {
  const [role, setRole] = useState<Role>(null);
  const [lang, setLang] = useState<Lang>('TR');

  const studentOptions = [
    { 
      label: lang === 'TR' ? 'Öğrenci E-Posta Şifresini Sıfırlama' : 'Reset Student Email Password', 
      description: lang === 'TR' ? 'Mail adresinizin şifresini sıfırlamak için devam edebilirsiniz.' : 'You can proceed to reset your student email password.',
      url: `${BASE_URL}/Home/Student`,
      icon: 'fa-book-open',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    { 
      label: lang === 'TR' ? 'Öğrenci E-Posta Adresimi Öğrenmek İstiyorum' : 'Find My Student Email Address', 
      description: lang === 'TR' ? 'Öğrenci numarası ile email adresinizi öğrenmek için devam edebilirsiniz.' : 'You can proceed to find your email address using student number.',
      url: `${BASE_URL}/Home/FindEmail`,
      icon: 'fa-envelope-open-text',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      label: lang === 'TR' ? 'Öğrenci MFA Sıfırlama' : 'Student MFA Reset', 
      description: lang === 'TR' ? 'İki Aşamalı Kimlik Doğrulama (MFA) sıfırlama işlemini başlatabilirsiniz.' : 'You can proceed to start the MFA reset process.',
      url: `${BASE_URL}/Home/MFAReset`,
      icon: 'fa-shield-halved',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ];

  const staffOptions = [
    { 
      label: lang === 'TR' ? 'Personel E-Posta Şifresini Sıfırlama' : 'Reset Staff Email Password', 
      description: lang === 'TR' ? 'Personel mail adresinizin şifresini sıfırlamak için devam edebilirsiniz.' : 'You can proceed to reset your staff email password.',
      url: `${BASE_URL}/Home/Staff`,
      icon: 'fa-briefcase',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
  ];

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-all duration-700 ${role ? 'bg-gray-50' : 'bg-[#2b59c3]'}`}>
      
      {/* Background Icon (Only on Role Select) */}
      {!role && (
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden flex items-center justify-center">
          <i className="fa-solid fa-shield-halved text-[800px] text-white"></i>
        </div>
      )}

      {/* Language & Nav Controls */}
      <div className="absolute top-12 left-12 right-12 flex justify-between items-center z-50">
        {role ? (
          <button 
            onClick={() => setRole(null)}
            className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl text-[#2b59c3] hover:bg-gray-100 active:scale-90 shadow-2xl transition-all"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        ) : (
          <div className="w-24 h-24" />
        )}

        <div className={`flex p-2 rounded-3xl backdrop-blur-xl border ${role ? 'bg-gray-200/50 border-gray-300' : 'bg-white/10 border-white/20'}`}>
          <button 
            onClick={() => setLang('TR')}
            className={`px-12 py-5 rounded-2xl text-2xl font-black transition-all ${lang === 'TR' ? 'bg-white text-[#2b59c3] shadow-lg' : (role ? 'text-gray-500' : 'text-white/60')}`}
          >
            TR
          </button>
          <button 
            onClick={() => setLang('EN')}
            className={`px-12 py-5 rounded-2xl text-2xl font-black transition-all ${lang === 'EN' ? 'bg-white text-[#2b59c3] shadow-lg' : (role ? 'text-gray-500' : 'text-white/60')}`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl px-16 relative">
        {!role ? (
          /* STEP 1: Role Selection */
          <div className="space-y-24 fade-in-standard text-white">
            <div className="text-center space-y-6">
              <h1 className="text-9xl font-black tracking-tight drop-shadow-2xl">
                {lang === 'TR' ? 'Kimsiniz?' : 'Identify Yourself'}
              </h1>
              <p className="text-4xl text-white/70 font-bold uppercase tracking-[0.2em]">
                {lang === 'TR' ? 'Lütfen giriş türünü seçiniz' : 'Please select your entry type'}
              </p>
            </div>

            <div className="flex flex-row gap-16 justify-center">
              <button 
                onClick={() => setRole('student')}
                className="w-full max-w-lg aspect-square bg-white/10 border-[6px] border-white/30 rounded-[6rem] flex flex-col items-center justify-center gap-12 hover:bg-white/20 transition-all active:scale-95 group shadow-2xl backdrop-blur-md"
              >
                <i className="fa-solid fa-user-graduate text-[180px] group-hover:scale-110 transition-transform"></i>
                <span className="text-7xl font-black tracking-widest uppercase">
                  {lang === 'TR' ? 'Öğrenci' : 'Student'}
                </span>
              </button>

              <button 
                onClick={() => setRole('staff')}
                className="w-full max-w-lg aspect-square bg-white/10 border-[6px] border-white/30 rounded-[6rem] flex flex-col items-center justify-center gap-12 hover:bg-white/20 transition-all active:scale-95 group shadow-2xl backdrop-blur-md"
              >
                <i className="fa-solid fa-user-tie text-[180px] group-hover:scale-110 transition-transform"></i>
                <span className="text-7xl font-black tracking-widest uppercase">
                  {lang === 'TR' ? 'Personel' : 'Staff'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2: Procedure Selection */
          <div className="space-y-16 fade-in-standard">
            <div className="text-center space-y-4">
              <h2 className="text-7xl font-black tracking-tight text-[#003366]">
                {role === 'student' ? (lang === 'TR' ? 'Öğrenci İşlemleri' : 'Student Hub') : (lang === 'TR' ? 'Personel İşlemleri' : 'Staff Hub')}
              </h2>
              <p className="text-3xl text-gray-400 font-bold uppercase tracking-[0.3em]">
                {lang === 'TR' ? 'Devam Etmek İstediğiniz İşlemi Seçin' : 'Select a procedure to continue'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto pb-20">
              {(role === 'student' ? studentOptions : staffOptions).map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelect(opt.url)}
                  className="bg-white p-12 rounded-[4rem] flex items-center gap-12 group hover:bg-blue-50 transition-all active:scale-95 shadow-xl border-2 border-gray-100 text-left"
                >
                  <div className={`w-32 h-32 ${opt.iconBg} ${opt.iconColor} rounded-[2.5rem] flex-shrink-0 flex items-center justify-center text-6xl group-hover:rotate-12 transition-all shadow-lg`}>
                    <i className={`fa-solid ${opt.icon}`}></i>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="text-4xl font-black text-[#003366] leading-tight group-hover:text-blue-700 transition-colors">
                      {opt.label}
                    </h3>
                    <p className="text-gray-400 font-bold text-2xl leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="w-16 h-16 flex items-center justify-center text-gray-200 group-hover:text-blue-600 transition-all">
                    <i className="fa-solid fa-arrow-right text-5xl"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className={`absolute bottom-16 flex flex-col items-center gap-6 transition-all duration-700 ${role ? 'opacity-20 scale-90' : 'opacity-60'}`}>
        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center font-black text-4xl shadow-2xl border-4 ${role ? 'bg-[#003366] text-white border-[#003366]' : 'bg-white text-[#2b59c3] border-white'}`}>Ü</div>
        <div className={`text-2xl font-black tracking-[0.5em] uppercase ${role ? 'text-[#003366]' : 'text-white'}`}>
          Üsküdar Üniversitesi
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
