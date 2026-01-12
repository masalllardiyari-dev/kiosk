
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackData, GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const processFeedback = async (data: FeedbackData): Promise<GeminiResponse> => {
  try {
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

    const result = JSON.parse(response.text);
    return result as GeminiResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      message: "Geri bildiriminiz için teşekkür ederiz. Görüşleriniz bizim için değerlidir.",
      sentiment: 'neutral'
    };
  }
};
