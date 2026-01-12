
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
      description: lang === 'TR' ? 'Mail şifrenizi sıfırlamak için dokunun.' : 'Tap to reset your mail password.',
      url: `${BASE_URL}/Home/Student`,
      icon: 'fa-book-open',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    { 
      label: lang === 'TR' ? 'E-Posta Adresimi Öğren' : 'Find My Email', 
      description: lang === 'TR' ? 'Öğrenci numaranız ile adresinizi bulun.' : 'Find your address with student number.',
      url: `${BASE_URL}/Home/FindEmail`,
      icon: 'fa-envelope-open-text',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      label: lang === 'TR' ? 'MFA Sıfırlama' : 'MFA Reset', 
      description: lang === 'TR' ? 'İki aşamalı doğrulamayı sıfırlayın.' : 'Reset two-factor authentication.',
      url: `${BASE_URL}/Home/MFAReset`,
      icon: 'fa-shield-halved',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ];

  const staffOptions = [
    { 
      label: lang === 'TR' ? 'Personel Şifre Sıfırlama' : 'Reset Staff Password', 
      description: lang === 'TR' ? 'Personel mail şifrenizi sıfırlayın.' : 'Reset your staff email password.',
      url: `${BASE_URL}/Home/Staff`,
      icon: 'fa-briefcase',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
  ];

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-colors duration-500 ${role ? 'bg-gray-100' : 'bg-[#2b59c3]'}`}>
      
      {/* Background Icon */}
      {!role && (
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <i className="fa-solid fa-shield-halved text-[600px] text-white"></i>
        </div>
      )}

      {/* Language Switcher */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-[60]">
        {role ? (
          <button 
            onClick={() => setRole(null)}
            className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl text-[#2b59c3] shadow-2xl active:scale-90"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        ) : <div className="w-24" />}

        <div className={`flex p-2 rounded-3xl backdrop-blur-md border ${role ? 'bg-white/50 border-gray-300' : 'bg-white/10 border-white/20'}`}>
          <button 
            onClick={() => setLang('TR')}
            className={`px-10 py-4 rounded-2xl text-2xl font-black ${lang === 'TR' ? 'bg-white text-[#2b59c3] shadow-lg' : (role ? 'text-gray-500' : 'text-white')}`}
          >
            TR
          </button>
          <button 
            onClick={() => setLang('EN')}
            className={`px-10 py-4 rounded-2xl text-2xl font-black ${lang === 'EN' ? 'bg-white text-[#2b59c3] shadow-lg' : (role ? 'text-gray-500' : 'text-white')}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl px-12">
        {!role ? (
          <div className="text-center space-y-20">
            <div className="space-y-6">
              <h1 className="text-9xl font-black text-white tracking-tight leading-none drop-shadow-xl">
                {lang === 'TR' ? 'Kimsiniz?' : 'Welcome'}
              </h1>
              <p className="text-4xl text-white/80 font-bold uppercase tracking-widest">
                {lang === 'TR' ? 'Giriş türünü seçiniz' : 'Select your entry type'}
              </p>
            </div>

            <div className="flex flex-row gap-12 justify-center">
              <button 
                onClick={() => setRole('student')}
                className="w-full max-w-md aspect-square bg-white/10 border-4 border-white/30 rounded-[5rem] flex flex-col items-center justify-center gap-8 hover:bg-white/20 active:scale-95 shadow-2xl backdrop-blur-sm transition-all"
              >
                <i className="fa-solid fa-user-graduate text-[150px] text-white"></i>
                <span className="text-6xl font-black text-white uppercase">{lang === 'TR' ? 'Öğrenci' : 'Student'}</span>
              </button>

              <button 
                onClick={() => setRole('staff')}
                className="w-full max-w-md aspect-square bg-white/10 border-4 border-white/30 rounded-[5rem] flex flex-col items-center justify-center gap-8 hover:bg-white/20 active:scale-95 shadow-2xl backdrop-blur-sm transition-all"
              >
                <i className="fa-solid fa-user-tie text-[150px] text-white"></i>
                <span className="text-6xl font-black text-white uppercase">{lang === 'TR' ? 'Personel' : 'Staff'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-7xl font-black text-[#003366]">
                {role === 'student' ? (lang === 'TR' ? 'Öğrenci' : 'Student') : (lang === 'TR' ? 'Personel' : 'Staff')}
              </h2>
              <p className="text-3xl text-gray-400 font-bold tracking-widest uppercase">
                {lang === 'TR' ? 'Yapmak istediğiniz işlemi seçin' : 'Select a procedure'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {(role === 'student' ? studentOptions : staffOptions).map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelect(opt.url)}
                  className="bg-white p-10 rounded-[3.5rem] flex items-center gap-10 shadow-xl border-2 border-transparent active:scale-95 transition-all text-left"
                >
                  <div className={`w-28 h-28 ${opt.iconBg} ${opt.iconColor} rounded-[2rem] flex items-center justify-center text-5xl shadow-md`}>
                    <i className={`fa-solid ${opt.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-[#003366]">{opt.label}</h3>
                    <p className="text-2xl text-gray-400 font-medium">{opt.description}</p>
                  </div>
                  <i className="fa-solid fa-chevron-right text-4xl text-gray-200 pr-4"></i>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`absolute bottom-12 text-center transition-opacity ${role ? 'opacity-20' : 'opacity-60'}`}>
        <p className={`text-2xl font-black tracking-[0.4em] uppercase ${role ? 'text-[#003366]' : 'text-white'}`}>
          Üsküdar Üniversitesi
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
