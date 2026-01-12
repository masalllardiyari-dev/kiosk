
import React, { useState } from 'react';
import { FeedbackData } from '../types.ts';
import { processFeedback } from '../services/geminiService.ts';

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
    if (rating === 0) return;
    
    setIsSubmitting(true);
    const data: FeedbackData = {
      rating,
      comment,
      category,
      timestamp: new Date().toISOString()
    };

    try {
      const aiResponse = await processFeedback(data);
      onSuccess(aiResponse.message);
    } catch (err) {
      onSuccess("Geri bildiriminiz için teşekkürler.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="bg-[#003366] p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">Geri Bildirim</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-3xl">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Puanınız</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`flex-1 h-14 rounded-xl flex items-center justify-center text-xl transition-all ${
                    rating >= star ? 'bg-[#FFCC00] text-[#003366]' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Kategori</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    category === cat ? 'bg-[#003366] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Yorumunuz</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-28 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] outline-none transition-all"
              placeholder="Görüşlerinizi yazın..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={`w-full h-14 rounded-xl font-bold text-lg transition-all ${
              isSubmitting || rating === 0 ? 'bg-gray-200 text-gray-400' : 'bg-[#003366] text-white active:scale-95'
            }`}
          >
            {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Gönder'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
