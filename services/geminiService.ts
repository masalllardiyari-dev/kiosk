
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackData, GeminiResponse } from "../types.ts";

export const processFeedback = async (data: FeedbackData): Promise<GeminiResponse> => {
  try {
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Feedback from Üsküdar University Kiosk:
      Rating: ${data.rating}/5
      Category: ${data.category}
      Comment: ${data.comment}

      Please provide a very short, polite thank you message in Turkish.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            sentiment: { type: Type.STRING }
          },
          required: ['message', 'sentiment']
        }
      }
    });

    return JSON.parse(response.text || '{}') as GeminiResponse;
  } catch (error) {
    return {
      message: "Geri bildiriminiz için teşekkür ederiz.",
      sentiment: 'neutral'
    };
  }
};
