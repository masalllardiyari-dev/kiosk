
import React, { useState } from 'react';
import { FeedbackData, KioskView } from '../types';
import { processFeedback } from '../services/geminiService';

interface FeedbackFormProps {
  onClose: () => void;
  onSuccess: (message: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose, onSuccess }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('Genel');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Genel', 'Hız', 'Tasarım', 'Hata Bildirimi', 'Öneri'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert('Lütfen bir puan seçin.');
    
    setIsSubmitting(true);
    const data: FeedbackData = {
      rating,
      comment,
      category,
      timestamp: new Date().toISOString()
    };

    const aiResponse = await processFeedback(data);
    setIsSubmitting(false);
    onSuccess(aiResponse.message);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-[#003366] p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">Geri Bildirim</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-3xl">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Deneyiminizi Puanlayın</label>
            <div className="flex justify-between items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`flex-1 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                    rating >= star ? 'bg-[#FFCC00] text-[#003366] scale-105' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <i className={`fa-solid fa-star ${rating >= star ? 'animate-bounce' : ''}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Kategori</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                    category === cat ? 'bg-[#003366] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Mesajınız (Opsiyonel)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-32 p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#003366] focus:outline-none transition-all text-lg"
              placeholder="Görüşlerinizi buraya yazabilirsiniz..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={`w-full h-16 rounded-2xl font-bold text-xl shadow-lg transition-all ${
              isSubmitting || rating === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#003366] text-white hover:bg-[#002244] active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
            ) : null}
            {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
