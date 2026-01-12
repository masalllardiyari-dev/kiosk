
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackData, GeminiResponse } from "../types";

export const processFeedback = async (data: FeedbackData): Promise<GeminiResponse> => {
  try {
    // API KEY kontrolü ve güvenli başlatma
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bir kullanıcı Üsküdar Üniversitesi Teksifre kioskunda şu geri bildirimi bıraktı:
      Puan: ${data.rating}/5
      Kategori: ${data.category}
      Yorum: ${data.comment}

      Lütfen bu geri bildirimi analiz et ve kullanıcıya nazikçe teşekkür eden kısa bir cevap (Türkçe) oluştur. 
      Ayrıca sentiment (duygu) analizi yap.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: 'Teşekkür mesajı' },
            sentiment: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] }
          },
          required: ['message', 'sentiment']
        }
      }
    });

    return JSON.parse(response.text || '{}') as GeminiResponse;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return {
      message: "Geri bildiriminiz için teşekkür ederiz. Görüşleriniz bizim için değerlidir.",
      sentiment: 'neutral'
    };
  }
};
